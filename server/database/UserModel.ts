import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, "Missing userId"],
    },
    username: {
        type: String,
        required: [true, "Please add a username"],
    },
    email: {
        type: String,
        required: [true, "Please add a positive or negative number"],
    },
    password: {
        type: String,
        required: [true, "Password is missing"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
