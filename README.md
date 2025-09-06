# Multi Swap Hub - Advanced DEX Aggregator

A modern, secure, and user-friendly decentralized exchange aggregator built with React, TypeScript, and Supabase. Experience seamless crypto trading with the best rates across multiple DEXs.

## 🚀 Features

### Core Functionality
- **Multi-DEX Aggregation**: Get the best prices by aggregating liquidity from 20+ decentralized exchanges
- **Real-time Price Feeds**: Live cryptocurrency prices with automatic updates every 30 seconds  
- **Multi-Chain Support**: Trade across Ethereum, Solana, Bitcoin, and more blockchain networks
- **Smart Routing**: Advanced algorithms to find optimal swap routes with minimal slippage
- **MEV Protection**: Built-in protection against Maximum Extractable Value attacks

### User Experience
- **Intuitive Interface**: Clean, modern UI built with shadcn/ui components
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile devices
- **Dark/Light Theme**: Automatic theme detection with manual toggle support
- **Real-time Updates**: Live transaction status and portfolio balance updates
- **Transaction History**: Complete history of all swaps and transactions

### Security & Authentication
- **Supabase Authentication**: Secure signup/login with email verification
- **Row-Level Security**: Database-level security ensuring user data privacy
- **Input Validation**: Comprehensive client and server-side input sanitization
- **Error Boundaries**: Graceful error handling to prevent application crashes
- **Wallet Security**: Support for MetaMask, Phantom, WalletConnect, and custom wallet generation

### Developer Experience
- **TypeScript**: Full type safety and enhanced development experience
- **Modern React**: Built with React 18, hooks, and functional components
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Vite**: Lightning-fast build tool and development server
- **ESLint**: Code quality and consistency enforcement

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI library with hooks and concurrent features
- **TypeScript** - Type-safe JavaScript for better developer experience
- **Vite** - Next-generation frontend build tool
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality, accessible React components
- **React Router** - Declarative routing for React applications
- **Tanstack Query** - Powerful data synchronization for React
- **Lucide React** - Beautiful & consistent icon toolkit

### Backend & Database
- **Supabase** - Open-source Firebase alternative
- **PostgreSQL** - Robust, feature-rich relational database
- **Row Level Security (RLS)** - Database-level security policies
- **Real-time Subscriptions** - Live data updates via WebSocket connections

### Blockchain Integration
- **ethers.js** - Ethereum blockchain interaction library
- **@solana/web3.js** - Solana blockchain SDK
- **bitcoinjs-lib** - Bitcoin transaction library
- **Wallet Adapters** - Support for multiple wallet providers

### Cryptocurrency Features
- **BIP39/BIP32** - Hierarchical deterministic wallet generation
- **Multi-signature Support** - Enhanced security for large transactions
- **Hardware Wallet Support** - Integration with Ledger and Trezor
- **Gas Estimation** - Accurate transaction fee calculation

## 📦 Installation & Setup

### Prerequisites
- Node.js 18.0.0 or higher
- npm 8.0.0 or higher
- Git for version control

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd multi-swap-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   
   The application uses Supabase for backend services. The configuration is already set up in the codebase:
   - Database URL: `https://opnmdddqushvzxjqjgbv.supabase.co`
   - Public API Key: Available in `src/integrations/supabase/client.ts`

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173` to see the application running.

### Database Setup

The application automatically handles database setup through Supabase migrations. The following tables are created:

- `profiles` - User profile information and wallet preferences
- `transactions` - Complete transaction history with status tracking
- Authentication tables managed by Supabase Auth

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Connect GitHub to Vercel**
   - Sign up at [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect it as a Vite project

2. **Configure Environment Variables** (if needed)
   
   All necessary configuration is already included in the codebase.

3. **Deploy**
   
   Vercel will automatically deploy your application and provide a live URL.

### Alternative Deployment Options

#### Netlify
1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on push to main branch

#### Manual Build
```bash
npm run build
```
The built files will be in the `dist` directory, ready for any static hosting service.

## 🔧 Configuration

### Supabase Configuration
The application is pre-configured with Supabase. For production deployments, consider:

1. **Custom Domain**: Configure your custom domain in Supabase dashboard
2. **Email Templates**: Customize authentication email templates
3. **Security Settings**: Review and adjust authentication settings
4. **Database Backups**: Set up automated database backups

### Theme Customization
Modify the design system in `src/index.css`:
- Color palette using HSL values
- Gradients and shadows
- Typography and spacing
- Component-specific styling

## 📱 Features Overview

### Authentication System
- Email/password authentication with verification
- Secure session management
- Protected routes with automatic redirection
- User profile management

### Wallet Management
- Multi-chain wallet support (Ethereum, Solana, Bitcoin)
- Hardware wallet integration
- Custom wallet generation with mnemonic phrases
- Real-time balance tracking

### Trading Interface
- Token search and selection
- Real-time price updates
- Slippage and gas fee estimation
- Transaction status monitoring

### Portfolio Dashboard
- Portfolio value tracking
- 24h change indicators
- Token balance overview
- Recent transaction history

## 🔒 Security Features

### Authentication Security
- Secure session management with Supabase Auth
- Email verification for new accounts
- Password complexity requirements
- Automatic session refresh

### Database Security
- Row Level Security (RLS) policies
- User data isolation
- Secure API endpoints
- Input validation and sanitization

### Blockchain Security
- Transaction simulation before execution
- MEV protection mechanisms
- Secure wallet integration
- Private key protection

## 🤝 Contributing

We welcome contributions to Multi Swap Hub! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes and add tests if applicable
4. Commit your changes: `git commit -m 'Add some feature'`
5. Push to the branch: `git push origin feature/your-feature-name`
6. Submit a pull request

### Development Guidelines
- Follow TypeScript best practices
- Use the established design system
- Write meaningful commit messages
- Add JSDoc comments for complex functions
- Ensure responsive design compatibility

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, questions, or feature requests:
- Create an issue in the GitHub repository
- Check the documentation in the `/docs` folder
- Review the FAQ section below

## ❓ FAQ

### Q: How do I connect my wallet?
A: Click the "Connect Wallet" button and choose from supported wallets (MetaMask, Phantom, WalletConnect) or create a new wallet directly in the app.

### Q: Which blockchain networks are supported?
A: Currently supporting Ethereum, Solana, and Bitcoin networks, with more chains being added regularly.

### Q: Are my funds safe?
A: Yes, the application is non-custodial. Your private keys remain in your control, and we never have access to your funds.

### Q: How are the best prices determined?
A: Our aggregation algorithm checks prices across 20+ DEXs in real-time and routes your trade through the most efficient path.

### Q: Can I use this on mobile?
A: Absolutely! The application is fully responsive and works seamlessly on mobile devices through mobile browsers and wallet apps.

## 🚦 Status

- ✅ Core swap functionality
- ✅ Multi-chain wallet support  
- ✅ Authentication system
- ✅ Transaction history
- ✅ Real-time price feeds
- ✅ Responsive design
- 🔄 Advanced trading features (in development)
- 🔄 Mobile app (planned)

---

Built with ❤️ using modern web technologies. Happy trading! 🚀