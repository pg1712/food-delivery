import React from "react";
import "./add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
function Add() {
    const url = "http://localhost:4000";
    const [image, setImage] = React.useState(false);
    const [data, setData] = React.useState({
        name: "",
        description: "",
        price: "",
        category: "",
    });

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData((prev) => ({ ...prev, [name]: value }));
    };
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", data.price);
        formData.append("category", data.category);
        formData.append("image", image);
        const res = await axios.post(`${url}/api/food/add`, formData);
        if (res.data.success) {
            setData({
                name: "",
                description: "",
                price: "",
                category: "",
            });
            setImage(false);
            toast.success(res.data.message);
        } else {
            toast.error(res.data.message);
        }
    };
    return (
        <div className="add">
            <form className="flex-col" onSubmit={onSubmitHandler}>
                <div className="add-img-upload flex-col">
                    <p>upload image</p>
                    <label htmlFor="image">
                        <img
                            src={
                                image
                                    ? URL.createObjectURL(image)
                                    : assets.upload_area
                            }
                            alt="Enter Correct Format"
                        />
                    </label>
                    <input
                        onChange={(e) => setImage(e.target.files[0])}
                        type="file"
                        id="image"
                        hidden
                        required
                    />
                </div>
                <div className="add-product-name flex-col">
                    <p>product name</p>
                    <input
                        onChange={onChangeHandler}
                        value={data.name}
                        type="text"
                        name="name"
                        placeholder="type here"
                        required
                    />
                </div>
                <div className="add-product-description flex-col">
                    <p>Product description</p>
                    <textarea
                        onChange={onChangeHandler}
                        value={data.description}
                        name="description"
                        rows="6"
                        placeholder="write content here"
                        required
                    ></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex col">
                        <p>Product category</p>
                        <select
                            onChange={onChangeHandler}
                            value={data.category}
                            name="category"
                        >
                            <option value="" disabled selected hidden>
                                Select an option
                            </option>
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Noodles">Noodles</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Pure Veg">Pure Veg</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>product price</p>
                        <input
                            onChange={onChangeHandler}
                            value={data.price}
                            type="Number"
                            name="price"
                            placeholder="$20"
                        />
                    </div>
                </div>
                <button type="submit" className="add-btn">
                    ADD
                </button>
            </form>
        </div>
    );
}

export default Add;
