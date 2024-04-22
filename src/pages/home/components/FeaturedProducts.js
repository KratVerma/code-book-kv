import { useEffect, useState } from "react";
import { ProductCard } from "../../../components";

export function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch("http://localhost:8000/featured_products");
        const resData = await response.json();
        setProducts(resData);
      } catch (error) {
        throw new Error("unable to fetch data ---> ", error);
      }
    }
    getData();
  }, []);
  return (
    <section className="my-20">
      <h1 className="text-2xl text-center font-semibold dark:text-slate-100 mb-5 underline underline-offset-8">
        Featured eBooks
      </h1>
      <div className="flex flex-wrap justify-center lg:flex-row">
        {products.map((prod) => (
          <ProductCard key={prod.id} productDetail={prod} />
        ))}
      </div>
    </section>
  );
}
