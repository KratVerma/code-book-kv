export function filterReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "PRODUCT_LIST":
      return { productsList: payload.products };
    case "SORT_BY":
      return { ...state, sortBy: payload.sortBy };
    case "RATINGS":
      return { ...state, ratings: payload.ratings };
    case "BEST_SELLER_ONLY":
      return { ...state, onlyBestSeller: payload.onlyBestSeller };
    case "ONLY_IN_STOCK":
      return { ...state, onlyInStock: payload.onlyInStock };
    case "CLEAR_FILTER":
      return {
        ...state,
        onlyInStock: false,
        onlyBestSeller: false,
        sortBy: null,
        ratings: null,
      };
    default:
      throw new Error("No case found for Filter");
  }
}
