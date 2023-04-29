import { Basket } from "../../components/basket/basket";
const BasketPage = ({
  cartItems,
  removeItem,
  addItem,
  clearItem,
  clearItemPost,
}) => {
  return (
    <div>
      <Basket
        cartItems={cartItems}
        removeItem={removeItem}
        addItem={addItem}
        clearItem={clearItem}
        clearItemPost={clearItemPost}
      />
    </div>
  );
};

export { BasketPage };
