import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../constants/httpConstants";

interface RoleOptions {
  roles: string[];
  allowSameUser?: boolean;
}

/**
 * Middleware for role-based authorization
 */
export const authorize = ({ roles, allowSameUser = false }: RoleOptions) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = res.locals.role;
    const uid = res.locals.uid;
    const paramId = req.params.id;

    if (allowSameUser && uid === paramId) {
      return next();
    }

    if (!roles.includes(userRole)) {
      return res.status(HTTP_STATUS.FORBIDDEN).json({ error: "Access denied" });
    }

    next();
  };
};
