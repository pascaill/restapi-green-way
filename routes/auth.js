import express from 'express';
import { auth } from '../config/firebase.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userRecord = await auth.createUser({
      email,
      password,
    });
    res.status(201).send({ uid: userRecord.uid, email: userRecord.email });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await auth.getUserByEmail(email);
    const customToken = await auth.createCustomToken(user.uid);
    res.status(200).send({ token: customToken });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

export default router;
