import { useEffect, useState } from "react";
import { CheckoutItem } from "../checkout-item/checkout-item";
import { useNavigate } from "react-router-dom";
import { Modal } from "../modal/modal";
import "./basket.scss";
import Spinner from "./../spinner/spinner";

const Basket = (props) => {
  const {
    cartItems = [],
    removeItem,
    addItem,
    clearItem,
    clearItemPost,
  } = props;
  const [sumCart, setSumCart] = useState(0);
  const [isFormChange, setFormChange] = useState(false);
  const sumItem = (cart) => {
    console.log(cart);
    const sum = cart.reduce((accumulatedQuantity, cartItem) => {
      return (
        accumulatedQuantity +
        cartItem.quantity * cartItem[0].regular_price.value
      );
    }, 0);

    setSumCart(sum.toFixed(2));
  };
  const openModelFormChange = (e) => {
    setFormChange(true);
  };
  const closeModel = () => {
    setFormChange(false);
    reset();
  };
  useEffect(() => {
    sumItem(cartItems);
  }, [cartItems]);

  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [valid, setValid] = useState(true);
  const [validPhone, setValidPhone] = useState(true);
  const [Dirty, setDirty] = useState(true);
  const [firstNameDirty, setFirstNameDirty] = useState(false);
  const [phoneDirty, setPhoneDirty] = useState(false);
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const reset = () => {
    setFirstName("");
    setPhone("");
    clearItemPost();
    navigate("/");
  };
  const validateName = (val) => {
    return val.length > 3;
  };
  const validatePhone = (val) => {
    if (val.search(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\\./0-9]*$/g) !== -1) {
      return true;
    }
  };
  const validateChange = () => {
    const isValid = validateName(firstName);
    const isValidPhone = validatePhone(phone);

    if (firstNameDirty) {
      setValid(isValid);
    }
    if (phoneDirty) {
      setValidPhone(isValidPhone);
    }

    if (isValid && isValidPhone) {
      setDirty(false);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateName(firstName);
    setValid(isValid);

    const isValidPhone = validatePhone(phone);
    setValid(isValidPhone);

    if (isValid && isValidPhone) {
      setDirty(true);
      setIsLoading(true);
      fetch(
        `https://task-react-4ea21-default-rtdb.europe-west1.firebasedatabase.app/notes.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: new Date().getTime(),
            firstName: firstName,
            phone: phone,
            cartItems,
          }),
        }
      )
        .then((res) => (res.ok ? res.json() : Promise.reject(res)))
        .then((data) => {
          setData("Ok, data has been sent successfully");
          setIsLoading(false);
          openModelFormChange();
          console.log(data);
        })
        .catch((err) => {
          setIsLoading(false);
          openModelFormChange();
          setData("error");
          console.log(`error: ${err}`);
        });
    }
  };
  const focusHandler = (e) => {
    switch (e.target.name) {
      case "firstName":
        setFirstNameDirty(true);
        break;
      case "phone":
        setPhoneDirty(true);
        break;
      default:
        setFirstNameDirty(false);
        setPhoneDirty(false);
    }
  };
  useEffect(() => {
    validateChange();
  });
  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((value) => (
        <CheckoutItem
          key={value.id}
          {...value}
          removeItem={removeItem}
          addItem={addItem}
          clearItem={clearItem}
        />
      ))}
      <div className="total">TOTAL: ${sumCart}</div>
      <form className="form" method="post" noValidate onSubmit={handleSubmit}>
        <div className="form__wrapper">
          <div className="form__item">
            <label className="form__control" htmlFor="firstName">
              firstName
            </label>
            <input
              className="form__input transform"
              type="text"
              name="firstName"
              placeholder="firstName"
              value={firstName}
              onFocus={(e) => focusHandler(e)}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <p className="small">
              {valid ? null : "enter more than 3 characters"}
            </p>
          </div>
          <div className="form__item">
            <label className="form__control" htmlFor="phone">
              Phone
            </label>
            <input
              className="form__input transform"
              name="phone"
              placeholder="phone"
              id="name"
              type="tel"
              value={phone}
              onFocus={(e) => focusHandler(e)}
              onChange={(e) => setPhone(e.target.value)}
            />
            <p className="small">
              {validPhone ? null : "enter the correct number"}
            </p>
          </div>
        </div>
        <div className="form__button ">
          <button
            className={Dirty ? "button__dirty" : "button__form"}
            value="Send"
            type="submit"
            disabled={Dirty}
            name="disable_button"
            id="disable_button"
          >
            Place an order
          </button>
        </div>
        <div className="card-container"></div>
      </form>
      {isLoading && <Spinner />}
      {isFormChange && <Modal closeModel={closeModel} data={data} />}
    </div>
  );
};

export { Basket };
