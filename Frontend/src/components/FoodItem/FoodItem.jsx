import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import "./foodItem.css";
import { StoreContext } from "../../context/StoreContext";

function FoodItem({ id, name, price, description, image }) {
    const { cartItem, setCartItem, addItem, removeItem, url } =
        useContext(StoreContext);

    return (
        <div className="food-item">
            <div className="food-item-image-container">
                <img
                    src={url + "/images/" + image}
                    className="food-item-image"
                ></img>

                {!cartItem[id] ? (
                    <img
                        src={assets.add_icon_white}
                        alt="add-icon"
                        className="add"
                        onClick={() => addItem(id)}
                    />
                ) : (
                    <div className="food-item-counter">
                        <img
                            src={assets.remove_icon_red}
                            onClick={() => removeItem(id)}
                        ></img>
                        <p>{cartItem[id]} </p>
                        <img
                            src={assets.add_icon_green}
                            onClick={() => addItem(id)}
                        ></img>
                    </div>
                )}
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts}></img>
                </div>
                <div className="food-item-description">{description}</div>
                <div className="food-item-price">${price}</div>
            </div>
        </div>
    );
}

export default FoodItem;
