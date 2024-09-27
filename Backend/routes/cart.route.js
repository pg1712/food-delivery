import express from "express";
import {
    addToCart,
    removeFromCart,
    getCart,
} from "../controllers/cart.controller.js";
import auth from "../middleware/auth.middleware.js";
const cartRouter = express.Router();

cartRouter.post("/add", auth, addToCart);
cartRouter.post("/remove", auth, removeFromCart);
cartRouter.post("/get", auth, getCart);

export default cartRouter;
