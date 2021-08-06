import {
  RESET_ORDER_BOOK,
  SET_SELECTED_GROUPING,
  UPDATE_ORDER_BOOK,
  SET_GROUPINGS,
} from "./orderBookActions";

const initialState: IOrderBookState = {
  orderBook: undefined,
  selectedGrouping: 0.5,
  groupings: [0.5, 1, 2.5],
};

export const orderBookReducer = (
  state: IOrderBookState = initialState,
  action: IOrderBookActions
) => {
  switch (action.type) {
    case UPDATE_ORDER_BOOK: {
      return { ...state, orderBook: action.payload };
    }
    case RESET_ORDER_BOOK: {
      return {
        ...state,
        orderBook: { asks: [], bids: [], product_id: action.payload },
      };
    }
    case SET_SELECTED_GROUPING: {
      return {
        ...state,
        selectedGrouping: action.payload,
      };
    }
    case SET_GROUPINGS: {
      return { ...state, groupings: action.payload };
    }
    default:
      return state;
  }
};
