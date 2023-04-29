import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./components/header/header";
import { CardPage } from "./page/card-page/card-page";
import { BasketPage } from "./page/basket-page/basket-page";
import cards from "./db/products.json";

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToOrder = (item, quantity = 1) => {
    const itemIndex = cartItems.findIndex((value) => value.id === item);
    if (itemIndex < 0) {
      const cardsFilter = cards.filter((value) => value.id === item);
      const newItem = {
        ...cardsFilter,
        id: item,
        quantity: quantity,
      };
      setCartItems([...cartItems, newItem]);
    } else {
      const newItem = {
        ...cartItems[itemIndex],
        quantity: cartItems[itemIndex].quantity + quantity,
      };
      const newCart = cartItems.slice();
      newCart.splice(itemIndex, 1, newItem);
      setCartItems(newCart);
    }
  };

  const quantityOfProduct = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const removeItem = (cart) => {
    const cartFilterItem = cartItems.map((cartItem) => {
      if (cartItem.id === cart.id && cart.quantity > 1) {
        return { ...cartItem, quantity: cartItem.quantity - 1 };
      } else {
        return cartItem;
      }
    });

    setCartItems(cartFilterItem);
  };
  const addItem = (cart) => {
    const cartFilterItem = cartItems.map((cartItem) =>
      cartItem.id === cart
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
    setCartItems(cartFilterItem);
  };

  const clearItem = (cart) => {
    const cartFilterItem = cartItems.filter((cartItem) => cartItem.id !== cart);
    setCartItems(cartFilterItem);
  };
  const clearItemPost = () => {
    const cartFilterItem = [];
    setCartItems(cartFilterItem);
  };

  return (
    <>
      <BrowserRouter basename="/">
        <Header quantityOfProduct={quantityOfProduct} />
        <main className="container">
          <Routes>
            <Route path="/" element={<CardPage addToOrder={addToOrder} />} />
            <Route
              path="/cart"
              element={
                <BasketPage
                  cartItems={cartItems}
                  removeItem={removeItem}
                  addItem={addItem}
                  clearItem={clearItem}
                  clearItemPost={clearItemPost}
                />
              }
            />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}
export default App;
