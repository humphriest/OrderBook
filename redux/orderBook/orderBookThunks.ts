import { Dispatch } from "react";
import { setOrderBook, updateOrderBook } from "./orderBookActions";
import { getOrderBook } from "./orderBookSelectors";
import debounce from "lodash.debounce";
let ws: WebSocket;

export const openWebSocketThunk = () => {
  return (dispatch: Dispatch) => {
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

      const data: IOrderBookWSRS = JSON.parse(event.data);
      if (data.numLevels) {
        const updatedOrderBookData = calculateAndReturnTotal(data);

        dispatch(setOrderBook(updatedOrderBookData));
      } else {
        // dispatch(updateOrderDataWithNewData(data));
      }
    };
    ws.onclose = function (error) {
      console.log("on close");
    };
  };
};

// let onWebSocketMessage = (event: MessageEvent<string>) => {
//   console.log("on message");

//   const data: IOrderBookWSRS = JSON.parse(event.data);
//   if (data.numLevels) {
//     const updatedOrderBookData = calculateAndReturnTotal(data);

//     dispatch(setOrderBook(updatedOrderBookData));
//   } else {
//     // updateOrderDataWithNewData = debounce(updateOrderDataWithNewData, 1000);
//     dispatch(updateOrderDataWithNewData(data));
//   }
// };

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

const updateOrderDataWithNewData = (newData: IOrderBookWSRS) => {
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

export const sortByGroupSelectThunk = (value: number) => {
  return (dispatch, getState) => {
    const arrs = [
      [8822, 200],
      [1234, 200],
      [1234.5, 190],
      [5555, 29],
      [7777, 32],
      [7777.5, 400],
    ];
    let newArrs = [...arrs];
    for (let i = 0; i < newArrs.length; i++) {
      const selectedValuePrice = newArrs[i][0];
      console.log(selectedValuePrice % value);

      const remainder = selectedValuePrice % value;
      if (remainder) {
        const valueWithoutRemainder = selectedValuePrice - remainder;
        console.log(valueWithoutRemainder);
        const matchedOrderBook = newArrs.find(
          (valueArrs) => valueArrs[0] === valueWithoutRemainder
        );
        if (matchedOrderBook) {
          const indexOfFound = newArrs.indexOf(matchedOrderBook);
          newArrs[indexOfFound][1] = newArrs[indexOfFound][1] + newArrs[i][1];
          newArrs.splice(i, 1);
        } else {
          newArrs[i][0] = valueWithoutRemainder;
        }
      }
    }
    console.log(newArrs);
  };
};
