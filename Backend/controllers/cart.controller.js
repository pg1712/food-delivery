import User from "../models/user.model.js";

const addToCart = async (req, res) => {
    try {
        let userData = await User.findById(req.body.UserId);
        let cartdata = await userData.cartData;
        if (!cartdata[req.body.ItemId]) {
            cartdata[req.body.ItemId] = 1;
        } else {
            cartdata[req.body.ItemId] += 1;
        }
        await User.findByIdAndUpdate(req.body.UserId, { cartData: cartdata });
        res.json({ success: true, message: "Added to Cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

const removeFromCart = async (req, res) => {
    try {
        let userData = await User.findById(req.body.UserId);
        let cartdata = await userData.cartData;
        if (cartdata[req.body.ItemId] > 0) {
            cartdata[req.body.ItemId] -= 1;
        }
        await User.findByIdAndUpdate(req.body.UserId, { cartData: cartdata });
        res.json({ success: true, message: "Removed from Cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

const getCart = async (req, res) => {
    try {
        let userData = await User.findById(req.body.UserId);
        let cartdata = await userData.cartData;
        res.json({ success: true, cartData: cartdata });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export { addToCart, removeFromCart, getCart };
