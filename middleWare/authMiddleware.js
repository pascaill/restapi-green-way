// middleware/authMiddleware.js
import { adminAuth } from '../config/firebase.js';

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).send({ error: 'No token provided' });
  }

  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).send({ error: 'Invalid token' });
  }
};

export default authMiddleware;