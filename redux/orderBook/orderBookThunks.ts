import {
  resetOrderBook,
  setError,
  setGroupings,
  setSelectedGrouping,
  updateDisplayOrderBook,
  updateOrderBook,
} from "./orderBookActions";
import { getSelectedGrouping, getOrderBook } from "./orderBookSelectors";
import throttle from "lodash.throttle";
import {
  calculateTotalAndReturn,
  filterOutAndRemoveOrders,
  sortByGroupSelect,
} from "../../src/util/sortingAndFiltering";

let ws: WebSocket;
let retryAttempts = 0;

export const openWebSocketThunk = (
  productId: string = "PI_XBTUSD",
  runStateCheck: boolean = true
) => {
  return (dispatch: Dispatch, getState: () => IState) => {
    try {
      const wsURL = "wss://www.cryptofacilities.com/ws/v1";
      ws = new WebSocket(wsURL);

      if (runStateCheck && !!ws.readyState) return;

      ws.onopen = function () {
        if (ws.readyState === 1) {
          retryAttempts = 0;
          sendEventToWebSocket("subscribe", productId);
        }
      };
      ws.onerror = function (error) {
        dispatch(
          retryWebSocketAfterFail({
            name: "Websocket error",
            message: error?.type || "type",
          })
        );
      };
      ws.onmessage = function (event: MessageEvent<string>) {
        onWebSocketMessage(event, dispatch);
      };

      ws.onclose = function (error) {
        retryAttempts = 0;
      };
    } catch (err) {
      dispatch(retryWebSocketAfterFail(err));
    }
  };
};

const retryWebSocketAfterFail = (err: Error) => {
  return (dispatch: Dispatch, getState: () => IState) => {
    try {
      ws.close();
      dispatch(setError(err));
      if (retryAttempts < 3) {
        retryAttempts++;
        const orderBook = getOrderBook(getState());
        dispatch(openWebSocketThunk(orderBook?.product_id));
      }
    } catch (err) {
      retryAttempts = 3;
      dispatch(setError(err));
    }
  };
};

const onWebSocketMessage = (
  event: MessageEvent<string>,
  dispatch: Dispatch
) => {
  const data: IOrderBookWSRS = JSON.parse(event.data);

  if (data.numLevels) {
    ws.onmessage = throttle(ws.onmessage, 1000, {
      leading: true,
      trailing: false,
    });

    const sortedOrderBook = dispatch(sortByGroupSelectThunk(data));
    dispatch(updateOrderBook(sortedOrderBook));
  } else {
    const extendedOrderBook = dispatch(updateOrderDataWithNewData(data));
    const sortedOrderBook = dispatch(sortByGroupSelectThunk(extendedOrderBook));
    dispatch(updateOrderBook(sortedOrderBook));

    const orderBookWithTotal = calculateTotalAndReturn(sortedOrderBook);
    dispatch(updateDisplayOrderBook(orderBookWithTotal));
  }
};

const sendEventToWebSocket = (event: string, productId: string) => {
  ws.send(
    JSON.stringify({
      event,
      feed: "book_ui_1",
      product_ids: [productId],
    })
  );
};

const updateOrderDataWithNewData = (newData: IOrderBookWSRS) => {
  return (dispatch: Dispatch, getState: () => IState) => {
    const orderBook = getOrderBook(getState());
    let updatedOrderBook = { ...orderBook };

    const updatedAsks = filterOutAndRemoveOrders(newData.asks, orderBook?.asks);
    const updatedBids = filterOutAndRemoveOrders(newData.bids, orderBook?.bids);

    return {
      ...updatedOrderBook,
      asks: updatedAsks,
      bids: updatedBids,
    };
  };
};

export const sortByGroupSelectThunk = (incomingOrderBook: IOrderBookWSRS) => {
  return (dispatch: Dispatch, getState: () => IState) => {
    const groupingValue = getSelectedGrouping(getState());
    const sortedAsksByValue = sortByGroupSelect(
      groupingValue,
      incomingOrderBook?.asks
    );
    const sortedBidsByValue = sortByGroupSelect(
      groupingValue,
      incomingOrderBook?.bids
    );
    const bodyToReturn = {
      ...incomingOrderBook,
      asks: sortedAsksByValue,
      bids: sortedBidsByValue,
    };
    return bodyToReturn;
  };
};

export const updateWebSocketThunk = () => {
  return async (dispatch: Dispatch, getState: () => IState) => {
    const orderBook = getOrderBook(getState());
    if (!orderBook?.product_id) return;

    const newProductId =
      orderBook?.product_id === "PI_XBTUSD" ? "PI_ETHUSD" : "PI_XBTUSD";
    sendEventToWebSocket("unsubscribe", orderBook?.product_id);
    dispatch(resetOrderBook(newProductId));

    sendEventToWebSocket("subscribe", newProductId);

    if (newProductId === "PI_XBTUSD") {
      dispatch(setGroupings([0.5, 1, 2.5]));
      dispatch(setSelectedGrouping(0.5));
    } else if (newProductId === "PI_ETHUSD") {
      dispatch(setGroupings([0.05, 0.1, 0.25]));
      dispatch(setSelectedGrouping(0.05));
    }
  };
};

export const throwWebSocketError = () => {
  return (dispatch: Dispatch, getState: () => IState) => {
    const orderBook = getOrderBook(getState());
    dispatch(openWebSocketThunk("PI_XBTUSDf", false));

    if (!!ws.readyState) ws.close();
    else if (orderBook?.product_id)
      dispatch(openWebSocketThunk(orderBook?.product_id));
  };
};

export const closeWebSocketThunk = () => {
  ws.close();
};
