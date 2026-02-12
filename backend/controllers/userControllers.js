import User from "../models/userModel.js"
import asyncHandler from "../middlewares/asyncHandler.js"
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import generateToken from "../utils/createToken.js";

const createUser = asyncHandler( async (req, res) => {
    const { username, email, password } = req.body;
    // console.log(username, email, password)

    if (!username || !email || !password) {
        throw new ApiError(400, "Please provide all required fields");
    }

    const existingUser = await User.findOne({ email })

    if(existingUser) {
        throw new ApiError(400, "User already exists with this email");
    }

    const newUser = await User.create({
        username,
        email,
        password
    });

    generateToken(res, newUser._id)

    if(!newUser) {
        throw new ApiError(500, "Failed to create user");
    }

    const createdUser = await User.findById(newUser._id).select("-password")

    res.status(201).json(new ApiResponse(201, createdUser, "User created successfully"));

})

const loginUser = asyncHandler( async (req, res) => {
    const { email, password } = req.body;
    // console.log(username, email, password)

    if (!email || !password) {
        throw new ApiError(400, "Please provide all required fields");
    }

    const existingUser = await User.findOne({ email })

    if(!existingUser) {
        throw new ApiError(400, "User does not exist with this email");
    }

    const isPasswordCorrect = await existingUser.isPasswordCorrect(password)

    if(!isPasswordCorrect) {
        throw new ApiError(400, "Invalid credentials");
    }

    generateToken(res, existingUser._id)

    const loggedInUser = await User.findById(existingUser._id).select("-password")

    res.status(200).json(new ApiResponse(200, loggedInUser, "User logged in successfully"));
})

const logoutUser = asyncHandler( async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(200).json(new ApiResponse(200, null, "User logged out successfully"));
})

const getAllUsers = asyncHandler( async (req, res) => {
    const users = await User.find({}).select("-password")
    res.json(users)
})

const getUserProfile = asyncHandler( async (req, res) => {
    const user = await User.findById(req.user._id).select("-password")

    if(!user) {
        throw new ApiError(404, "User not found");
    }

    res.status(200).json(new ApiResponse(200, user, "User profile fetched successfully"));
})

export { createUser, loginUser, logoutUser, getAllUsers, getUserProfile }