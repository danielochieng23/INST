const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// MongoDB connection (using in-memory for demo)
const profiles = [];
let profileIdCounter = 1;

// User Schema (in-memory simulation)
const users = [];
let userIdCounter = 1;

// JWT middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET || 'educational-profile-secret', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Routes

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if user exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const user = {
      id: userIdCounter++,
      username,
      email,
      password: hashedPassword,
      createdAt: new Date()
    };
    
    users.push(user);
    
    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'educational-profile-secret',
      { expiresIn: '24h' }
    );
    
    res.status(201).json({
      message: 'User created successfully',
      token,
      user: { id: user.id, username: user.username, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'educational-profile-secret',
      { expiresIn: '24h' }
    );
    
    res.json({
      token,
      user: { id: user.id, username: user.username, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Profile Routes
app.get('/api/profiles', (req, res) => {
  res.json(profiles);
});

app.get('/api/profiles/:id', (req, res) => {
  const profile = profiles.find(p => p.id === parseInt(req.params.id));
  if (!profile) {
    return res.status(404).json({ message: 'Profile not found' });
  }
  res.json(profile);
});

app.post('/api/profiles', authenticateToken, upload.single('avatar'), (req, res) => {
  try {
    const {
      firstName,
      lastName,
      bio,
      education,
      skills,
      experience,
      projects,
      certifications,
      languages,
      interests
    } = req.body;

    const profile = {
      id: profileIdCounter++,
      userId: req.user.id,
      firstName,
      lastName,
      bio,
      avatar: req.file ? `/uploads/${req.file.filename}` : null,
      education: JSON.parse(education || '[]'),
      skills: JSON.parse(skills || '[]'),
      experience: JSON.parse(experience || '[]'),
      projects: JSON.parse(projects || '[]'),
      certifications: JSON.parse(certifications || '[]'),
      languages: JSON.parse(languages || '[]'),
      interests: JSON.parse(interests || '[]'),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    profiles.push(profile);
    res.status(201).json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/profiles/:id', authenticateToken, upload.single('avatar'), (req, res) => {
  try {
    const profileIndex = profiles.findIndex(p => p.id === parseInt(req.params.id));
    if (profileIndex === -1) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    const profile = profiles[profileIndex];
    if (profile.userId !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const {
      firstName,
      lastName,
      bio,
      education,
      skills,
      experience,
      projects,
      certifications,
      languages,
      interests
    } = req.body;

    profiles[profileIndex] = {
      ...profile,
      firstName: firstName || profile.firstName,
      lastName: lastName || profile.lastName,
      bio: bio || profile.bio,
      avatar: req.file ? `/uploads/${req.file.filename}` : profile.avatar,
      education: education ? JSON.parse(education) : profile.education,
      skills: skills ? JSON.parse(skills) : profile.skills,
      experience: experience ? JSON.parse(experience) : profile.experience,
      projects: projects ? JSON.parse(projects) : profile.projects,
      certifications: certifications ? JSON.parse(certifications) : profile.certifications,
      languages: languages ? JSON.parse(languages) : profile.languages,
      interests: interests ? JSON.parse(interests) : profile.interests,
      updatedAt: new Date()
    };

    res.json(profiles[profileIndex]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/profiles/:id', authenticateToken, (req, res) => {
  const profileIndex = profiles.findIndex(p => p.id === parseInt(req.params.id));
  if (profileIndex === -1) {
    return res.status(404).json({ message: 'Profile not found' });
  }

  const profile = profiles[profileIndex];
  if (profile.userId !== req.user.id) {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  profiles.splice(profileIndex, 1);
  res.json({ message: 'Profile deleted successfully' });
});

// Get user's profiles
app.get('/api/user/profiles', authenticateToken, (req, res) => {
  const userProfiles = profiles.filter(p => p.userId === req.user.id);
  res.json(userProfiles);
});

// Create uploads directory
const fs = require('fs');
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Serve static files from React app
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});