import express from 'express';
import { db } from '../config/firebase.js';

const router = express.Router();

// Endpoint untuk mendapatkan semua community
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('community').get();
    const communityList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).send(communityList);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Something went wrong' });
  }
});

// Endpoint untuk mendapatkan community berdasarkan ID
router.get('/:id', async (req, res) => {
  const communityId = req.params.id;
  try {
    const doc = await db.collection('community').doc(communityId).get();
    if (!doc.exists) {
      res.status(404).send({ error: 'Community not found' });
    } else {
      res.status(200).send({ id: doc.id, ...doc.data() });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Something went wrong' });
  }
});

// Endpoint untuk menambahkan community baru
router.post('/', async (req, res) => {
  const newCommunity = req.body;
  try {
    const docRef = await db.collection('community').add(newCommunity);
    res.status(201).send({ id: docRef.id, ...newCommunity });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Something went wrong' });
  }
});

// Endpoint untuk memperbarui community berdasarkan ID
router.put('/:id', async (req, res) => {
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
    console.error(error);
    res.status(500).send({ error: 'Something went wrong' });
  }
});

// Endpoint untuk menghapus community berdasarkan ID
router.delete('/:id', async (req, res) => {
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
    console.error(error);
    res.status(500).send({ error: 'Something went wrong' });
  }
});

export default router;
