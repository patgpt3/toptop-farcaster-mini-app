# 🚀 TopTop Network - Farcaster Mini App Deployment Guide

## 📋 Overview

This guide will help you deploy the TopTop Network Farcaster Mini App to Vercel and submit it to the Farcaster Mini App ecosystem.

## 🛠️ Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Git](https://git-scm.com/) installed
- [Vercel CLI](https://vercel.com/cli) (optional, for CLI deployment)
- A [Vercel account](https://vercel.com)
- A [Farcaster account](https://farcaster.xyz)

## 🔧 Environment Setup

### 1. Environment Variables

Create a `.env` file in the `farcaster-mini-app` directory with the following variables:

```env
# 🔐 PRIVY AUTHENTICATION
VITE_PRIVY_APP_ID=cm4g4hzw102g3hlf5jgx0rxf9

# 🌐 API CONFIGURATION
VITE_API_BASE_URL=https://crypto-news-api-backend-b5addae00d92.herokuapp.com

# 📱 APP METADATA
VITE_APP_NAME=TopTop Network
VITE_APP_VERSION=1.0.0
VITE_ENVIRONMENT=production

# 📊 ANALYTICS (Optional)
VITE_GA_MEASUREMENT_ID=G-49NGX360GK
```

### 2. Install Dependencies

```bash
cd farcaster-mini-app
npm install --ignore-scripts
```

**Note:** We use `--ignore-scripts` to avoid Python compilation issues on Windows.

## 🚀 Local Development

### 1. Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3001`

### 2. Test Features

- ✅ Browse posts across 8 categories
- ✅ Vote on posts (with Privy authentication)
- ✅ Submit new posts
- ✅ Cross-platform integration with main web app
- ✅ Responsive mobile design

## 📦 Production Build

### 1. Build the App

```bash
npm run build
```

This creates a `dist` folder with the production build.

### 2. Preview Production Build

```bash
npm run preview
```

## 🌐 Deploy to Vercel

### Option 1: Vercel Dashboard (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Add Farcaster Mini App"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Set the root directory to `farcaster-mini-app`

3. **Configure Environment Variables**
   - In the Vercel project settings, add all environment variables from your `.env` file
   - Set the build command to: `npm run build`
   - Set the output directory to: `dist`

4. **Deploy**
   - Click "Deploy"
   - Your app will be available at `https://your-project.vercel.app`

### Option 2: Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   cd farcaster-mini-app
   vercel
   ```

3. **Follow the prompts**
   - Link to existing project or create new
   - Set environment variables
   - Deploy

## 📱 Farcaster Mini App Submission

### 1. Prepare Assets

Create the following assets for your Mini App:

- **App Icon**: `icon.png` (512x512px)
- **Splash Screen**: `splash.png` (1200x630px)
- **Screenshots**: 3-5 screenshots of your app in action

### 2. Update Mini App Manifest

Edit `miniapp.json` with your specific details:

```json
{
  "name": "TopTop Network",
  "description": "Discover the latest in Crypto, AI, Gaming, and Web3",
  "version": "1.0.0",
  "icon": "https://your-domain.com/icon.png",
  "splash": "https://your-domain.com/splash.png",
  "homepage": "https://your-domain.com",
  "repository": {
    "type": "git",
    "url": "https://github.com/your-username/your-repo"
  }
}
```

### 3. Submit to Farcaster

1. **Visit [Farcaster Mini Apps](https://miniapps.farcaster.xyz/)**
2. **Click "Submit Mini App"**
3. **Fill out the submission form:**
   - App name: TopTop Network
   - Description: Discover the latest in Crypto, AI, Gaming, and Web3
   - URL: Your deployed Vercel URL
   - Category: Social, News, Crypto
   - Screenshots: Upload your app screenshots
   - Icon: Upload your app icon

4. **Submit for Review**
   - Farcaster team will review your submission
   - This typically takes 1-3 business days
   - You'll receive email updates on the status

## 🔗 Integration Features

### Cross-Platform Integration

Your Mini App integrates with the main TopTop Network web app:

- **Shared Backend**: Both apps use the same API
- **Unified Posts**: Posts from Mini App appear on web app
- **Shared Voting**: Votes work across both platforms
- **Real-time Updates**: Changes reflect immediately

### Mini App Features

- **Farcaster Authentication**: Uses Privy for seamless login
- **Mobile Optimized**: Designed for mobile interaction
- **Social Sharing**: Users can share posts with Farcaster friends
- **Notifications**: Push notifications for engagement
- **Wallet Integration**: Access to user's Ethereum wallet

## 🧪 Testing Checklist

Before submitting, test the following:

### Core Functionality
- [ ] App loads without errors
- [ ] Posts display correctly
- [ ] Voting works (requires authentication)
- [ ] Post submission works
- [ ] Category navigation works
- [ ] Responsive design on mobile

### Authentication
- [ ] Privy login modal appears
- [ ] Farcaster authentication works
- [ ] User state persists across sessions
- [ ] Logout functionality works

### Cross-Platform
- [ ] Posts from Mini App appear on web app
- [ ] Votes from Mini App sync to web app
- [ ] Comments are shared between platforms

### Performance
- [ ] App loads quickly (< 3 seconds)
- [ ] Smooth scrolling and interactions
- [ ] No console errors
- [ ] Works on different screen sizes

## 🚨 Troubleshooting

### Common Issues

1. **Build Errors**
   - Run `npm install --ignore-scripts` to avoid Python issues
   - Check that all environment variables are set

2. **Authentication Issues**
   - Verify `VITE_PRIVY_APP_ID` is correct
   - Check that Farcaster login is enabled in Privy dashboard

3. **API Connection Issues**
   - Verify `VITE_API_BASE_URL` is correct
   - Check that the backend is running and accessible

4. **Deployment Issues**
   - Ensure build command is `npm run build`
   - Check that output directory is `dist`
   - Verify all environment variables are set in Vercel

### Getting Help

- **Farcaster Discord**: Join the Farcaster Discord for Mini App support
- **Vercel Support**: Use Vercel's support channels for deployment issues
- **GitHub Issues**: Report bugs in the project repository

## 🎉 Success!

Once deployed and approved:

1. **Your Mini App will be available in the Farcaster Mini App store**
2. **Users can discover and install it directly from Farcaster**
3. **You'll have access to Farcaster's social discovery features**
4. **Users can share your app with their Farcaster friends**

## 📈 Next Steps

After successful deployment:

1. **Monitor Analytics**: Track usage and engagement
2. **Gather Feedback**: Listen to user feedback and iterate
3. **Add Features**: Consider adding more Mini App-specific features
4. **Promote**: Share your Mini App with the Farcaster community

---

**Need help?** Check the [Farcaster Mini Apps documentation](https://miniapps.farcaster.xyz/) or reach out to the Farcaster team. 