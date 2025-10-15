import express, { Router } from "express";
import { getUserProfile, deleteUser } from "../../v1/controllers/userController";
import { authenticate } from "../../../middleware/authMiddleware";
import { authorize } from "../../../middleware/roleMiddleware";

const router: Router = express.Router();

/** Route to get the user's profile - requires authentication */
router.get("/profile", authenticate,  getUserProfile);

/** Route to delete a user - requires authentication and admin role */
router.delete("/:id", authenticate, authorize({ roles: ["admin"], allowSameUser: false }),  deleteUser);

export default router;