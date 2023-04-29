import { ICard } from "../../interface/ICard";
import "./card.scss";
import { CustomButton } from "../custom-button/custom-button";

const Card = (props) => {
  return (
    <div className="card__item collection-item">
      <div className="card__element">
        <img
          className="card__img"
          src={require(`../../assets${props.image}`)}
          alt={props.title}
        />
      </div>
      <CustomButton onClick={() => props.addToOrder(props.id)}>
        Add to cart
      </CustomButton>
      <div className="card__description">
        <h2 className="card__title">{props.title}</h2>
        <p className="card__text">
          <span className="card__text-span">
            {props.regular_price.currency}:
          </span>
          <span>{props.regular_price.value}</span>
        </p>
      </div>
    </div>
  );
};

export { Card };
