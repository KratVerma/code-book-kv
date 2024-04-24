/* eslint-disable no-throw-literal */
function getSessionData() {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const cbid = JSON.parse(sessionStorage.getItem("cbid"));
  return { token, cbid };
}

export async function getUser() {
  const { token, cbid } = getSessionData();
  const reqOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(
    `${process.env.REACT_APP_HOST}/600/users/${cbid}`,
    reqOptions
  );
  if (!response.ok) {
    throw { message: response.statusText, status: response.status };
  }
  const resData = await response.json();
  return resData;
}

export async function getUserOrders() {
  const { token, cbid } = getSessionData();
  const reqOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(
    `${process.env.REACT_APP_HOST}/660/orders?user.id=${cbid}`,
    reqOptions
  );
  if (!response.ok) {
    throw { message: response.statusText, status: response.status };
  }
  const resData = await response.json();
  return resData;
}

export async function createOrder(cartList, total, paymentId, user) {
  const { token } = getSessionData();
  const order = {
    cartList,
    amount_paid: total,
    quantity: cartList.length,
    paymentId,
    user: {
      name: user.name,
      email: user.email,
      id: user.id,
    },
  };
  const reqOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(order),
  };
  const response = await fetch(
    `${process.env.REACT_APP_HOST}/660/orders/`,
    reqOptions
  );
  if (!response.ok) {
    throw { message: response.statusText, status: response.status };
  }
  const data = await response.json();
  return data;
}
