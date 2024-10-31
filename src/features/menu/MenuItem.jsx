import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItem, getCurQuantityByPizzaId } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

export default function MenuItem({ pizza }) {
  const soldOutImgClassName = "grayscale opacity-50";
  const { id, imageUrl, ingredients, name, soldOut, unitPrice } = pizza;
  const dispatch = useDispatch();
  const curPizzaQuantity = useSelector(getCurQuantityByPizzaId(id));
  const isInCart = curPizzaQuantity > 0;

  function handleAddItemToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice,
    };

    dispatch(addItem(newItem));
  }

  return (
    <li className="list-none flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24  ${soldOut && soldOutImgClassName}`}
      />
      <div className="flex flex-col grow pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="italic text-sm text-stone-500 capitalize">
          {ingredients.join(",")}
        </p>
        <div className="mt-auto text-sm flex items-center justify-between">
          {!soldOut ? (
            <p>{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="uppercase text-stone-500 font-medium">Sold out</p>
          )}
          {isInCart && (
            <div className="flex items-center gap-3">
              <UpdateItemQuantity pizzaId={id} />
              <DeleteItem pizzaId={id} />
            </div>
          )}
          {!soldOut && !isInCart && (
            <Button type="small" onClick={handleAddItemToCart}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}
