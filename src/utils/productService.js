/* eslint-disable no-throw-literal */
export async function getProductList(searchRes) {
  const response = await fetch(
    `${process.env.REACT_APP_HOST}/444/products?name_like=${
      searchRes ? searchRes : ""
    }`
  );

  if (!response.ok) {
    throw { message: response.statusText, status: response.status };
  }
  const resData = await response.json();
  return resData;
}
export async function getProduct(id) {
  const response = await fetch(
    `${process.env.REACT_APP_HOST}/444/products/${id}`
  );
  if (!response.ok) {
    throw { message: response.statusText, status: response.status };
  }
  const resData = await response.json();
  return resData;
}
export async function getFeaturedList() {
  const response = await fetch(
    `${process.env.REACT_APP_HOST}/444/featured_products`
  );
  if (!response.ok) {
    throw { message: response.statusText, status: response.status };
  }
  const resData = await response.json();
  return resData;
}
