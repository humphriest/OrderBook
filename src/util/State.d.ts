type IOrderBookState = {
  orderBook?: IUpdatedOrderBookWSRS;
};
declare interface IState {
  orderBookState: IOrderBookState;
}
