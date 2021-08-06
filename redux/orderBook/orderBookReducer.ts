import {
  RESET_ORDER_BOOK,
  SET_ORDER_BOOK,
  UPDATE_ORDER_BOOK,
} from "./orderBookActions";

const initialState: IOrderBookState = {
  orderBook: undefined,
};

export default function orderBookReducer(
  state: IOrderBookState = initialState,
  action
) {
  switch (action.type) {
    case SET_ORDER_BOOK:
    case UPDATE_ORDER_BOOK: {
      return { ...state, orderBook: action.payload };
    }
    case RESET_ORDER_BOOK: {
      return {
        ...state,
        orderBook: { asks: [], bids: [], product_id: action.payload },
      };
    }
    default:
      return state;
  }
}
