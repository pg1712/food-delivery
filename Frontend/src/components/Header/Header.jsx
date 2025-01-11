import React from "react";
import "./header.css";

export default function Header() {
    return (
        <div className="header">
            <div className="header-contents">
                <h2>order your food here</h2>
                <p>choose from a diverse menu</p>
                <a href="#explore-menu">
                <button>View Menu</button>
                    </a>
            </div>
        </div>
    );
}
