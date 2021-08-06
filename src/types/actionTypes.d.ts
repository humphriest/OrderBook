declare type UPDATE_ORDER_BOOK = "UPDATE_ORDER_BOOK";
declare type RESET_ORDER_BOOK = "RESET_ORDER_BOOK";
declare type SET_SELECTED_GROUPING = "SET_SELECTED_GROUPING";
declare type SET_GROUPINGS = "SET_GROUPINGS";

declare interface IUpdateOrderBook {
  type: UPDATE_ORDER_BOOK;
  payload: IUpdatedOrderBookWSRS;
}
declare interface IResetOrderBook {
  type: RESET_ORDER_BOOK;
  payload: string;
}
declare interface ISetSelectedGrouping {
  type: SET_SELECTED_GROUPING;
  payload: number;
}
declare interface ISetGroupings {
  type: SET_GROUPINGS;
  payload: number[];
}

declare type IOrderBookActions =
  | IUpdateOrderBook
  | IResetOrderBook
  | ISetSelectedGrouping
  | ISetGroupings;
