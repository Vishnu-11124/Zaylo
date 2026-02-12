import express from "express"
import { createUser, getAllUsers, getUserProfile, loginUser, logoutUser } from "../controllers/userControllers.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router()

router.post('/register', createUser)

router.post('/login', loginUser)

router.get('/', authenticate, authorizeAdmin, getAllUsers)

router.get('/profile', authenticate, getUserProfile)

router.post('/logout', logoutUser)


export default router;
