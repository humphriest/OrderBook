export const getOrderBook = (state: IState) =>
  state.orderStateReducer.orderBook;

export const getSelectedGrouping = (state: IState) =>
  state.orderStateReducer.selectedGrouping;

export const getGroupings = (state: IState) =>
  state.orderStateReducer.groupings;

export const getDisplayOrderBook = (state: IState) =>
  state.orderStateReducer.displayOrderBook;

export const getError = (state: IState) => state.orderStateReducer.error;
