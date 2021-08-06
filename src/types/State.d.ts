type IOrderBookState = {
  orderBook?: IUpdatedOrderBookWSRS;
  selectedGrouping: number;
  groupings: number[];
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
