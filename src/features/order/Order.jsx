import { useEffect } from "react";
import { useLoaderData, useFetcher } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calMintuesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "./OrderItem";
import MakeOrderPriority from "./MakeOrderPriority";

export default function Order() {
  const order = useLoaderData();
  const fetcher = useFetcher();
  const {
    id,
    priority,
    priorityPrice,
    status,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;

  const deliveryIn = calMintuesLeft(estimatedDelivery);

  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === "idle") fetcher.load("/menu");
    },
    [fetcher]
  );

  return (
    <div className="px-4 py-6 space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-semibold text-xl">Order #{id} status</h2>
        <div className="space-x-2">
          {priority && (
            <span className="bg-red-500 py-1 px-3 text-red-50 rounded-full text-sm uppercase font-semibold tracking-wider">
              Priority
            </span>
          )}
          <span className="bg-green-500 py-1 px-3 text-green-50 rounded-full text-sm uppercase font-semibold tracking-wider">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 py-5 px-6 ">
        <p className="font-medium">
          {deliveryIn > 0
            ? `Only ${deliveryIn} mintues left 😀`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated Delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            isLoadingIngredients={fetcher.state === "loading"}
            ingredients={
              fetcher?.data?.find((pizza) => pizza.id === item.pizzaId)
                ?.ingredients ?? []
            }
          />
        ))}
      </ul>

      <div className="bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">
          Price Pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Price Priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
      {!priority && <MakeOrderPriority />}
    </div>
  );
}

export async function loader({ params }) {
  return await getOrder(params.orderId);
}
