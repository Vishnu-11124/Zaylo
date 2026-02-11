import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import ApiError from "../utils/ApiError.js";

const authenticate = asyncHandler( async (req, res, next) => {
    let token;

    // Reading JWt from cookie 
    token = req.cookies.jwt;

    // if(token){
    //     try {
    //         const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    //         req.user = await Uesr.findById(decoded.userId).select("-password");
    //         next()

    //     } catch (error) {
    //         throw new ApiError(401, "Not authorized, token failed");
    //     }
    // }else{
    //     throw new ApiError(401, "Not authorized, no token");
    // }

    if(!token){
        throw new ApiError(401, "Not authorized, no token");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if(!decoded){
        throw new ApiError(401, "Not authorized, token failed");
    }

    const user = await User.findById(decoded.userId).select("-password");

    if(!user){
        throw new ApiError(401, "Not authorized, user not found");
    }

    req.user = user;
    next();
})

const authorizeAdmin = (req, res, next) => {
    if(req.user && req.user.isAdmin){
        next();
    }else{
        throw new ApiError(401, "Not authorized as an admin");
    }
}

export { authenticate, authorizeAdmin }