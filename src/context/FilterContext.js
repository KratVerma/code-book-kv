import { createContext, useContext, useReducer } from "react";
import { filterReducer } from "../reducers";

//task of the dispatch function will be to update the other factors rather than the productsList
const filterInitialState = {
  productsList: [],
  onlyInStock: false,
  onlyBestSeller: false,
  sortBy: null,
  ratings: null,
};

const FilterContext = createContext(filterInitialState);

export const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(filterReducer, filterInitialState);

  function intializeProductsList(products) {
    dispatch({
      type: "PRODUCT_LIST",
      payload: {
        products,
      },
    });
  }

  function bestSeller(prods) {
    return state.onlyBestSeller ? prods.filter((p) => p.best_seller) : prods;
  }

  function inStock(prods) {
    return state.onlyInStock ? prods.filter((p) => p.in_stock) : prods;
  }

  function rating(prods) {
    if (state.ratings === "4STARSABOVE") {
      return prods.filter((p) => p.rating >= 4);
    }
    if (state.ratings === "3STARSABOVE") {
      return prods.filter((p) => p.rating >= 3);
    }
    if (state.ratings === "2STARSABOVE") {
      return prods.filter((p) => p.rating >= 2);
    }
    if (state.ratings === "1STARSABOVE") {
      return prods.filter((p) => p.rating >= 1);
    }
    return prods;
  }

  function sortProds(prods) {
    if (state.sortBy === "lowtohigh") {
      return prods.sort((a, b) => Number(a.price) - Number(b.price));
    }
    if (state.sortBy === "hightolow") {
      return prods.sort((a, b) => Number(b.price) - Number(a.price));
    }
    return prods;
  }

  const filteredProductsList = rating(
    sortProds(inStock(bestSeller(state.productsList)))
  );

  const value = {
    state,
    dispatch,
    products: filteredProductsList,
    intializeProductsList,
  };
  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);
