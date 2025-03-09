import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiErrors } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: 'Register User'
    });

    const { fullName, email, username, password } = req.body; 

   if (
        [fullName, email, username, password].some((field) => field.trim() === "")
    ) {
        throw new ApiErrors(400, "All fields are required");
    }
   
    const existedUser = User.findone({ $or: [{ email }, { username }] }).then(async (user) => {
        if (existedUser) {
            throw new ApiErrors(400, "User already exists");
        }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;
    
    if (!avatarLocalPath) {
        throw new ApiErrors(400, "Avatar is required"); 
    }
    if (!coverImageLocalPath) {
        throw new ApiErrors(400, "Cover Image is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  
    if (!avatar) {
        throw new ApiErrors(500, "Error uploading file on cloudinary");
    }

    const user = await User.create({
        fullName,
        email,
        username: username.toLowerCase(),
        password,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
    }); 
    const createdUser = await user.findById(user._id).select(
        "-password -refreshToken"
    );

    if (!createdUser) {
        throw new ApiErrors(500, "Error creating user");
    }
   
    return res.status(201).json(new ApiResponse(200, createdUser, "User created successfully"));


});
});

export { registerUser };