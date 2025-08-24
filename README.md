# Dyann AI - Sales Data Analysis Platform

**Built by Crossconnectors**

Dyann AI is a comprehensive sales data analysis platform that simplifies CSV data processing, provides powerful analytics, and offers AI assistance for business insights.

## 🚀 Features

### Core Functionality
- **CSV Upload & Processing**: Drag-and-drop interface for sales data uploads
- **Sales Analytics Dashboard**: Comprehensive metrics and visualizations
- **AI Assistant**: Intelligent chat interface with voice capabilities
- **Customer Reviews Management**: Complete review system with sentiment analysis
- **Responsive Design**: Mobile-first approach with modern UI/UX
- **Authentication**: Secure email/password authentication with Firebase
- **AI Insights**: Gemini Flash 2.0 powered dashboard suggestions

### Technical Features
- **React 19**: Latest React features and performance optimizations
- **Firebase Integration**: Authentication, Realtime Database, and Firestore
- **Google Gemini AI**: Advanced AI suggestions and insights
- **Modern CSS**: CSS custom properties, Grid, Flexbox, and animations
- **Responsive Layout**: Optimized for all device sizes
- **Component Architecture**: Modular, reusable components
- **State Management**: React hooks for efficient state handling

## 🎨 Design System

### Color Scheme
- **White-Black-Fresh (60-30-10 ratio)**
- Primary: Fresh Cyan (#06b6d4)
- Secondary: Dark Gray (#1e293b)
- Accent: Light Gray (#f8fafc)

### Typography
- **Font Family**: Inter (system fallbacks)
- **Scale**: 12px to 36px with consistent ratios
- **Weights**: 400, 500, 600, 700

### Components
- **Buttons**: Primary, Secondary, Large variants
- **Cards**: Consistent spacing and shadows
- **Forms**: Accessible input styling
- **Navigation**: Fixed header with mobile menu

## 📱 Pages & Components

### 1. Home Page
- Hero section with call-to-action
- Feature overview with icons
- Modern gradient backgrounds

### 2. Login/Authentication
- Email/password authentication
- User registration and login
- Protected routes
- User profile management

### 3. Dyann Page (CSV Upload)
- Drag-and-drop file upload
- File validation and processing
- Success/error handling
- Feature preview

### 4. Dashboard
- Key metrics display
- Sales performance analytics
- Category distribution charts
- Recent activity feed
- **AI Insights**: Gemini-powered suggestions and recommendations

### 5. AI Assistant
- Chat interface with typing indicators
- Voice input capabilities
- Quick question suggestions
- Chat export/import functionality

### 6. Reviews Management
- Customer feedback overview
- Add/edit/delete reviews
- Sentiment analysis
- Rating system

## 🛠️ Technology Stack

- **Frontend**: React 19, Vite
- **Backend Services**: Firebase (Auth, Database, Firestore, Storage)
- **AI Integration**: Google Gemini Flash 2.0
- **Styling**: CSS3 with custom properties
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Package Manager**: npm
- **Deployment**: Vercel

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm 9+
- Firebase project
- Google Gemini API key

### Quick Start
```bash
# Clone the repository
git clone <repository-url>
cd dyann

# Install dependencies
npm install

# Set up environment variables
cp env.example .env.local
# Edit .env.local with your Firebase and Gemini API keys

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🌐 Deployment

### Vercel Deployment (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy to Vercel**:
   ```bash
   vercel
   ```

3. **Set Environment Variables** in Vercel Dashboard:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
   - `VITE_FIREBASE_MEASUREMENT_ID`
   - `VITE_FIREBASE_DATABASE_URL`
   - `VITE_GEMINI_API_KEY`

4. **Deploy Firebase Security Rules**:
   ```bash
   chmod +x deploy-firebase-rules.sh
   ./deploy-firebase-rules.sh
   ```

### Environment Variables

Create a `.env.local` file for local development:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
VITE_FIREBASE_DATABASE_URL=https://your_project.firebaseio.com

# Google Gemini AI
VITE_GEMINI_API_KEY=your_gemini_api_key
```

## 🏗️ Project Structure

```
dyann/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable components
│   │   ├── Navbar.jsx     # Navigation component
│   │   ├── Footer.jsx     # Footer component
│   │   ├── Login.jsx      # Authentication component
│   │   ├── AISuggestions.jsx # AI insights component
│   │   └── *.css          # Component styles
│   ├── contexts/          # React contexts
│   │   └── AuthContext.jsx # Authentication context
│   ├── services/          # API services
│   │   └── geminiService.js # Gemini AI service
│   ├── pages/             # Page components
│   │   ├── Home.jsx       # Landing page
│   │   ├── DyannPage.jsx  # CSV upload page
│   │   ├── Dashboard.jsx  # Analytics dashboard
│   │   ├── Assistant.jsx  # AI chat interface
│   │   ├── Reviews.jsx    # Reviews management
│   │   └── *.css          # Page styles
│   ├── App.jsx            # Main app component
│   ├── App.css            # Global styles
│   ├── main.jsx           # Entry point
│   ├── firebase.js        # Firebase configuration
│   └── index.css          # Base styles
├── firebase.json          # Firebase configuration
├── firestore.rules        # Firestore security rules
├── database.rules.json    # Realtime Database rules
├── storage.rules          # Storage security rules
├── vercel.json            # Vercel configuration
├── package.json           # Dependencies & scripts
├── vite.config.js         # Vite configuration
├── deploy-firebase-rules.sh # Firebase rules deployment script
└── README.md              # Project documentation
```

## 🔒 Security Features

### Firebase Security Rules
- **Authentication Required**: All routes require user authentication
- **User Data Isolation**: Users can only access their own data
- **Input Validation**: Server-side data validation
- **Rate Limiting**: API request limits

### Environment Variables
- **Client-Side**: Only `VITE_` prefixed variables are exposed
- **Server-Side**: Sensitive keys remain secure
- **Production**: Variables set in Vercel dashboard

## 🎯 Key Features Implementation

### Authentication System
- Email/password registration and login
- Protected routes with automatic redirects
- User session management
- Profile management

### AI Integration
- Gemini Flash 2.0 for intelligent insights
- Dashboard suggestions and recommendations
- Chart optimization recommendations
- Business insights and trend analysis

### CSV Processing
- File validation (type, size)
- Drag-and-drop interface
- Progress indicators
- Error handling

### Analytics Dashboard
- Real-time metrics display
- Interactive chart placeholders
- Responsive grid layouts
- Performance optimizations
- AI-powered insights

### AI Assistant
- Chat message handling
- Typing indicators
- Voice input simulation
- Quick question suggestions

### Reviews System
- CRUD operations
- Sentiment analysis
- Rating visualization
- Category management

## 🔧 Customization

### Colors
Update CSS custom properties in `src/App.css`:
```css
:root {
  --color-fresh: #06b6d4;
  --color-fresh-light: #22d3ee;
  --color-fresh-dark: #0891b2;
}
```

### Spacing
Modify spacing scale in CSS variables:
```css
:root {
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --spacing-2xl: 3rem;
}
```

### Typography
Update font sizes and weights:
```css
:root {
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;
  --font-size-4xl: 2.25rem;
}
```

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 480px
- **Tablet**: 480px - 768px
- **Desktop**: > 768px

### Mobile Features
- Collapsible navigation menu
- Touch-friendly interactions
- Optimized layouts for small screens
- Responsive typography scaling

## 🚀 Performance Features

- **Lazy Loading**: Component-based code splitting
- **CSS Optimization**: Efficient selectors and properties
- **Image Optimization**: SVG icons for scalability
- **Bundle Optimization**: Vite build optimizations
- **Firebase Optimization**: Efficient database queries

## 🔒 Security Considerations

- **Input Validation**: File type and size validation
- **XSS Prevention**: Safe content rendering
- **CSRF Protection**: Form submission security
- **Data Sanitization**: User input cleaning
- **Authentication**: Secure user sessions
- **Authorization**: Role-based access control

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Navigation between all pages
- [ ] Responsive design on different screen sizes
- [ ] Form validation and submission
- [ ] File upload functionality
- [ ] Chat interface interactions
- [ ] Review management operations
- [ ] AI suggestions generation
- [ ] Protected route access

### Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📈 Future Enhancements

### Planned Features
- **Real Charts**: Integration with Recharts library
- **Advanced Analytics**: Machine learning insights
- **Export Functionality**: PDF/Excel report generation
- **Real-time Updates**: WebSocket integration
- **Multi-language Support**: Internationalization
- **Advanced AI Features**: Predictive analytics

### Technical Improvements
- **TypeScript**: Add type safety
- **Testing**: Jest and React Testing Library
- **State Management**: Redux Toolkit or Zustand
- **Performance**: React.memo and useMemo optimizations
- **Accessibility**: ARIA labels and keyboard navigation

## 🤝 Contributing

### Development Guidelines
1. Follow existing code style and patterns
2. Use semantic HTML and accessible markup
3. Maintain responsive design principles
4. Write clean, documented code
5. Test across different devices and browsers
6. Ensure Firebase security rules are updated

### Code Style
- **Components**: Functional components with hooks
- **CSS**: BEM methodology with CSS custom properties
- **Naming**: Descriptive, consistent naming conventions
- **Comments**: Clear, helpful code documentation

## 📄 License

This project is proprietary software built by Crossconnectors. All rights reserved.

## 📞 Support

For technical support or questions:
- **Email**: support@crossconnectors.com
- **Documentation**: [Project Wiki]
- **Issues**: [GitHub Issues]

---

**Built with ❤️ by Crossconnectors**

*Simplifying sales data analysis with AI intelligence*
