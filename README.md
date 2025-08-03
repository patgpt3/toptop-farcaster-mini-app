# TopTop Network - Farcaster Mini App

A Farcaster mini app that provides seamless integration with TopTop Network, allowing Farcaster users to post, vote, and comment alongside web app users in a unified community experience.

## 🚀 Features

### Cross-Platform Integration
- **Unified Database**: Posts from Farcaster users appear alongside web app users
- **Shared Voting**: All users can vote on posts regardless of platform
- **Unified Comments**: Comments are shared across both platforms
- **Real-time Updates**: Changes are reflected immediately on both platforms

### Farcaster Authentication
- **Wallet Connection**: Connect using Farcaster Auth Kit
- **Profile Integration**: Uses Farcaster username and profile picture
- **Seamless Experience**: No separate account creation needed

### Content Management
- **8 Categories**: Crypto, AI, Gaming, Film, Memecoins, NFT, DePIN, DeSci
- **Emoji Support**: Rich emoji picker for post titles
- **URL Validation**: Automatic URL validation and domain extraction
- **Category Filtering**: Browse posts by specific categories

### Social Features
- **Voting System**: Upvote posts with real-time feedback
- **Comment System**: View and add comments to posts
- **Share Functionality**: Share posts to other platforms
- **User Profiles**: View user activity and posts

## 🏗️ Architecture

### Backend Integration
The Farcaster mini app uses the same backend API as the main TopTop Network web app:

```
API Base URL: https://crypto-news-api-backend-b5addae00d92.herokuapp.com
```

### Data Flow
1. **Farcaster User** connects wallet → **Farcaster Auth Kit** → **TopTop Backend**
2. **Posts** are stored in the same MongoDB database
3. **Web App Users** see Farcaster posts immediately
4. **Farcaster Users** see web app posts immediately
5. **Voting/Comments** work across both platforms

### Key Components
- `apiService.ts` - Unified API service for both platforms
- `useFarcasterAuth.ts` - Farcaster authentication bridge
- `NewsItem.tsx` - Cross-platform post display component
- `Submit.tsx` - Post submission with emoji support

## 🛠️ Development

### Prerequisites
- Node.js 18+
- npm or yarn
- Farcaster account for testing

### Installation
```bash
cd farcaster-mini-app
npm install
```

### Environment Variables
Create a `.env` file:
```env
VITE_API_BASE_URL=https://crypto-news-api-backend-b5addae00d92.herokuapp.com
VITE_WALLET_CONNECT_PROJECT_ID=your-wallet-connect-project-id
```

### Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:3001`

### Building for Production
```bash
npm run build
```

## 🔧 Configuration

### Farcaster Integration
The app uses the official Farcaster Auth Kit for authentication:

```typescript
import { FarcasterKitProvider } from '@farcaster/auth-kit'

// Wraps the entire app
<FarcasterKitProvider>
  <App />
</FarcasterKitProvider>
```

### API Service
The API service is designed to be compatible with the main TopTop Network backend:

```typescript
// Same endpoints as main app
apiService.getItems('Crypto', 1, 'main')
apiService.submitItem(postData)
apiService.voteItem(itemId, isUpvote)
```

## 📱 Farcaster Mini App Features

### Frame Integration
The app includes Farcaster Frame meta tags for seamless integration:

```html
<meta property="fc:frame" content="vNext" />
<meta property="fc:frame:image" content="https://toptop.network/og-image.png" />
<meta property="fc:frame:button:1" content="View TopTop Network" />
<meta property="fc:frame:post_url" content="https://toptop.network/farcaster" />
```

### Mobile Optimization
- Responsive design for mobile devices
- Touch-friendly interface
- Optimized for Farcaster mobile app

## 🔒 Security & Privacy

### Data Handling
- Farcaster usernames are used as TopTop usernames
- No additional personal data is stored
- Posts are public and shared across platforms
- Authentication is handled by Farcaster Auth Kit

### API Security
- All API calls include Farcaster authentication headers
- Rate limiting is handled by the backend
- Input validation on both client and server

## 🚀 Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy the `farcaster-mini-app` directory
4. Configure custom domain if needed

### Environment Variables for Production
```env
VITE_API_BASE_URL=https://crypto-news-api-backend-b5addae00d92.herokuapp.com
VITE_WALLET_CONNECT_PROJECT_ID=your-production-project-id
NODE_ENV=production
```

## 📊 Analytics & Monitoring

### User Tracking
- Farcaster user activity is tracked alongside web app users
- Posts include platform identification (`platform: 'farcaster'`)
- Farcaster FID is stored for user identification

### Performance Monitoring
- React Query for efficient data fetching
- Caching to reduce API calls
- Error boundaries for graceful error handling

## 🤝 Contributing

### Development Guidelines
1. Maintain compatibility with main TopTop Network backend
2. Follow existing code patterns and styling
3. Test cross-platform functionality
4. Ensure mobile responsiveness

### Testing
- Test Farcaster authentication flow
- Verify cross-platform post visibility
- Test voting and commenting functionality
- Validate mobile experience

## 📄 License

This project is part of TopTop Network and follows the same licensing terms.

## 🆘 Support

For issues related to:
- **Farcaster Integration**: Check Farcaster Auth Kit documentation
- **Backend API**: Contact TopTop Network team
- **General Issues**: Open an issue in the repository

---

**Note**: This mini app is designed to work seamlessly with the main TopTop Network application. All posts, votes, and comments are shared between Farcaster users and web app users, creating a unified community experience. 