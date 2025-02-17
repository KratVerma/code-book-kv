import { useState, useEffect } from "react";
import { ProductCard } from "../../components";
import { FilterBar } from "./components/ProductsFilterBar";
import { useLocation } from "react-router-dom";
import { useTitle } from "../../hooks/useTitle";
import { useFilter } from "../../context";
import { getProductList } from "../../utils";
import { toast } from "react-toastify";

export function ProductList() {
  //Global State which is useFliter that holds information like filters, sortby etx
  //as soon as we get the data from API we initialised it by calling initializeProductsList()
  //Remember the task of filter reducer is to keep on changing the productsList whenever we apply filter
  //it will gonna update the entire list
  const { products, intializeProductsList } = useFilter();

  const [show, setShow] = useState(false);
  // const [products, setProducts] = useState([]);
  useTitle("Explore our eBooks Collection");

  const search = useLocation().search;
  const searchRes = new URLSearchParams(search).get("q");

  useEffect(() => {
    async function getData() {
      try {
        const resData = await getProductList(searchRes);
        // setProducts(resData);
        intializeProductsList(resData);
      } catch (error) {
        toast.error(error.message, {
          closeButton: true,
          position: "bottom-center",
          autoClose: 4000,
          closeOnClick: true,
        });
        // throw new Error("unable to fetch data ---> ", error);
      }
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchRes]);

  return (
    <main>
      <section className="my-5">
        <div className="my-5 flex justify-between">
          <span className="text-2xl font-semibold dark:text-slate-100 mb-5">
            All eBooks ({products.length})
          </span>
          <span>
            <button
              onClick={() => setShow(!show)}
              id="dropdownMenuIconButton"
              data-dropdown-toggle="dropdownDots"
              className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-700"
              type="button"
            >
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
              </svg>
            </button>
          </span>
        </div>

        <div className="flex flex-wrap justify-center lg:flex-row">
          {products.map((pd) => (
            <ProductCard key={pd.id} productDetail={pd} />
          ))}
        </div>
      </section>
      {show && <FilterBar setShow={setShow} />}
    </main>
  );
}
