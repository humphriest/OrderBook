import {
  resetOrderBook,
  setOrderBook,
  updateOrderBook,
} from "./orderBookActions";
import { getOrderBook } from "./orderBookSelectors";
import debounce from "lodash.debounce";
let ws: WebSocket;

export const openWebSocketThunk = (productId: string) => {
  return (dispatch: Dispatch, getState: () => IState) => {
    const wsURL = "wss://www.cryptofacilities.com/ws/v1";
    ws = new WebSocket(wsURL);
    if (!!ws.readyState) return;

    ws.onopen = function () {
      console.log("on open");
      if (ws.readyState === 1) {
        sendEventToWebSocket("subscribe", productId);
      }
    };
    ws.onerror = function (error) {
      console.log("on error");
      console.log(error);
    };
    ws.onmessage = function (event: MessageEvent<string>) {
      console.log("onMessage");
      onWebSocketMessage(event, dispatch);
    };
    ws.onclose = function (error) {
      console.log("on close");
    };
  };
};

let onWebSocketMessage = (event: MessageEvent<string>, dispatch: Dispatch) => {
  const data: IOrderBookWSRS = JSON.parse(event.data);
  console.log("onWebSocketMessage data");
  console.log(data);
  if (data.numLevels) {
    onWebSocketMessage = debounce(onWebSocketMessage, 170, {
      leading: true,
      trailing: false,
    });
    const updatedOrderBookData = calculateAndReturnTotal(data);

    dispatch(setOrderBook(updatedOrderBookData));
  } else {
    dispatch(updateOrderDataWithNewData(data));
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

const calculateAndReturnTotal = (
  response: IOrderBookWSRS
): IUpdatedOrderBookWSRS => {
  let total = 0;
  let newAsks: IUpdatedOrder[] = [];
  let newBids: IUpdatedOrder[] = [];
  response.asks?.forEach((ask, i) => {
    newAsks[i] = [...ask];
  });
  const asksTotal = total;

  total = 0;
  response.bids?.forEach((bid, i) => {
    newBids[i] = [...bid];
  });
  const bidsTotal = total;
  return {
    ...response,
    asks: newAsks,
    bids: newBids.reverse(),
    asksTotal,
    bidsTotal,
  };
};

let updateOrderDataWithNewData = (newData: IOrderBookWSRS) => {
  return (dispatch: Dispatch, getState: () => IState) => {
    const orderBook: IUpdatedOrderBookWSRS = getOrderBook(getState());
    let updatedOrderBook = { ...orderBook };

    // total isn't updated
    newData.asks?.forEach((ask) => {
      const item = updatedOrderBook.asks?.find(
        (previousAsk) => previousAsk[0] === ask[0]
      );

      if (!!item) {
        const indexOfItem = updatedOrderBook.asks?.indexOf(item);
        if (!indexOfItem) return;

        if (ask?.[1] === 0)
          indexOfItem && updatedOrderBook.asks?.splice(indexOfItem, 1);
        else if (updatedOrderBook.asks)
          updatedOrderBook.asks[indexOfItem] = ask;
        return;
      }

      if (
        updatedOrderBook?.asks &&
        updatedOrderBook?.asks?.length < 25 &&
        ask[1] !== 0
      ) {
        updatedOrderBook?.asks?.push(ask);
      }
    });

    newData.bids?.forEach((bid, i) => {
      const item = updatedOrderBook.bids?.find(
        (previousBid) => previousBid[0] === bid[0]
      );

      if (!!item) {
        const indexOfItem = updatedOrderBook.bids?.indexOf(item);
        if (!indexOfItem) return;

        if (bid?.[1] === 0)
          indexOfItem && updatedOrderBook.bids?.splice(indexOfItem, 1);
        else if (updatedOrderBook.bids)
          updatedOrderBook.bids[indexOfItem] = bid;
        return;
      }
      if (
        updatedOrderBook?.bids &&
        updatedOrderBook?.bids?.length < 25 &&
        bid[1] !== 0
      )
        updatedOrderBook?.bids?.push(bid);
    });
    console.log(updatedOrderBook);
    dispatch(updateOrderBook(updatedOrderBook));
  };
};

export const sortByGroupSelectThunk = (value: number) => {
  return (dispatch: Dispatch, getState: () => IState) => {
    const orderBook: IUpdatedOrderBookWSRS = getOrderBook(getState());
    const sortedAsksByValue = sortByGroupSelect(value, orderBook?.asks);
    const sortedBidsByValue = sortByGroupSelect(value, orderBook?.bids);
    const bodyToReturn = {
      ...orderBook,
      asks: sortedAsksByValue,
      bids: sortedBidsByValue,
    };
    console.log(bodyToReturn);
    dispatch(updateOrderBook(bodyToReturn));
  };
};
const sortByGroupSelect = (value: number, orders: IOrder[] = []): IOrder[] => {
  let updatedOrderBook = [...orders];
  for (let i = 0; i < updatedOrderBook.length; i++) {
    const selectedValuePrice = updatedOrderBook[i][0];
    console.log(selectedValuePrice % value);

    const remainder = selectedValuePrice % value;
    if (remainder) {
      const valueWithoutRemainder = selectedValuePrice - remainder;
      console.log(valueWithoutRemainder);
      const matchedOrderBook = updatedOrderBook.find(
        (valueArrs) => valueArrs[0] === valueWithoutRemainder
      );
      if (matchedOrderBook) {
        const indexOfFound = updatedOrderBook.indexOf(matchedOrderBook);
        updatedOrderBook[indexOfFound][1] =
          updatedOrderBook[indexOfFound][1] + updatedOrderBook[i][1];
        updatedOrderBook.splice(i, 1);
      } else {
        updatedOrderBook[i][0] = valueWithoutRemainder;
      }
    }
  }
  return updatedOrderBook;
};

export const updateWebSocketThunk = () => {
  return async (dispatch: Dispatch, getState: () => IState) => {
    const orderBook: IUpdatedOrderBookWSRS = getOrderBook(getState());
    const newProductId =
      orderBook.product_id === "PI_XBTUSD" ? "PI_ETHUSD" : "PI_XBTUSD";
    sendEventToWebSocket("unsubscribe", orderBook.product_id);
    dispatch(resetOrderBook(newProductId));

    setTimeout(() => {
      sendEventToWebSocket("subscribe", newProductId);
    }, 500);
  };
};

export const throwWebSocketError = () => {
  ws.send(JSON.stringify("throw and error"));
};
