import express from 'express';
import { db } from '../config/firebase.js';
import authMiddleware from './middleware/authMiddleware.js';

const router = express.Router();

//get all
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('community').get();
    const communityList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).send(communityList);
  } catch (error) {
    res.status(500).send({ error: 'Something went wrong' });
  }
});

// Create new  (auth required)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const newCommunity = req.body;
    const docRef = await db.collection('community').add(newCommunity);
    res.status(201).send({ id: docRef.id, ...newCommunity });
  } catch (error) {
    res.status(500).send({ error: 'Something went wrong' });
  }
});

// Update by ID (auth required)
router.put('/:id', authMiddleware, async (req, res) => {
  const communityId = req.params.id;
  const updatedCommunity = req.body;
  try {
    const docRef = db.collection('community').doc(communityId);
    const doc = await docRef.get();
    if (!doc.exists) {
      res.status(404).send({ error: 'Community not found' });
    } else {
      await docRef.update(updatedCommunity);
      res.status(200).send({ id: communityId, ...updatedCommunity });
    }
  } catch (error) {
    res.status(500).send({ error: 'Something went wrong' });
  }
});

// Delete  by ID (auth required)
router.delete('/:id', authMiddleware, async (req, res) => {
  const communityId = req.params.id;
  try {
    const docRef = db.collection('community').doc(communityId);
    const doc = await docRef.get();
    if (!doc.exists) {
      res.status(404).send({ error: 'Community not found' });
    } else {
      await docRef.delete();
      res.status(200).send({ message: 'Community deleted' });
    }
  } catch (error) {
    res.status(500).send({ error: 'Something went wrong' });
  }
});

export default router;
