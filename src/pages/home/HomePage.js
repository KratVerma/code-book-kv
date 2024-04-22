import { useTitle } from "../../hooks/useTitle";
import { Faq } from "./components/FAQ";
import { FeaturedProducts } from "./components/FeaturedProducts";
import { FrontScreen } from "./components/FrontScreen";
import { Testimonials } from "./components/Testtimonials";

export function HomePage() {
  useTitle("Access Latest eBooks - CodeBook");
  return (
    <main>
      <FrontScreen />
      <FeaturedProducts />
      <Testimonials />
      <Faq />
    </main>
  );
}
