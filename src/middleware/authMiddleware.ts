import { Request, Response, NextFunction } from "express";
import { auth } from "../config/firebaseConfig";
import { HTTP_STATUS } from "../constants/httpConstants";

/**
 * Middleware to verify Firebase ID token
 */
export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: "No token provided" });
    }

    const token = header.split(" ")[1];
    const decodedToken = await auth.verifyIdToken(token);

    res.locals.uid = decodedToken.uid;
    res.locals.role = decodedToken.role || "user";

    next();
  } catch (error) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: "Invalid or expired token" });
  }
};
