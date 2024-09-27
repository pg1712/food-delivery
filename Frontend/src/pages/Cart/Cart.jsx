import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./cart.css";
import { StoreContext } from "../../context/StoreContext";
function Cart() {
    const navigate = useNavigate();
    const { cartItem, removeItem, getTotalAmount, url, food_list } =
        useContext(StoreContext);
    return (
        <div className="cart">
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>

                <br />
                <hr />
                {food_list.map((item, index) => {
                    if (cartItem[item._id] > 0) {
                        return (
                            <>
                                <div
                                    key={index}
                                    className="cart-items-title cart-items-item"
                                >
                                    <img
                                        src={url + "/images/" + item.image}
                                        alt=""
                                    />
                                    <p>{item.name}</p>
                                    <p>${item.price}</p>
                                    <p>{cartItem[item._id]}</p>
                                    <p>${cartItem[item._id] * item.price}</p>
                                    <p
                                        onClick={() => removeItem(item._id)}
                                        className="cross"
                                    >
                                        x
                                    </p>
                                </div>
                                <hr />
                            </>
                        );
                    }
                })}
            </div>
            <div className="cart-bottom">
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
                            <p>${getTotalAmount() === 0 ? 0 : 2}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Total</p>
                            <p>
                                $
                                {getTotalAmount() === 0
                                    ? 0
                                    : getTotalAmount() + 2}
                            </p>
                        </div>
                    </div>
                    <button onClick={() => navigate("/order")}>
                        Proceed to checkout
                    </button>
                </div>
                <div className="cart-promocode">
                    <div>
                        <p>if you have a promo code enter it here</p>
                        <div className="cart-promocode-input">
                            <input type="text" placeholder="promo code" />
                            <button>submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
