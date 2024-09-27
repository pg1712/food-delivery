import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./placeorder.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
function PlaceOrder() {
    const { getTotalAmount, token, food_list, cartItem, url } =
        useContext(StoreContext);
    const navigate = useNavigate();
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: "",
    });
    // useEffect(() => {
    //     console.log(data);
    // }, [data]);
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        let orderItems = [];
        food_list.map((item) => {
            if (cartItem[item._id] > 0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItem[item._id];
                orderItems.push(itemInfo);
            }
        });
        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalAmount() + 2,
        };
        const res = await axios.post(url + "/api/order/place", orderData, {
            headers: { token },
        });
        if (res.data.success) {
            const { session_url } = res.data;
            window.location.replace(session_url);
        } else {
            alert("error");
        }
    };
    useEffect(() => {
        if (!token) {
            navigate("/cart");
        } else if (getTotalAmount() === 0) {
            navigate("/cart");
        }
    }, [token]);

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData((data) => ({ ...data, [name]: value }));
    };
    return (
        <form onSubmit={onSubmitHandler} className="place-order">
            <div className="place-order-left">
                <p className="title">Delivery Information</p>
                <div className="multi-fields">
                    <input
                        type="text"
                        placeholder="First name"
                        name="firstName"
                        onChange={onChangeHandler}
                        value={data.firstName}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Last name"
                        name="lastName"
                        onChange={onChangeHandler}
                        value={data.lastName}
                        required
                    />
                </div>
                <input
                    type="email"
                    placeholder="email address"
                    name="email"
                    onChange={onChangeHandler}
                    value={data.email}
                    required
                />
                <input
                    type="text"
                    placeholder="street"
                    name="street"
                    value={data.street}
                    onChange={onChangeHandler}
                    required
                />
                <div className="multi-fields">
                    <input
                        type="text"
                        placeholder="City"
                        name="city"
                        value={data.city}
                        onChange={onChangeHandler}
                        required
                    />
                    <input
                        type="text"
                        placeholder="State"
                        name="state"
                        value={data.state}
                        onChange={onChangeHandler}
                        required
                    />
                </div>
                <div className="multi-fields">
                    <input
                        type="text"
                        placeholder="Country"
                        name="country"
                        value={data.country}
                        onChange={onChangeHandler}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Zip code"
                        name="zipcode"
                        value={data.zipcode}
                        onChange={onChangeHandler}
                        required
                    />
                </div>
                <input
                    type="text"
                    placeholder="phone number"
                    name="phone"
                    value={data.phone}
                    onChange={onChangeHandler}
                    required
                />
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>cart total</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>subtotal</p>
                            <p>${getTotalAmount()}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Delivery fee</p>
                            <p>${2}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Total</p>
                            <p>${getTotalAmount() + 2}</p>
                        </div>
                    </div>
                    <button type="submit">Proceed to Payment</button>
                </div>
            </div>
        </form>
    );
}

export default PlaceOrder;
