// app.js
import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.js';
import wisataRoutes from './routes/wisata.js';
import communityRoutes from './routes/community.js';
import champaignRoutes from './routes/champaign.js';
import commentRoutes from './routes/comment.js';

const app = express();
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/wisata', wisataRoutes);
app.use('/community', communityRoutes);
app.use('/champaign', champaignRoutes);
app.use('/comment', commentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
