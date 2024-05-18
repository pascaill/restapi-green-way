// routes/auth.js
import express from 'express';
import { clientAuth } from '../config/firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userCredential = await createUserWithEmailAndPassword(clientAuth, email, password);
    const user = userCredential.user;
    const token = await user.getIdToken();
    res.status(201).send({ email: user.email, token });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userCredential = await signInWithEmailAndPassword(clientAuth, email, password);
    const user = userCredential.user;
    const token = await user.getIdToken();
    res.status(200).send({ email: user.email, token });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

export default router;
