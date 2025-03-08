import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Register User'
    });

    const { fullName, email, username, password } = req.body;

    console.log("Name: ", fullName);
    console.log("Email: ", email);
    console.log("Username: ", username);
    console.log("Password: ", password);
});

export { registerUser };