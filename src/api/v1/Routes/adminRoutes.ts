// src/api/v1/routes/adminRoutes.ts

import express, { Router } from "express";
import { setCustomClaims } from "../controllers/adminController";
import authenticate from "../middleware/authenticate";
import { authorize } from "../middleware/authorize";

const router: Router = express.Router();

/**
 * All admin routes require authentication and authorization as 'admin'.
 * Middleware Order: authenticate -> authorize -> controller
 */

// POST /api/v1/admin/setCustomClaims - Requires ADMIN role
router.post(
    "/setCustomClaims",
    authenticate,
    authorize(['admin']), // Only users with the 'admin' role can execute this
    setCustomClaims
);

export default router;