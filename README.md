# Educational Profile System

A comprehensive web application for creating, managing, and showcasing educational profiles. Built with modern technologies and featuring a beautiful, responsive design.

## 🌟 Features

### Core Functionality
- **User Authentication**: Secure registration and login system with JWT tokens
- **Profile Management**: Create, edit, view, and delete educational profiles
- **Comprehensive Profiles**: Support for education, skills, experience, projects, certifications, languages, and interests
- **File Upload**: Profile picture upload with image handling
- **Search & Discovery**: Browse and search through public profiles
- **Responsive Design**: Mobile-first design that works on all devices

### User Experience
- **Modern UI**: Beautiful, gradient-based design with smooth animations
- **Intuitive Navigation**: Clean navigation with authentication-aware menu items
- **Real-time Feedback**: Toast notifications for user actions
- **Loading States**: Smooth loading animations and skeleton screens
- **Form Validation**: Client-side and server-side validation

## 🚀 Technology Stack

### Backend
- **Node.js** with Express.js framework
- **JWT** for authentication
- **Multer** for file uploads
- **bcryptjs** for password hashing
- **Helmet** for security headers
- **Rate limiting** for API protection
- **CORS** for cross-origin requests

### Frontend
- **React 18** with functional components and hooks
- **React Router** for client-side routing
- **Styled Components** for CSS-in-JS styling
- **Axios** for API requests
- **React Hook Form** for form handling
- **React Toastify** for notifications
- **Lucide React** for beautiful icons
- **Framer Motion** for animations

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd educational-profile
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   npm install

   # Install frontend dependencies
   cd client
   npm install
   cd ..
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   JWT_SECRET=your-super-secret-jwt-key
   NODE_ENV=development
   ```

4. **Start the application**
   ```bash
   # Start both backend and frontend in development mode
   npm run dev
   ```

   Or start them separately:
   ```bash
   # Terminal 1 - Backend
   npm run server

   # Terminal 2 - Frontend
   npm run client
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 🏗️ Project Structure

```
educational-profile/
├── server/
│   └── index.js                 # Express server and API routes
├── client/
│   ├── public/
│   │   └── index.html          # HTML template
│   └── src/
│       ├── components/         # Reusable React components
│       │   ├── Navbar.js
│       │   └── ProtectedRoute.js
│       ├── pages/              # Page components
│       │   ├── Home.js
│       │   ├── Login.js
│       │   ├── Register.js
│       │   ├── Dashboard.js
│       │   ├── CreateProfile.js
│       │   ├── EditProfile.js
│       │   ├── ViewProfile.js
│       │   └── Profiles.js
│       ├── utils/              # Utility functions and contexts
│       │   ├── AuthContext.js
│       │   └── GlobalStyles.js
│       ├── App.js              # Main App component
│       └── index.js            # React entry point
├── uploads/                    # File upload directory
├── package.json               # Backend dependencies
└── README.md                  # This file
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Profiles
- `GET /api/profiles` - Get all public profiles
- `GET /api/profiles/:id` - Get specific profile
- `POST /api/profiles` - Create new profile (authenticated)
- `PUT /api/profiles/:id` - Update profile (authenticated)
- `DELETE /api/profiles/:id` - Delete profile (authenticated)
- `GET /api/user/profiles` - Get current user's profiles (authenticated)

## 🎨 Design System

### Color Palette
- **Primary**: `#667eea` (Blue gradient start)
- **Secondary**: `#764ba2` (Purple gradient end)
- **Success**: `#10b981` (Green)
- **Warning**: `#f59e0b` (Amber)
- **Error**: `#ef4444` (Red)
- **Text Primary**: `#1f2937` (Dark gray)
- **Text Secondary**: `#6b7280` (Medium gray)
- **Background**: `#f9fafb` (Light gray)

### Typography
- **Font Family**: Inter, system fonts
- **Headings**: Bold weights (600-700)
- **Body Text**: Regular weight (400)
- **UI Elements**: Medium weight (500)

### Components
- **Cards**: Rounded corners, subtle shadows, clean borders
- **Buttons**: Gradient backgrounds, hover animations
- **Forms**: Clean inputs with focus states
- **Navigation**: Sticky header with backdrop blur

## 📱 Responsive Design

The application is built with a mobile-first approach:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

Key responsive features:
- Collapsible navigation menu on mobile
- Flexible grid layouts that adapt to screen size
- Touch-friendly button sizes
- Optimized typography scaling

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Rate Limiting**: API rate limiting to prevent abuse
- **CORS Protection**: Configured cross-origin request handling
- **Helmet Security**: Security headers for protection
- **Input Validation**: Both client and server-side validation
- **File Upload Security**: Restricted file types and sizes

## 🚀 Deployment

### Production Build
```bash
# Build the React frontend
cd client
npm run build
cd ..

# Start production server
NODE_ENV=production npm start
```

### Environment Variables for Production
```env
NODE_ENV=production
PORT=5000
JWT_SECRET=your-production-jwt-secret
```

### Deployment Platforms
The application can be deployed on:
- **Heroku**: Add Procfile and configure buildpacks
- **Vercel**: Deploy frontend, use serverless functions for API
- **DigitalOcean**: Use App Platform or Droplets
- **AWS**: EC2, Elastic Beanstalk, or Lambda
- **Netlify**: Frontend deployment with backend on separate service

## 🧪 Testing

### Running Tests
```bash
# Frontend tests
cd client
npm test

# Backend tests (if implemented)
npm test
```

### Test Coverage
- Component rendering tests
- API endpoint tests
- Authentication flow tests
- Form validation tests

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow React best practices and hooks patterns
- Use semantic commit messages
- Maintain consistent code formatting
- Add tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions:
1. Check the existing issues on GitHub
2. Create a new issue with detailed information
3. Include error messages, browser version, and steps to reproduce

## 🔮 Future Enhancements

- **Database Integration**: MongoDB or PostgreSQL for persistent data
- **Email Verification**: Email confirmation for new accounts
- **Social Login**: Google, GitHub, LinkedIn authentication
- **Profile Templates**: Pre-designed profile layouts
- **Export Features**: PDF export of profiles
- **Analytics Dashboard**: Profile view statistics
- **Messaging System**: Direct messaging between users
- **Advanced Search**: Filters by skills, location, education level
- **Recommendations**: AI-powered profile suggestions
- **Mobile App**: React Native mobile application

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Styled Components** for CSS-in-JS styling
- **Lucide** for beautiful icons
- **Inter Font** for clean typography
- **Community** for inspiration and feedback

---

**Built with ❤️ for the educational community**