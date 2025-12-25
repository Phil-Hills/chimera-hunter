# Chimera hunter architecture

*Automatically synced with your [v0.dev](https://v0.dev) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/nwpistols-projects/v0-chimera-hunter-architecture)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/Dql3xnvmQO7)

## Overview

This repository will stay in sync with your deployed chats on [v0.dev](https://v0.dev).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.dev](https://v0.dev).

## Deployment

Your project is live at:

**[https://vercel.com/nwpistols-projects/v0-chimera-hunter-architecture](https://vercel.com/nwpistols-projects/v0-chimera-hunter-architecture)**

## Build your app

Continue building your app on:

**[https://v0.dev/chat/projects/Dql3xnvmQO7](https://v0.dev/chat/projects/Dql3xnvmQO7)**

## How It Works

1. Create and modify your project using [v0.dev](https://v0.dev)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository

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
