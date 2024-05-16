import express from 'express';
import bodyParser from 'body-parser';
import wisataRoutes from './routes/wisata.js';
import champaignRoutes from './routes/champaign.js';
import communityRoutes from './routes/community.js';
import authRoutes from './routes/auth.js';

// Inisialisasi aplikasi Express
const app = express();
app.use(bodyParser.json());

// Tambahkan logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Gunakan rute dari folder routes
app.use('/wisata', wisataRoutes);
app.use('/champaign', champaignRoutes);
app.use('/community', communityRoutes);
app.use('/auth', authRoutes);

// Port aplikasi
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
