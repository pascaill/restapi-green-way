// routes/wisata.js
import express from 'express';
import { db } from '../config/firebase.js';
import authMiddleware from './middleware/authMiddleware.js';

const router = express.Router();

// Get all wisata
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('wisata').get();
    const wisataList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).send(wisataList);
  } catch (error) {
    res.status(500).send({ error: 'Something went wrong' });
  }
});

// Create new wisata (auth required)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const newWisata = req.body;
    const docRef = await db.collection('wisata').add(newWisata);
    res.status(201).send({ id: docRef.id, ...newWisata });
  } catch (error) {
    res.status(500).send({ error: 'Something went wrong' });
  }
});

// Update wisata by ID (auth required)
router.put('/:id', authMiddleware, async (req, res) => {
  const wisataId = req.params.id;
  const updatedWisata = req.body;
  try {
    const docRef = db.collection('wisata').doc(wisataId);
    const doc = await docRef.get();
    if (!doc.exists) {
      res.status(404).send({ error: 'Wisata not found' });
    } else {
      await docRef.update(updatedWisata);
      res.status(200).send({ id: wisataId, ...updatedWisata });
    }
  } catch (error) {
    res.status(500).send({ error: 'Something went wrong' });
  }
});

// Delete wisata by ID (auth required)
router.delete('/:id', authMiddleware, async (req, res) => {
  const wisataId = req.params.id;
  try {
    const docRef = db.collection('wisata').doc(wisataId);
    const doc = await docRef.get();
    if (!doc.exists) {
      res.status(404).send({ error: 'Wisata not found' });
    } else {
      await docRef.delete();
      res.status(200).send({ message: 'Wisata deleted' });
    }
  } catch (error) {
    res.status(500).send({ error: 'Something went wrong' });
  }
});

export default router;
