export const SET_ORDER_BOOK: SET_ORDER_BOOK = "SET_ORDER_BOOK";
export const UPDATE_ORDER_BOOK: UPDATE_ORDER_BOOK = "UPDATE_ORDER_BOOK";
export const RESET_ORDER_BOOK: RESET_ORDER_BOOK = "RESET_ORDER_BOOK";

export const setOrderBook = (
  orderBookData: IUpdatedOrderBookWSRS
): ISetOrderBook => {
  return { type: SET_ORDER_BOOK, payload: orderBookData };
};

export const updateOrderBook = (
  orderBookData: IUpdatedOrderBookWSRS
): IUpdateOrderBook => {
  return { type: UPDATE_ORDER_BOOK, payload: orderBookData };
};

export const resetOrderBook = (newProductId: string): IResetOrderBook => {
  return { type: RESET_ORDER_BOOK, payload: newProductId };
};
