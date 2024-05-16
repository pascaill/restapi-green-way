import express from 'express';
import { db } from '../config/firebase.js'; // Pastikan path ini benar

const router = express.Router();

// Endpoint untuk mendapatkan semua wisata
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('wisata').get();
    const wisataList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).send(wisataList);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Something went wrong' });
  }
});

// Endpoint untuk mendapatkan wisata berdasarkan ID
router.get('/:id', async (req, res) => {
  const wisataId = req.params.id;
  try {
    const doc = await db.collection('wisata').doc(wisataId).get();
    if (!doc.exists) {
      res.status(404).send({ error: 'Wisata not found' });
    } else {
      res.status(200).send({ id: doc.id, ...doc.data() });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Something went wrong' });
  }
});

// Endpoint untuk menambahkan wisata baru
router.post('/', async (req, res) => {
  const newWisata = req.body;
  try {
    const docRef = await db.collection('wisata').add(newWisata);
    res.status(201).send({ id: docRef.id, ...newWisata });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Something went wrong' });
  }
});

// Endpoint untuk memperbarui wisata berdasarkan ID
router.put('/:id', async (req, res) => {
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
    console.error(error);
    res.status(500).send({ error: 'Something went wrong' });
  }
});

// Endpoint untuk menghapus wisata berdasarkan ID
router.delete('/:id', async (req, res) => {
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
    console.error(error);
    res.status(500).send({ error: 'Something went wrong' });
  }
});

export default router;
