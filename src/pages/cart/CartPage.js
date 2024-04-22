import { useCart } from "../../context";
import { CartList } from "./components/CartList";
import { EmptyCart } from "./components/EmptyCart";

export function CartPage() {
  const { cartList } = useCart();
  return <main>{cartList.length ? <CartList /> : <EmptyCart />}</main>;
}
