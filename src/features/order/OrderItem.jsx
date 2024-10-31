import { formatCurrency } from "../../utils/helpers";

export default function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { name, quantity, totalPrice } = item;
  return (
    <li className="list-none py-3 space-y-1">
      <div className="flex items-center justify-between gap-2 text-sm">
        <p className="space-x-2">
          <span className="font-bold">{quantity}&times;</span>
          <span>{name}</span>
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      <p className="text-xs capitalize italic text-stone-500">
        {isLoadingIngredients ? "Loading ..." : ingredients.join(",")}
      </p>
    </li>
  );
}
