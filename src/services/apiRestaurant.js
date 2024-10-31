const API_URL = "https://react-fast-pizza-api.onrender.com/api";

export async function getMenu() {
  const resp = await fetch(`${API_URL}/menu`);

  // fetch won't throw error on 400 errors (e.g. when URL is wrong),
  //    so we need to do it manually. This will then go into the catch block,
  //  where the message is set
  if (!resp.ok) throw new Error("Failed getting menu");
  const { data } = await resp.json();
  return data;
}

export async function getOrder(id) {
  const resp = await fetch(`${API_URL}/order/${id}`);
  if (!resp.ok) throw new Error(`Couldn't find order by that id. #${id}`);
  const { data } = await resp.json();
  return data;
}

export async function createOrder(newOrder) {
  try {
    const resp = await fetch(`${API_URL}/order`, {
      method: "POST",
      body: JSON.stringify(newOrder),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!resp.ok) throw new Error();
    const { data } = await resp.json();
    return data;
  } catch (err) {
    throw new Error("Failed to create new order");
  }
}

export async function updateOrder(id, updateObj) {
  try {
    const res = await fetch(`${API_URL}/order/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updateObj),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();
    // We don't need the data, so we don't return anything
  } catch (err) {
    throw Error("Failed updating your order");
  }
}
