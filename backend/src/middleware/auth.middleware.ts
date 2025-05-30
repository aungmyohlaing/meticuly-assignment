import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  email: string;
  role?: string;
  iat: number;
  exp: number;
}

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export const authenticateJWT = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
     res.status(401).json({ message: 'Authorization header missing' });
     return;
  }

  const token = authHeader.split(' ')[1]; // Expecting "Bearer TOKEN"

  if (!token) {
     res.status(401).json({ message: 'Token missing' });
     return;
  }

  try {    
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;                
        
    (req as AuthenticatedRequest).user = decoded;
    next();
  } catch (error) {
     res.status(401).json({ message: 'Invalid or expired token' });
     return;
  }
};
