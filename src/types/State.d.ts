type IOrderBookState = {
  orderBook?: IOrderBookWSRS;
  selectedGrouping: number;
  groupings: number[];
  displayOrderBook?: IUpdatedOrderBookWSRS;
};
declare interface IState {
  orderStateReducer: IOrderBookState;
}

declare type AllActions = IOrderBookActions;

declare type Dispatch = import("redux-thunk").ThunkDispatch<
  IState,
  null,
  AllActions
>;
