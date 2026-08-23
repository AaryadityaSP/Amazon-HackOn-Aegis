// src/middleware/auth.js
// Firebase Admin SDK authentication middleware

const admin = require('firebase-admin');

const { getApps, initializeApp, cert } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');

// Initialize Firebase Admin (uses env vars or service account)
if (!getApps().length) {
  try {
    // Try using service account if available
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
      initializeApp({
        credential: cert(serviceAccount)
      });
    } else {
      // Fall back to default credentials or project ID
      initializeApp({
        projectId: process.env.FIREBASE_PROJECT_ID || 'replica-6d668'
      });
    }
    console.log('🔐 Firebase Admin initialized');
  } catch (error) {
    console.warn('⚠️ Firebase Admin init failed, auth middleware will use fallback:', error.message);
  }
}

/**
 * Verify Firebase ID token from Authorization header
 * For demo: if no token provided, uses a demo user identity
 */
const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split('Bearer ')[1];

      try {
        const decodedToken = await getAuth().verifyIdToken(token);
        req.user = {
          uid: decodedToken.uid,
          email: decodedToken.email,
          name: decodedToken.name || decodedToken.email?.split('@')[0],
          role: decodedToken.role || 'customer' // custom claim
        };
        console.log(`🔐 Authenticated: ${req.user.email} (${req.user.role})`);
      } catch (tokenError) {
        console.warn('⚠️ Token verification failed:', tokenError.message);
        // Fall through to demo mode
        req.user = getDemoUser(req);
      }
    } else {
      // Demo mode: assign demo user based on route
      req.user = getDemoUser(req);
    }

    next();
  } catch (error) {
    console.error('❌ Auth middleware error:', error);
    next(); // Don't block in demo mode
  }
};

/**
 * Get demo user based on route context
 * Allows testing without Firebase auth setup
 */
function getDemoUser(req) {
  const path = req.originalUrl || req.url;

  if (path.includes('/seller')) {
    return {
      uid: 'demo-seller-001',
      email: 'seller@aegis-demo.com',
      name: 'Demo Seller',
      role: 'seller'
    };
  }

  if (path.includes('/admin')) {
    return {
      uid: 'demo-admin-001',
      email: 'admin@aegis-demo.com',
      name: 'Aegis Admin',
      role: 'admin'
    };
  }

  return {
    uid: 'demo-customer-001',
    email: 'customer@aegis-demo.com',
    name: 'Demo Customer',
    role: 'customer'
  };
}

/**
 * Optional: require specific role
 */
const requireRole = (role) => {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      next();
    } else {
      res.status(403).json({
        error: 'Forbidden',
        message: `This endpoint requires ${role} role`
      });
    }
  };
};

module.exports = { verifyToken, requireRole };
