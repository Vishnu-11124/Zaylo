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


export { createUser }