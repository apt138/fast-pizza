import { useState } from "react";
import { Form, redirect, useNavigation, useActionData } from "react-router-dom";
import { useSelector } from "react-redux";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { clearCart, getCart, getPizzasPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

export default function CreateOrder() {
  const username = useSelector((state) => state.user.username);
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getPizzasPrice);
  const navigation = useNavigation();
  const formErrors = useActionData();
  const [withPriority, setWithPriority] = useState(false);
  const isSubmitting = navigation.state === "submitting";
  const priorityPrice = withPriority ? Math.round(totalCartPrice * 0.2) : 0;

  if (!cart.length > 0) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="font-semibold text-xl mb-8">Ready to order? Let's go!</h2>
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label htmlFor="customer" className="sm:basis-40">
            First Name
          </label>
          <input
            type="text"
            name="customer"
            id="customer"
            required
            className="input"
            defaultValue={username}
          />
        </div>

        <div
          className={
            `${formErrors?.phone ? "" : "mb-5"} ` +
            "flex flex-col gap-2 sm:flex-row sm:items-center"
          }
        >
          <label htmlFor="phone" className="sm:basis-40">
            Phone
          </label>

          <input
            type="tel"
            name="phone"
            id="phone"
            required
            className="input"
          />
        </div>
        {formErrors?.phone && (
          <div className="flex justify-end">
            <p className="text-sm text-right mb-5 text-red-700 mt-1 bg-red-100 rounded-full p-2 inline-block">
              {formErrors.phone}
            </p>
          </div>
        )}

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label htmlFor="address" className="sm:basis-40">
            Address
          </label>
          <input
            type="text"
            name="address"
            id="address"
            required
            className="input"
          />
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority((p) => !p)}
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
          />
          <label htmlFor="priority" className="font-semibold">
            Want to give your order priority?
          </label>
        </div>
        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button disabled={isSubmitting} type="primary">
            {isSubmitting
              ? "Placing order..."
              : `Order now ${formatCurrency(totalCartPrice + priorityPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  // console.log(data);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };
  // console.log(order);

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = "Please gives us your correct phone number.";

  if (Object.keys(errors).length > 0) return errors;
  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}
