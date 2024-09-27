import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            require: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        cartData: {
            type: Object,
            default: {},
        },
    },
    { minimize: false, timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
