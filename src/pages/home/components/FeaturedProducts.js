import { useEffect, useState } from "react";
import { ProductCard } from "../../../components";
import { getFeaturedList } from "../../../utils";
import { toast } from "react-toastify";

export function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function getData() {
      try {
        const resData = await getFeaturedList();
        setProducts(resData);
      } catch (error) {
        // throw new Error("unable to fetch data ---> ", error);
        toast.error(error.message, {
          closeButton: true,
          position: "bottom-center",
          autoClose: 4000,
          closeOnClick: true,
        });
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
