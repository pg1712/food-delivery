import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import { foodrouter } from "./routes/food.route.js";
import userRouter from "./routes/user.route.js";
import "dotenv/config";
import cartRouter from "./routes/cart.route.js";
import orderRouter from "./routes/order.route.js";

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/food", foodrouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// app.get("/", (req, res) => {
//     res.send("hello");
// });

app.listen(PORT, () => {
    console.log(`server stared on http://localhost:${PORT}`);
});
