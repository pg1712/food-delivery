import express from "express";
import {
    addFood,
    deletefood,
    listfood,
} from "../controllers/food.controller.js";
import multer from "multer";
const foodrouter = express.Router();

const Storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    },
});
const upload = multer({ storage: Storage });

foodrouter.route("/add").post(upload.single("image"), addFood);
foodrouter.route("/list").get(listfood);
foodrouter.route("/delete").post(deletefood);

export { foodrouter };
