import {
  resetOrderBook,
  setGroupings,
  setSelectedGrouping,
  updateOrderBook,
} from "./orderBookActions";
import { getGroupSelect, getOrderBook } from "./orderBookSelectors";
import debounce from "lodash.debounce";
let ws: WebSocket;

export const openWebSocketThunk = (productId: string) => {
  return (dispatch: Dispatch) => {
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
      // console.log("onMessage");
      onWebSocketMessage(event, dispatch);
    };
    ws.onclose = function (error) {
      console.log("on close");
    };
  };
};

let onWebSocketMessage = (event: MessageEvent<string>, dispatch: Dispatch) => {
  const data: IOrderBookWSRS = JSON.parse(event.data);

  if (data.numLevels) {
    onWebSocketMessage = debounce(onWebSocketMessage, 170, {
      leading: true,
      trailing: false,
    });

    const updatedOrderBookData = dispatch(sortByGroupSelectThunk(data));
    dispatch(updateOrderBook(updatedOrderBookData));
  } else {
    const extendedOrderBook = dispatch(updateOrderDataWithNewData(data));
    const sortedOrderBook = dispatch(sortByGroupSelectThunk(extendedOrderBook));
    dispatch(updateOrderBook(sortedOrderBook));
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

let updateOrderDataWithNewData = (newData: IOrderBookWSRS) => {
  return (dispatch: Dispatch, getState: () => IState) => {
    const orderBook = getOrderBook(getState());
    let updatedOrderBook = { ...orderBook };

    const updatedAsks = filterOutAndRemoveOrders(newData.asks, orderBook?.asks);
    const updatedBids = filterOutAndRemoveOrders(newData.bids, orderBook?.bids);
    // total isn't updated
    console.log({ ...updatedOrderBook, asks: updatedAsks, bids: updatedBids });
    return {
      ...updatedOrderBook,
      asks: updatedAsks,
      bids: updatedBids,
    };
  };
};

const filterOutAndRemoveOrders = (
  incomingArr?: IOrder[],
  updatedArr: IOrder[] = []
) => {
  let arrToReturn = [...updatedArr];
  incomingArr?.forEach((incomingArrItem, i) => {
    const item = arrToReturn?.find(
      (previousBid) => previousBid[0] === incomingArrItem[0]
    );
    if (!!item) {
      const indexOfItem = arrToReturn?.indexOf(item);
      if (!indexOfItem) return;

      if (incomingArrItem?.[1] === 0)
        indexOfItem && arrToReturn?.splice(indexOfItem, 1);
      else arrToReturn[indexOfItem] = incomingArrItem;

      return;
    }
    if (arrToReturn?.length < 25 && incomingArrItem[1] !== 0)
      arrToReturn?.push(incomingArrItem);
  });
  return arrToReturn;
};

export const sortByGroupSelectThunk = (incomingOrderBook: IOrderBookWSRS) => {
  return (dispatch: Dispatch, getState: () => IState) => {
    const groupingValue = getGroupSelect(getState());
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

const sortByGroupSelect = (value: number, orders: IOrder[] = []): IOrder[] => {
  let updatedOrderBook = [...orders];
  for (let i = 0; i < updatedOrderBook.length; i++) {
    const selectedValuePrice = updatedOrderBook[i][0];
    const remainder = selectedValuePrice % value;

    // console.log("remainder: " + remainder);
    if (remainder) {
      const valueWithoutRemainder = selectedValuePrice - remainder;
      // console.log("valueWithoutRemainder: " + valueWithoutRemainder);
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
    const orderBook = getOrderBook(getState());
    if (!orderBook?.product_id) return;

    const newProductId =
      orderBook?.product_id === "PI_XBTUSD" ? "PI_ETHUSD" : "PI_XBTUSD";
    sendEventToWebSocket("unsubscribe", orderBook?.product_id);
    dispatch(resetOrderBook(newProductId));

    setTimeout(() => {
      sendEventToWebSocket("subscribe", newProductId);
    }, 500);

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
  sendEventToWebSocket("hbrefiu", "wefkuyv");
};
