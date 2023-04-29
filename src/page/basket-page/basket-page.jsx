import { Basket } from "../../components/basket/basket";
const BasketPage = ({ cartItems, removeItem, addItem, clearItem }) => {
  return (
    <div>
      <Basket
        cartItems={cartItems}
        removeItem={removeItem}
        addItem={addItem}
        clearItem={clearItem}
      />
    </div>
  );
};

export { BasketPage };
