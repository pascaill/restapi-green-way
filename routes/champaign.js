import express from 'express';
import { db } from '../config/firebase.js';
import authMiddleware from '../middleWare/authMiddleware.js';

const router = express.Router();

// Get all 
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('champaign').get();
    const champaignList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).send(champaignList);
  } catch (error) {
    res.status(500).send({ error: 'Something went wrong' });
  }
});

// Create new  (auth required)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const newChampaign = req.body;
    const docRef = await db.collection('champaign').add(newChampaign);
    res.status(201).send({ id: docRef.id, ...newChampaign});
  } catch (error) {
    res.status(500).send({ error: 'Something went wrong' });
  }
});

// Update by ID (auth required)
router.put('/:id', authMiddleware, async (req, res) => {
  const champaignId = req.params.id;
  const updatedChampaign = req.body;
  try {
    const docRef = db.collection('champaign').doc(champaignId);
    const doc = await docRef.get();
    if (!doc.exists) {
      res.status(404).send({ error: 'Champaign not found' });
    } else {
      await docRef.update(updatedChampaign);
      res.status(200).send({ id: champaignId, ...updatedChampaign });
    }
  } catch (error) {
    res.status(500).send({ error: 'Something went wrong' });
  }
});

// Delete  by ID (auth required)
router.delete('/:id', authMiddleware, async (req, res) => {
  const champaignId = req.params.id;
  try {
    const docRef = db.collection('champaign').doc(champaignId);
    const doc = await docRef.get();
    if (!doc.exists) {
      res.status(404).send({ error: 'champaign not found' });
    } else {
      await docRef.delete();
      res.status(200).send({ message: 'champaign deleted' });
    }
  } catch (error) {
    res.status(500).send({ error: 'Something went wrong' });
  }
});

export default router;
