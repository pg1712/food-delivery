import Food from "../models/food.model.js";
import fs from "fs";
import multer from "multer";

const addFood = async (req, res) => {
    const image_filename = `${req.file.filename}`;
    const food = new Food({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename,
    });
    try {
        await food.save();
        res.json({ success: true, message: "food added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error" });
    }
};

const listfood = async (req, res) => {
    try {
        const food = await Food.find({});
        res.json({ success: true, data: food });
    } catch (error) {
        console.log({ error });
        res.json({ success: false, message: "can't find food" });
    }
};

const deletefood = async (req, res) => {
    try {
        const food = await Food.findById(req.body.id);
        if (food) {
            fs.unlink(`uploads/${food.image}`, () => {});
        }
        await Food.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "successfully removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "failed" });
    }
};
export { addFood, listfood, deletefood };
