import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Bot,
  Bug,
  DollarSign,
  FileCheck,
  FileText,
  LayoutDashboard,
  Settings,
  ShieldAlert,
  Target,
  CircleDot,
  Power,
  Terminal,
} from "lucide-react"

const Sidebar = () => (
  <aside className="flex h-screen w-16 flex-col items-center border-r border-gray-800 bg-black py-6">
    <TooltipProvider>
      <nav className="flex flex-col items-center gap-6">
        <Tooltip>
          <TooltipTrigger asChild>
            <a href="#" className="group">
              <Bug className="h-8 w-8 text-cyan-400 transition-transform group-hover:scale-110" />
              <span className="sr-only">CHIMERA-HUNTER</span>
            </a>
          </TooltipTrigger>
          <TooltipContent side="right" className="border-gray-700 bg-gray-800 text-cyan-400">
            CHIMERA-HUNTER
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <a href="#" className="rounded-lg bg-gray-800 p-2 text-cyan-400 transition-colors hover:bg-gray-700">
              <LayoutDashboard className="h-5 w-5" />
              <span className="sr-only">Dashboard</span>
            </a>
          </TooltipTrigger>
          <TooltipContent side="right" className="border-gray-700 bg-gray-800 text-gray-300">
            Dashboard
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <a
              href="#"
              className="rounded-lg p-2 text-gray-400 transition-colors hover:text-cyan-400 hover:bg-gray-800"
            >
              <Target className="h-5 w-5" />
              <span className="sr-only">Targets</span>
            </a>
          </TooltipTrigger>
          <TooltipContent side="right" className="border-gray-700 bg-gray-800 text-gray-300">
            Targets
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <a
              href="#"
              className="rounded-lg p-2 text-gray-400 transition-colors hover:text-cyan-400 hover:bg-gray-800"
            >
              <ShieldAlert className="h-5 w-5" />
              <span className="sr-only">Findings</span>
            </a>
          </TooltipTrigger>
          <TooltipContent side="right" className="border-gray-700 bg-gray-800 text-gray-300">
            Findings
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <a
              href="#"
              className="rounded-lg p-2 text-gray-400 transition-colors hover:text-cyan-400 hover:bg-gray-800"
            >
              <FileText className="h-5 w-5" />
              <span className="sr-only">Reports</span>
            </a>
          </TooltipTrigger>
          <TooltipContent side="right" className="border-gray-700 bg-gray-800 text-gray-300">
            Reports
          </TooltipContent>
        </Tooltip>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-6">
        <Tooltip>
          <TooltipTrigger asChild>
            <a
              href="#"
              className="rounded-lg p-2 text-gray-400 transition-colors hover:text-cyan-400 hover:bg-gray-800"
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </a>
          </TooltipTrigger>
          <TooltipContent side="right" className="border-gray-700 bg-gray-800 text-gray-300">
            Settings
          </TooltipContent>
        </Tooltip>
      </nav>
    </TooltipProvider>
  </aside>
)

const Header = () => (
  <header className="flex items-center justify-between border-b border-gray-800 bg-black/50 p-4 backdrop-blur-sm">
    <div>
      <h1 className="text-2xl font-bold tracking-wider text-gray-50">CHIMERA-HUNTER</h1>
      <p className="font-mono text-sm text-cyan-400">MISSION: AUTOMATE REAL-MONEY BUG BOUNTIES</p>
    </div>
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 rounded-full bg-green-900/50 px-3 py-1 text-xs font-medium text-green-400 ring-1 ring-green-400/30">
        <Power className="h-3 w-3 animate-pulse" />
        <span>SYSTEM ONLINE</span>
      </div>
      <Button
        variant="outline"
        size="sm"
        className="border-cyan-400/50 bg-transparent text-cyan-400 hover:bg-cyan-900/50 hover:text-cyan-300"
      >
        <Bot className="mr-2 h-4 w-4" />
        EXECUTE HUNT
      </Button>
    </div>
  </header>
)

const StatCard = ({ title, value, icon: Icon, change, changeType }) => (
  <Card className="border-gray-800 bg-gray-900/50 text-gray-50">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-gray-400">{title}</CardTitle>
      <Icon className="h-5 w-5 text-gray-500" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className={`text-xs ${changeType === "increase" ? "text-green-400" : "text-red-400"}`}>{change}</p>
    </CardContent>
  </Card>
)

const TargetsTable = () => {
  const targets = []

  return (
    <Card className="border-gray-800 bg-gray-900/50 text-gray-50 md:col-span-2">
      <CardHeader>
        <CardTitle className="text-gray-300">REAL-TIME HUNTING OPERATIONS</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-gray-800 hover:bg-gray-800/50">
              <TableHead className="text-gray-400">Target Program</TableHead>
              <TableHead className="text-gray-400">Scope</TableHead>
              <TableHead className="text-gray-400">Current Status</TableHead>
              <TableHead className="text-right text-gray-400">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {targets.length > 0 ? (
              targets.map((target) => (
                <TableRow key={target.name} className="border-gray-800 font-mono text-xs hover:bg-gray-800/50">
                  <TableCell className="font-medium text-gray-200">{target.name}</TableCell>
                  <TableCell className="text-gray-400">{target.scope}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-opacity-50 border-cyan-400 text-cyan-400">
                      {target.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-400 hover:bg-gray-700 hover:text-white"
                    >
                      <Terminal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-gray-500">
                  No active hunting operations. Execute a hunt to begin.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

const ActivityLog = () => {
  const logs = []

  const getIconForType = (type) => {
    switch (type) {
      case "submit":
        return <FileCheck className="h-3 w-3 text-green-400" />
      case "ai":
        return <Bot className="h-3 w-3 text-purple-400" />
      case "vuln":
        return <ShieldAlert className="h-3 w-3 text-red-500" />
      case "scan":
        return <CircleDot className="h-3 w-3 text-cyan-400" />
      case "recon":
        return <Target className="h-3 w-3 text-blue-400" />
      case "init":
        return <Power className="h-3 w-3 text-yellow-400" />
      default:
        return <CircleDot className="h-3 w-3 text-gray-500" />
    }
  }

  return (
    <Card className="border-gray-800 bg-gray-900/50 text-gray-50">
      <CardHeader>
        <CardTitle className="text-gray-300">LIVE ACTIVITY STREAM</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {logs.length > 0 ? (
            logs.map((log, index) => (
              <div key={index} className="flex items-start gap-3 font-mono text-xs">
                <span className="mt-0.5">{getIconForType(log.type)}</span>
                <span className="text-gray-500">{log.time}</span>
                <p className="flex-1 text-gray-300">{log.message}</p>
              </div>
            ))
          ) : (
            <div className="flex h-full min-h-[200px] items-center justify-center text-center text-sm text-gray-500">
              <p>Awaiting system activity...</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default function ChimeraHunterDashboard() {
  return (
    <div className="flex min-h-screen w-full bg-black text-gray-50">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 p-4 md:p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="POTENTIAL EARNINGS (24H)"
              value="$0"
              icon={DollarSign}
              change="System Idle"
              changeType="increase"
            />
            <StatCard
              title="REPORTS SUBMITTED (24H)"
              value="0"
              icon={FileText}
              change="No activity"
              changeType="increase"
            />
            <StatCard
              title="VULNERABILITIES FOUND (24H)"
              value="0"
              icon={Bug}
              change="No activity"
              changeType="increase"
            />
            <StatCard title="ACTIVE HUNTS" value="0" icon={Target} change="Awaiting command" changeType="increase" />
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <TargetsTable />
            </div>
            <div className="lg:col-span-1">
              <ActivityLog />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
