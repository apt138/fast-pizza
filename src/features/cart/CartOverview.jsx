import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/helpers";
import { getPizzasCount, getPizzasPrice } from "./cartSlice";

export default function CartOverview() {
  const totalPizzas = useSelector(getPizzasCount);
  const totalPizzasPrice = useSelector(getPizzasPrice);

  if (!totalPizzas) return null;
  return (
    <div className="flex items-center justify-between bg-stone-800 text-stone-200 px-4 py-4 uppercase text-sm md:text-base sm:px-6">
      <p className="text-stone-300 uppercase font-semibold space-x-4 sm:space-x-6">
        <span>{totalPizzas} Pizzas</span>
        <span>{formatCurrency(totalPizzasPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}
