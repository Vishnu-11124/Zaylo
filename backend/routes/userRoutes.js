import express from "express"
import { createUser, deleteUserById, getAllUsers, getUserById, getUserProfile, loginUser, logoutUser, updateUserById, updateUserProfile } from "../controllers/userControllers.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router()

router.post('/register', createUser)

router.post('/login', loginUser)

// user routes for profile management
router
.route('/profile')
.get(authenticate, getUserProfile)
.put(authenticate, updateUserProfile)

// admin routes
router.get('/', authenticate, authorizeAdmin, getAllUsers)

// admin routes for user management
router
.route("/:id")
.delete(authenticate, authorizeAdmin, deleteUserById)
.get(authenticate, authorizeAdmin, getUserById)
.put(authenticate, authorizeAdmin, updateUserById)

router.post('/logout', logoutUser)


export default router;
