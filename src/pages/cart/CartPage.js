import { useTitle } from "../../hooks/useTitle";
import { useCart } from "../../context";
import { CartList } from "./components/CartList";
import { EmptyCart } from "./components/EmptyCart";

export function CartPage() {
  const { cartList } = useCart();
  useTitle(`Cart (${cartList.length})`);
  return <main>{cartList.length ? <CartList /> : <EmptyCart />}</main>;
}
