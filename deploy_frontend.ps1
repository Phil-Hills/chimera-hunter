$PROJECT_ID = "clairos-agent-core"
$REGION = "us-central1"
$SERVICE_NAME = "chimera-hunter-frontend"
$IMAGE_NAME = "gcr.io/$PROJECT_ID/$SERVICE_NAME"

Write-Host "Starting deployment for $SERVICE_NAME to project $PROJECT_ID..."
Write-Host "Using Cloud Build (no local Docker required)..."

# 1. Build and Push the Docker image using Cloud Build
Write-Host "Building and pushing image via Cloud Build..."
gcloud builds submit --tag $IMAGE_NAME .

if ($LASTEXITCODE -ne 0) {
    Write-Error "Cloud Build failed. Ensure Cloud Build API is enabled in your project."
    exit 1
}

# 2. Deploy to Cloud Run
Write-Host "Deploying to Cloud Run..."
gcloud run deploy $SERVICE_NAME --image $IMAGE_NAME --platform managed --region $REGION --allow-unauthenticated --port 3000

if ($LASTEXITCODE -ne 0) {
    Write-Error "Deployment failed."
    exit 1
}

Write-Host "Deployment complete!"
Write-Host "Check the URL in the output above to access your application."
