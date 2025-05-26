import express from 'express';
import { addCustomer, deleteCustomer, getCustomers } from '../controllers/customer.controller';
import { authenticateJWT } from '../middleware/auth.middleware';
import { checkRole } from '../middleware/checkRole.middleware';

const router = express.Router();

// Protect route with JWT middleware
router.post('/', authenticateJWT, checkRole('admin'), addCustomer);
router.get('/', authenticateJWT, getCustomers);
router.delete('/:id', authenticateJWT, checkRole('admin'), deleteCustomer);

export default router;
