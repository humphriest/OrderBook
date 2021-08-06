export const getOrderBook = (state: IState) =>
  state.orderStateReducer.orderBook;

export const getGroupSelect = (state: IState) =>
  state.orderStateReducer.selectedGrouping;

export const getGroupings = (state: IState) =>
  state.orderStateReducer.groupings;
