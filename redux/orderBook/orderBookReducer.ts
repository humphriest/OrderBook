import {
  RESET_ORDER_BOOK,
  SET_SELECTED_GROUPING,
  UPDATE_ORDER_BOOK,
  SET_GROUPINGS,
  UPDATE_DISPLAY_ORDER_BOOK,
} from "./orderBookActions";

const initialState: IOrderBookState = {
  orderBook: undefined,
  selectedGrouping: 0.5,
  groupings: [0.5, 1, 2.5],
  displayOrderBook: undefined,
};

export const orderBookReducer = (
  state: IOrderBookState = initialState,
  action: IOrderBookActions
) => {
  switch (action.type) {
    case UPDATE_ORDER_BOOK:
      return { ...state, orderBook: action.payload };
    case RESET_ORDER_BOOK:
      return {
        ...state,
        orderBook: { asks: [], bids: [], product_id: action.payload },
      };
    case SET_SELECTED_GROUPING:
      return {
        ...state,
        selectedGrouping: action.payload,
      };
    case SET_GROUPINGS:
      return { ...state, groupings: action.payload };
    case UPDATE_DISPLAY_ORDER_BOOK:
      return { ...state, displayOrderBook: action.payload };
    default:
      return state;
  }
};
