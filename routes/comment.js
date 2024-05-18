// routes/comment.js
import express from 'express';
import { db } from '../config/firebase.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all comments
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('comments').get();
    const commentList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).send(commentList);
  } catch (error) {
    res.status(500).send({ error: 'Something went wrong' });
  }
});

// Create new comment (auth required)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const newComment = req.body;
    const docRef = await db.collection('comments').add(newComment);
    res.status(201).send({ id: docRef.id, ...newComment });
  } catch (error) {
    res.status(500).send({ error: 'Something went wrong' });
  }
});

export default router;
