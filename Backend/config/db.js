import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose
        .connect(
            "mongodb+srv://dbuser:011108@cluster0.ngxkr.mongodb.net/food-del"
        )
        .then(() => console.log("database connected"));
};
