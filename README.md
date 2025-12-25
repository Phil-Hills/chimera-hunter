# Chimera Hunter Architecture

## Overview

A Next.js frontend application for the Chimera Hunter bug bounty platform.

## Deployment

Your project is live at:

**[https://vercel.com/nwpistols-projects/v0-chimera-hunter-architecture](https://vercel.com/nwpistols-projects/v0-chimera-hunter-architecture)**

## Google Cloud Run Deployment

This project includes configuration for deploying the frontend to **Google Cloud Run**.

### Prerequisites

- Google Cloud SDK (`gcloud`) installed and authenticated.
- A Google Cloud Project (default script uses `clairos-agent-core`).

### Deploying

To deploy the application to Cloud Run, run the provided PowerShell script:

```powershell
.\deploy_frontend.ps1
```

This script will:
1.  Build the Docker image using **Cloud Build** (no local Docker required).
2.  Push the image to Google Container Registry (GCR).
3.  Deploy the service to Cloud Run (Service name: `chimera-hunter-frontend`).

### Manual Deployment

If you prefer to run commands manually:

```bash
# Submit build to Cloud Build
gcloud builds submit --tag gcr.io/[PROJECT_ID]/chimera-hunter-frontend .

# Deploy to Cloud Run
gcloud run deploy chimera-hunter-frontend \
  --image gcr.io/[PROJECT_ID]/chimera-hunter-frontend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 3000
```
