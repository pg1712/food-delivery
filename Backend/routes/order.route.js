import express from "express";
import {
    listOrders,
    placeOrder,
    updateStatus,
    userOrders,
    verifyOrder,
} from "../controllers/order.controller.js";
import auth from "../middleware/auth.middleware.js";
const orderRouter = express.Router();

orderRouter.post("/place", auth, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders", auth, userOrders);
orderRouter.get("/list", listOrders);
orderRouter.post("/status", updateStatus);
export default orderRouter;
