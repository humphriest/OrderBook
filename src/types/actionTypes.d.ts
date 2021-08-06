declare type SET_ORDER_BOOK = "SET_ORDER_BOOK";
declare type UPDATE_ORDER_BOOK = "UPDATE_ORDER_BOOK";
declare type RESET_ORDER_BOOK = "RESET_ORDER_BOOK";

declare interface ISetOrderBook {
  type: SET_ORDER_BOOK;
  payload: IUpdatedOrderBookWSRS;
}
declare interface IUpdateOrderBook {
  type: UPDATE_ORDER_BOOK;
  payload: IUpdatedOrderBookWSRS;
}
declare interface IResetOrderBook {
  type: RESET_ORDER_BOOK;
  payload: string;
}

declare type IOrderBookActions =
  | ISetOrderBook
  | IUpdateOrderBook
  | IResetOrderBook;
