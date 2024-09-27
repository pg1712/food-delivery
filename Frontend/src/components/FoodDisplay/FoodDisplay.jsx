import React, { useContext } from "react";
import "./foodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

function FoodDisplay({ category }) {
    const { food_list } = useContext(StoreContext);
    return (
        <div className="food-display">
            <h2>Top dishes near you</h2>
            <div className="food-display-list">
                {food_list.map((item, index) => {
                    if (category === item.category || category === "All") {
                        return (
                            <FoodItem
                                key={index}
                                name={item.name}
                                id={item._id}
                                description={item.description}
                                category={item.category}
                                price={item.price}
                                image={item.image}
                            />
                        );
                    }
                })}
            </div>
        </div>
    );
}

export default FoodDisplay;
