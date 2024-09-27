import React from "react";
import { menu_list } from "../../assets/assets";
import "./exploremenu.css";
function ExploreMenu({ category, setCategory }) {
    return (
        <div className="explore-menu" id="explore-menu">
            <h1>explore menu</h1>
            <p className="explore-menu-text">choose from a diverse menu </p>
            <div className="explore-menu-list">
                {menu_list.map((item, index) => {
                    return (
                        <div
                            key={index}
                            onClick={() =>
                                setCategory((prev) =>
                                    prev === item.menu_name
                                        ? "All"
                                        : item.menu_name
                                )
                            }
                            className="explore-menu-list-item"
                        >
                            <img
                                src={item.menu_image}
                                alt={item.menu_name}
                                className={
                                    category === item.menu_name ? "active" : ""
                                }
                            ></img>
                            <p>{item.menu_name}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ExploreMenu;
