type IOrderBookState = {
  orderBook?: IUpdatedOrderBookWSRS;
};
declare interface IState {
  orderBookState: IOrderBookState;
}

declare type AllActions = IOrderBookActions;

declare type Dispatch = import("redux-thunk").ThunkDispatch<
  IState,
  null,
  AllActions
>;
