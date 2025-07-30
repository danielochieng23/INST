# Rubica - Professional Service Platform

A modern, secure platform connecting clients with verified professional service providers. Built with React.js frontend and Node.js backend.

## 🌟 Features

### Core Functionality
- **Advanced Search**: Location-based search with service type filtering
- **Provider Profiles**: Detailed profiles with galleries, services, pricing, and reviews  
- **Secure Messaging**: Encrypted communication between clients and providers
- **User Authentication**: Role-based authentication for clients and providers
- **Provider Dashboard**: Complete profile and booking management
- **Review System**: Rating and review system for quality assurance

### Security & Compliance
- **Age Verification**: 18+ compliance modal
- **Data Encryption**: End-to-end encrypted communications
- **SSL/HTTPS**: Secure data transmission
- **GDPR Compliance**: Privacy-focused data handling
- **Rate Limiting**: API protection against abuse
- **Input Validation**: Comprehensive security measures

### User Experience
- **Responsive Design**: Mobile-first, modern UI with Tailwind CSS
- **Real-time Features**: Live messaging and notifications
- **Advanced Filtering**: Price, location, rating, language filters
- **Multiple View Modes**: Grid and list view for search results
- **Professional Design**: Clean, trustworthy interface

## 🚀 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Lucide React** for icons
- **Axios** for API communication

### Backend
- **Node.js** with Express.js
- **TypeScript** for type safety
- **MongoDB** with Mongoose
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Helmet** for security headers
- **CORS** for cross-origin requests
- **Rate Limiting** for API protection

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup
```bash
cd rubica-backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

### Frontend Setup
```bash
cd rubica-frontend
npm install
npm start
```

## 🔧 Configuration

### Environment Variables (Backend)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/rubica
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=7d
BCRYPT_SALT_ROUNDS=12
MAX_FILE_SIZE=5242880
UPLOAD_PATH=uploads/
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
CORS_ORIGIN=http://localhost:3000
```

## 🏗️ Project Structure

```
rubica/
├── rubica-frontend/          # React frontend
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── utils/           # Utility functions
│   │   ├── types/           # TypeScript types
│   │   └── contexts/        # React contexts
│   └── public/
├── rubica-backend/          # Node.js backend
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── models/          # Database models
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Custom middleware
│   │   ├── utils/           # Utility functions
│   │   └── types/           # TypeScript types
│   └── uploads/             # File uploads
└── README.md
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Providers
- `GET /api/providers` - Search providers
- `GET /api/providers/:id` - Get provider details
- `PUT /api/providers/:id` - Update provider profile
- `POST /api/providers/:id/reviews` - Add review

### Messaging
- `GET /api/messages` - Get message threads
- `POST /api/messages` - Send message
- `GET /api/messages/:threadId` - Get thread messages

## 🎨 Design System

### Colors
- **Primary**: Red palette (#dc2626 - #fef2f2)
- **Secondary**: Slate palette (#0f172a - #f8fafc)
- **Accent**: Used for status indicators and highlights

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold weights for hierarchy
- **Body**: Regular weight for readability

### Components
- **Cards**: Consistent shadow and border radius
- **Buttons**: Primary and secondary variants
- **Forms**: Consistent input styling with focus states
- **Icons**: Lucide React icon set

## 🔒 Security Features

1. **Age Verification**: Legal compliance modal
2. **Input Sanitization**: XSS protection
3. **Rate Limiting**: API abuse prevention
4. **HTTPS Enforcement**: Secure data transmission
5. **JWT Authentication**: Secure session management
6. **Password Hashing**: bcrypt with salt rounds
7. **CORS Configuration**: Controlled cross-origin access
8. **Helmet Integration**: Security headers

## 📱 Mobile Responsiveness

- Mobile-first design approach
- Responsive navigation with mobile menu
- Touch-friendly interface elements
- Optimized layouts for all screen sizes
- Progressive Web App capabilities

## 🚀 Deployment

### Frontend (Netlify/Vercel)
```bash
cd rubica-frontend
npm run build
# Deploy dist folder
```

### Backend (Heroku/DigitalOcean)
```bash
cd rubica-backend
npm run build
# Deploy with process manager
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## ⚠️ Legal Notice

This platform is designed for adult services and requires users to be 18 years or older. All content and interactions must comply with local laws and regulations. The platform implements age verification and content moderation to ensure legal compliance.

## 📞 Support

For support, email support@rubicahub.com or create an issue in the repository.

---

**Built with ❤️ for professional service providers and their clients.**