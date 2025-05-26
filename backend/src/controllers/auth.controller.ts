// src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models';

export const loginAdmin = async(req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    res.status(401).json({ message: 'Invalid email or password' });
    return;
  }  

  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
     res.status(401).json({ message: 'Invalid email or password' });
     return;
  }

  const token = jwt.sign({ email, role: user.role }, process.env.JWT_SECRET as string, {
    expiresIn: '2h',
  });

  res.json({ token });
};
