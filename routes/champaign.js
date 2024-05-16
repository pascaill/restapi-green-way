import express from 'express';
import { db } from '../config/firebase.js';

const router = express.Router();

// Endpoint untuk mendapatkan semua champaigns
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('champaigns').get();
    const champaignList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).send(champaignList);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Something went wrong' });
  }
});

// Endpoint untuk mendapatkan champaign berdasarkan ID
router.get('/:id', async (req, res) => {
  const champaignId = req.params.id;
  try {
    const doc = await db.collection('champaigns').doc(champaignId).get();
    if (!doc.exists) {
      res.status(404).send({ error: 'Champaign not found' });
    } else {
      res.status(200).send({ id: doc.id, ...doc.data() });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Something went wrong' });
  }
});

// Endpoint untuk menambahkan champaign baru
router.post('/', async (req, res) => {
  const newChampaign = req.body;
  try {
    const docRef = await db.collection('champaigns').add(newChampaign);
    res.status(201).send({ id: docRef.id, ...newChampaign });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Something went wrong' });
  }
});

// Endpoint untuk memperbarui champaign berdasarkan ID
router.put('/:id', async (req, res) => {
  const champaignId = req.params.id;
  const updatedChampaign = req.body;
  try {
    const docRef = db.collection('champaigns').doc(champaignId);
    const doc = await docRef.get();
    if (!doc.exists) {
      res.status(404).send({ error: 'Champaign not found' });
    } else {
      await docRef.update(updatedChampaign);
      res.status(200).send({ id: champaignId, ...updatedChampaign });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Something went wrong' });
  }
});

// Endpoint untuk menghapus champaign berdasarkan ID
router.delete('/:id', async (req, res) => {
  const champaignId = req.params.id;
  try {
    const docRef = db.collection('champaigns').doc(champaignId);
    const doc = await docRef.get();
    if (!doc.exists) {
      res.status(404).send({ error: 'Champaign not found' });
    } else {
      await docRef.delete();
      res.status(200).send({ message: 'Champaign deleted' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Something went wrong' });
  }
});

export default router;
