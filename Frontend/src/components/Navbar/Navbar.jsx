import React, { Profiler, useContext } from "react";
import { assets } from "../../assets/assets";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

function Navbar({ setshowlogin }) {
    const [menu, setMenu] = React.useState("home");

    const { token, setToken } = useContext(StoreContext);
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
    };
    return (
        <div className="navbar">
            <Link to="/">
                <img src={assets.logo} alt="" className="logo" />
            </Link>
            <ul className="navbar-menu">
                <Link
                    to="/"
                    onClick={() => setMenu("home")}
                    className={menu === "home" ? "active" : ""}
                >
                    home
                </Link>
                <a
                    href="#explore-menu"
                    onClick={() => setMenu("menu")}
                    className={menu === "menu" ? "active" : ""}
                >
                    menu
                </a>
                <a
                    href="#app-download"
                    onClick={() => setMenu("app")}
                    className={menu === "app" ? "active" : ""}
                >
                    moblie-app
                </a>
                <a
                    href="#footer"
                    onClick={() => setMenu("contact")}
                    className={menu === "contact" ? "active" : ""}
                >
                    contact us
                </a>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} alt="search_icon" />
                <div className="navbar-search-icon">
                    <Link to="/cart">
                        <img src={assets.basket_icon} alt="basket_icon" />
                    </Link>
                    <div className="dot"></div>
                </div>
                {!token ? (
                    <button
                        onClick={() => {
                            setshowlogin(true);
                        }}
                    >
                        sign in
                    </button>
                ) : (
                    <div className="navbar-profile">
                        <img src={assets.profile_icon} alt="" />
                        <ul className="nav-profile-dropdown">
                            <li onClick={() => navigate("/myorders")}>
                                <img src={assets.bag_icon} alt="" />
                                <p>Orders</p>
                            </li>
                            <hr />
                            <li onClick={logout}>
                                <img src={assets.logout_icon} alt="" />
                                <p>Logout</p>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;
