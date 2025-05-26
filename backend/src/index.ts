import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import { authenticateJWT } from './middleware/auth.middleware';
import customerRoutes from './routes/customer.routes';
import { checkRole } from './middleware/checkRole.middleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Meticuly backend running');
});

app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/api/protected', authenticateJWT, checkRole('admin'), (req, res) => {
    res.json({ message: `Hello ${req.user?.email}, you are authenticated.` });
});
