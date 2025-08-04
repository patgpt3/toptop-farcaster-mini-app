# 🚀 TopTop Network - Farcaster Mini App Deployment Script
# This script deploys the fixed Farcaster mini app to Vercel

Write-Host "🚀 Starting deployment of TopTop Network Farcaster Mini App..." -ForegroundColor Green

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: package.json not found. Please run this script from the toptop-farcaster-mini-app directory." -ForegroundColor Red
    exit 1
}

# Check if Vercel CLI is installed
try {
    $vercelVersion = vercel --version
    Write-Host "✅ Vercel CLI found: $vercelVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Vercel CLI not found. Installing..." -ForegroundColor Yellow
    npm install -g vercel
}

# Build the project
Write-Host "📦 Building the project..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build completed successfully!" -ForegroundColor Green

# Deploy to Vercel
Write-Host "🌐 Deploying to Vercel..." -ForegroundColor Yellow

# Set environment variables for deployment
$env:VITE_PRIVY_APP_ID = "cm4g4hzw102g3hlf5jgx0rxf9"
$env:VITE_API_BASE_URL = "https://crypto-news-api-backend-b5addae00d92.herokuapp.com"
$env:VITE_APP_NAME = "TopTop Network"
$env:VITE_APP_VERSION = "1.0.0"
$env:VITE_ENVIRONMENT = "production"
$env:VITE_GA_MEASUREMENT_ID = "G-49NGX360GK"

# Deploy using Vercel CLI
vercel --prod --yes

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Deployment completed successfully!" -ForegroundColor Green
    Write-Host "🎉 Your Farcaster Mini App is now live!" -ForegroundColor Green
    Write-Host "📱 You can now submit it to the Farcaster Mini App ecosystem." -ForegroundColor Cyan
} else {
    Write-Host "❌ Deployment failed!" -ForegroundColor Red
    exit 1
}

Write-Host "🔧 Fixes applied:" -ForegroundColor Cyan
Write-Host "  ✅ Fixed API endpoints to match backend structure" -ForegroundColor White
Write-Host "  ✅ Removed Solana wallet warnings from Privy config" -ForegroundColor White
Write-Host "  ✅ Added proper Vercel configuration" -ForegroundColor White
Write-Host "  ✅ Improved error handling and user experience" -ForegroundColor White

Write-Host "📋 Next steps:" -ForegroundColor Cyan
Write-Host "  1. Test the deployed app at your Vercel URL" -ForegroundColor White
Write-Host "  2. Submit to Farcaster Mini Apps: https://miniapps.farcaster.xyz/" -ForegroundColor White
Write-Host "  3. Monitor for any remaining issues" -ForegroundColor White 