import { Dispatch } from "react";
import { setOrderBook, updateOrderBook } from "./orderBookActions";
import { getOrderBook } from "./orderBookSelectors";

let ws: WebSocket;

export const openWebSocketThunk = () => {
  return (dispatch: Dispatch, getState: () => IState) => {
    const wsURL = "wss://www.cryptofacilities.com/ws/v1";
    ws = new WebSocket(wsURL);

    if (!!ws.readyState) return;

    ws.onopen = function () {
      console.log("on open");
      if (ws.readyState === 1) {
        sendEventToWebSocket("subscribe", "PI_XBTUSD");
      }
    };
    ws.onerror = function (error) {
      console.log("on error");
    };
    ws.onmessage = function (event: MessageEvent<string>) {
      console.log("on message");
      // console.log(event);

      const data: IOrderBookWSRS = JSON.parse(event.data);
      if (data.numLevels) {
        const updatedOrderBookData = calculateAndReturnTotal(data);
        debugger;
        dispatch(setOrderBook(updatedOrderBookData));
      } else {
        dispatch(updateOrderDataWithNewData(data));
      }
    };
    ws.onclose = function (error) {
      console.log("on close");
    };
  };
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
  // if (!response?.asks?.length || !response?.bids?.length)
  // return { asks: [], bids: [] };

  let total = 0;
  let newAsks: IUpdatedOrder[] = [];
  let newBids: IUpdatedOrder[] = [];
  response.asks?.forEach((ask, i) => {
    // total += total + ask[1];
    newAsks[i] = [...ask];
  });
  // console.log(newAsks);
  const asksTotal = total;

  total = 0;
  response.bids?.forEach((bid, i) => {
    // total += total + bid[1];
    newBids[i] = [...bid];
  });
  // console.log(newBids);
  const bidsTotal = total;
  return {
    ...response,
    asks: newAsks,
    bids: newBids.reverse(),
    asksTotal,
    bidsTotal,
  };
};

const updateOrderDataWithNewData = (newData: IOrderBookWSRS) => {
  return (dispatch, getState) => {
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
        else updatedOrderBook.asks[indexOfItem] = ask;
        return;
      }
      if (updatedOrderBook?.asks?.length < 25 && ask[1] !== 0) {
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
        else updatedOrderBook.bids[indexOfItem] = bid;
        return;
      }
      if (updatedOrderBook?.bids?.length < 25 && bid[1] !== 0)
        updatedOrderBook?.bids?.push(bid);
    });
    console.log(updatedOrderBook);
    dispatch(updateOrderBook(updatedOrderBook));
  };
};
