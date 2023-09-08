import mongoose from "mongoose";

const UserOTPVerificationSchema = mongoose.Schema({
    userId: String,
    otp: String,
}, {timestamps: true})


export const UserOTPVerification = mongoose.model(
    "UserOTPVerification",
    UserOTPVerificationSchema
)

export default UserOTPVerification
