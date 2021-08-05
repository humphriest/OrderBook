export const SET_ORDER_BOOK = "SET_ORDER_BOOK";
export const UPDATE_ORDER_BOOK = "UPDATE_ORDER_BOOK";

export const setOrderBook = (orderBookData: IUpdatedOrderBookWSRS) => {
  return { type: SET_ORDER_BOOK, payload: orderBookData };
};

export const updateOrderBook = (orderBookData: IUpdatedOrderBookWSRS) => {
  return { type: UPDATE_ORDER_BOOK, payload: orderBookData };
};
