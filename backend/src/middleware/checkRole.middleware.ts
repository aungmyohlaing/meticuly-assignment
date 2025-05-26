import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth.middleware';

export function checkRole(requiredRole: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as AuthenticatedRequest).user;        

    if (!user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    if (user.role !== requiredRole) {
      res.status(403).json({ message: 'Forbidden: Insufficient role' });
      return;
    }

    next();
  };
}