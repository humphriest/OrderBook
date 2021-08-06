export const UPDATE_ORDER_BOOK: UPDATE_ORDER_BOOK = "UPDATE_ORDER_BOOK";
export const RESET_ORDER_BOOK: RESET_ORDER_BOOK = "RESET_ORDER_BOOK";
export const SET_SELECTED_GROUPING: SET_SELECTED_GROUPING =
  "SET_SELECTED_GROUPING";
export const SET_GROUPINGS: SET_GROUPINGS = "SET_GROUPINGS";

export const updateOrderBook = (
  orderBookData: IUpdatedOrderBookWSRS
): IUpdateOrderBook => {
  return { type: UPDATE_ORDER_BOOK, payload: orderBookData };
};

export const resetOrderBook = (newProductId: string): IResetOrderBook => {
  return { type: RESET_ORDER_BOOK, payload: newProductId };
};

export const setSelectedGrouping = (
  selectedGrouping: number
): ISetSelectedGrouping => {
  return { type: SET_SELECTED_GROUPING, payload: selectedGrouping };
};
export const setGroupings = (groupings: number[]): ISetGroupings => {
  return { type: SET_GROUPINGS, payload: groupings };
};
