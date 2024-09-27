import React, { useContext } from "react";
import "./loginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

export default function LoginPopup({ setshowlogin }) {
    const { url, setToken } = useContext(StoreContext);
    const [currState, setCurrentState] = React.useState("login");
    const [data, setData] = React.useState({
        name: "",
        email: "",
        password: "",
    });

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        let newurl = url;
        if (currState === "login") {
            newurl += "/api/user/login";
        } else {
            newurl += "/api/user/register";
        }

        const res = await axios.post(newurl, data);
        if (res.data.success) {
            setToken(res.data.token);
            localStorage.setItem("token", res.data.token);
            setshowlogin(false);
        } else {
            alert(res.data.message);
        }
    };

    React.useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);
    return (
        <div className="login-popup">
            <form
                action=""
                className="login-popup-container"
                onSubmit={onSubmitHandler}
            >
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img
                        src={assets.cross_icon}
                        onClick={() => {
                            setshowlogin(false);
                        }}
                        alt=""
                    />
                </div>
                <div className="login-popup-input">
                    {currState == "sign in" ? (
                        <input
                            type="text"
                            placeholder="Your name"
                            name="name"
                            onChange={onChangeHandler}
                            value={data.name}
                            required
                        />
                    ) : (
                        <></>
                    )}

                    <input
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        onChange={onChangeHandler}
                        value={data.email}
                        required
                    />
                    <input
                        type="password"
                        placeholder="enter password"
                        name="password"
                        onChange={onChangeHandler}
                        value={data.password}
                        required
                    />
                </div>
                <button type="submit">
                    {currState == "sign in" ? "Create account" : "Login"}
                </button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>by clicking this you agreed to terms and conditions</p>
                    {currState == "login" ? (
                        <p>
                            create a new account{" "}
                            <span onClick={() => setCurrentState("sign in")}>
                                Click here
                            </span>
                        </p>
                    ) : (
                        <p>
                            already have an account{" "}
                            <span onClick={() => setCurrentState("login")}>
                                Login here{" "}
                            </span>
                        </p>
                    )}
                </div>
            </form>
        </div>
    );
}
