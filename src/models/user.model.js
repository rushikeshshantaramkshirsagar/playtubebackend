import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        username:{
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },
        email:{
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullName:{
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        avatar:{
            type: String, // cloudinary url
            required: true,
        },
        coverImage:{
            type: String, // cloudinary url
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video",
            },
        ],
        password:{
            type: String,
            required: [true, "Password is required"],
        },
        refreshToken:{
            type: String
        }
    },
    { 
        timestamps: true  
    }
)
  
userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    }catch(err){
        return next(err);
    }
})

userSchema.method.isPasswordCorrect = async function(password)
{
    return await bcrypt.compare(password, this.password);
}
  
userSchema.method.generateAccessToken = function(){
    return jwt.sign(
        {
            id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName,

        },
        process.env.JWT_SECRET, 
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        });
}

userSchema.method.generateRefreshToken = function(){
    return jwt.sign(
        {
           id: this._id
        }, 
        process.env.JWT_SECRET, 
        {
            expiresIn: PROCESS.ENV.REFRESH_TOKEN_EXPIRY,
        });
}
export default mongoose.model("User", userSchema) 