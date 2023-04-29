import React from "react";

import "./checkout-item.scss";

const CheckoutItem = (props) => {
  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={require(`../../assets${props[0].image}`)} alt="item" />
      </div>
      <span className="name">{props[0].title}</span>
      <span className="quantity">
        <button
          disabled={props.quantity === 1}
          onClick={() => props.removeItem(props)}
          className="arrow"
        >
          &#10094;
        </button>
        <span className="value">{props.quantity}</span>
        <button onClick={() => props.addItem(props.id)} className="arrow">
          &#10095;
        </button>
      </span>
      <span className="price">{props[0].regular_price.value}</span>
      <button
        onClick={() => props.clearItem(props.id)}
        className="remove-button"
      >
        &#10005;
      </button>
    </div>
  );
};

export { CheckoutItem };
