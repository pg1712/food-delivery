import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

export const StoreContext = createContext();

const StoreContextProvider = (props) => {
    const [cartItem, setCartItem] = useState({});
    const [token, setToken] = useState("");
    const url = import.meta.env.VITE_BACKEND_URL;
    const [food_list, setFoodList] = useState([]);

    const addItem = async (itemId) => {
        if (!cartItem[itemId]) {
            setCartItem((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }

        if (token) {
            await axios.post(
                url + "/api/cart/add",
                { ItemId: itemId },
                { headers: { token } }
            );
        }
    };

    // useEffect(() => {
    //     console.log(cartItem);
    // }, [cartItem]);
    const getTotalAmount = () => {
        let total = 0;
        for (const item in cartItem) {
            if (cartItem[item] > 0) {
                let info = food_list.find((product) => product._id === item);

                total += info.price * cartItem[item];
            }
        }
        return total;
    };

    const removeItem = async (itemId) => {
        setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (token) {
            await axios.post(
                url + "/api/cart/remove",
                { ItemId: itemId },
                { headers: { token } }
            );
        }
    };

    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list");
        setFoodList(response.data.data);
    };

    const loadCartData = async (token) => {
        const res = await axios.post(
            url + "/api/cart/get",
            {},
            {
                headers: { token },
            }
        );
        setCartItem(res.data.cartData);
    };

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    }, []);

    const contextValue = {
        food_list,
        cartItem,
        setCartItem,
        addItem,
        removeItem,
        getTotalAmount,
        url,
        token,
        setToken,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;

export const useStoreContext = () => {
    return useContext(StoreContext);
};
