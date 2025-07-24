import asyncio
import os
import sqlalchemy
from google.cloud import secretmanager

# Your custom agent framework
from clairos_agent_core import Agent, Task, Tool

# The core components of the hunter
from core.browser_automation import RealBrowserAutomation
from core.gemini_ai import RealGeminiHunter
from core.vulnerability_scanner import RealVulnerabilityScanner
from platforms.google_bughunters import GoogleBugHuntersBot

def get_gcp_secret(secret_id, project_id, version_id="latest"):
    """Fetches a secret from Google Cloud Secret Manager."""
    client = secretmanager.SecretManagerServiceClient()
    name = f"projects/{project_id}/secrets/{secret_id}/versions/{version_id}"
    response = client.access_secret_version(request={"name": name})
    return response.payload.data.decode("UTF-8")

# --- Define Tools for the Agent ---

class ReconTool(Tool):
    def __init__(self, browser: RealBrowserAutomation, email: str, password: str):
        super().__init__(
            name="ReconnaissanceTool",
            description="Logs into bug bounty platforms and extracts in-scope targets for a given program."
        )
        self.browser = browser
        self.email = email
        self.password = password

    def use(self, program_name: str) -> list[str]:
        """Logs in and gets the scope for a program. Currently supports 'Google VRP'."""
        print(f"ReconTool: Logging into Google Bug Hunters...")
        self.browser.login_to_google_bughunters(self.email, self.password)
        print(f"ReconTool: Extracting scope for {program_name}...")
        scope = self.browser.extract_program_scope()
        print(f"ReconTool: Found {len(scope)} assets in scope.")
        return scope

class ScanningTool(Tool):
    def __init__(self, scanner: RealVulnerabilityScanner):
        super().__init__(
            name="VulnerabilityScanningTool",
            description="Scans a list of targets for specific vulnerabilities like XSS, SQLi, and exposed APIs."
        )
        self.scanner = scanner

    async def use(self, targets: list[str]) -> list[dict]:
        """Scans a list of targets and returns a list of found vulnerabilities."""
        print(f"ScanningTool: Beginning scan on {len(targets)} targets.")
        all_vulns = []
        for target in targets:
            print(f"ScanningTool: Scanning {target}...")
            xss = await self.scanner.scan_for_real_xss(f"https://{target}")
            if xss: all_vulns.append(xss)
            
            sqli = await self.scanner.scan_for_real_sqli(f"https://{target}")
            if sqli: all_vulns.append(sqli)
            
            apis = await self.scanner.find_exposed_apis(target)
            all_vulns.extend(apis)
        
        print(f"ScanningTool: Scan complete. Found {len(all_vulns)} potential vulnerabilities.")
        return all_vulns

class ReportingTool(Tool):
    def __init__(self, bot: GoogleBugHuntersBot):
        super().__init__(
            name="ReportSubmissionTool",
            description="Submits a found vulnerability to the appropriate bug bounty platform."
        )
        self.bot = bot

    def use(self, vulnerability: dict) -> dict:
        """Submits a single vulnerability report."""
        print(f"ReportingTool: Submitting report for {vulnerability['type']} on {vulnerability['url']}...")
        result = self.bot.submit_real_report(vulnerability)
        if result.get('submitted'):
            print(f"ReportingTool: SUCCESS! Report ID: {result['report_id']}")
        else:
            print("ReportingTool: FAILED to submit report.")
        return result

# --- Main Execution Logic ---

async def main():
    project_id = os.environ.get('GCP_PROJECT')
    if not project_id:
        raise ValueError("FATAL: GCP_PROJECT environment variable not set.")

    # 1. Fetch secrets from GCP Secret Manager
    print("🔐 [GCP] Fetching secrets from Secret Manager...")
    gemini_api_key = get_gcp_secret('GEMINI_API_KEY', project_id)
    google_email = get_gcp_secret('GOOGLE_EMAIL', project_id)
    google_password = get_gcp_secret('GOOGLE_PASSWORD', project_id)
    
    # 2. Initialize core components
    print("🛠️  [CORE] Initializing hunter components...")
    browser = RealBrowserAutomation()
    gemini = RealGeminiHunter(gemini_api_key)
    scanner = RealVulnerabilityScanner(gemini)
    google_bot = GoogleBugHuntersBot(browser, gemini)

    # 3. Assemble the Agent's Tools
    print("🧰 [AGENT] Assembling tools...")
    recon_tool = ReconTool(browser, google_email, google_password)
    scanning_tool = ScanningTool(scanner)
    reporting_tool = ReportingTool(google_bot)

    # 4. Define the Agent
    chimera_agent = Agent(
        role="Autonomous Bug Bounty Hunter",
        goal="To find and report real security vulnerabilities on specified platforms to earn monetary rewards, operating with maximum efficiency and stealth.",
        tools=[recon_tool, scanning_tool, reporting_tool]
    )

    # 5. Define the Mission (Task)
    hunt_task = Task(
        description=(
            "Execute a full bug bounty hunt cycle on the Google Bug Hunters platform. "
            "1. Use the ReconnaissanceTool to get the in-scope assets for the 'Google VRP' program. "
            "2. Use the VulnerabilityScanningTool to scan the first 5 of these assets for vulnerabilities. "
            "3. For each vulnerability found, use the ReportSubmissionTool to submit a report immediately. "
            "Ensure all actions are logged."
        ),
        expected_output="A list of submission results, including report IDs and potential payouts for all submitted vulnerabilities."
    )

    # 6. Execute the Mission
    print("\n" + "="*50)
    print("🚀 [MISSION START] CHIMERA-HUNTER AGENT ACTIVATED")
    print("="*50 + "\n")
    
    try:
        result = await chimera_agent.run(hunt_task)
        print("\n" + "="*50)
        print("✅ [MISSION COMPLETE] AGENT RUN FINISHED")
        print("="*50)
        print("Mission Debrief:", result)
    except Exception as e:
        print(f"❌ [MISSION FAILED] An error occurred: {e}")
    finally:
        print("🛑 Shutting down browser automation...")
        browser.close()


if __name__ == "__main__":
    # This will be executed by the Cloud Run Job
    asyncio.run(main())
