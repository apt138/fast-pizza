import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      // action.payload = newItem (newObject)
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      // action.payload = pizzaId (type:number)
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    clearCart(state) {
      state.cart = [];
    },
    increaseItemQuantity(state, action) {
      // action.payload = pizzaId (type:number)
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity += 1;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      // action.payload = pizzaId (type:number)
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity -= 1;
      item.totalPrice = item.quantity * item.unitPrice;

      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
  },
});

export const {
  addItem,
  deleteItem,
  clearCart,
  increaseItemQuantity,
  decreaseItemQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getPizzasCount = (state) =>
  state.cart.cart.reduce((n, pizza) => n + pizza.quantity, 0);

export const getPizzasPrice = (state) =>
  state.cart.cart.reduce((total, pizza) => total + pizza.totalPrice, 0);

export const getCart = (state) => state.cart.cart;

export const getCurQuantityByPizzaId = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
