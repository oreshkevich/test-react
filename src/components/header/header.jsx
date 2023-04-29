import { NavLink } from "react-router-dom";
import ShoppingIcon from "../../assets/svg/shopping-bag.svg";
import "./header.scss";
const Header = ({ quantityOfProduct }) => {
  return (
    <header className="header">
      <div className="container">
        <nav className="header__logo">
          <div className="nav-wrapper">
            <NavLink to="/" className="header__logo-brend">
              Shop
            </NavLink>
            <NavLink to="/cart" className="nav__icons-list">
              Basket
              <div className="cart-icon">
                <img className="shopping-icon" src={ShoppingIcon} alt="" />
                <span className="item-count">{quantityOfProduct}</span>
              </div>
            </NavLink>
          </div>
        </nav>
      </div>
    </header>
  );
};

export { Header };
