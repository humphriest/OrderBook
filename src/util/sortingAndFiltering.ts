export const countDecimals = function (value: number) {
  if (value % 1 != 0) return value.toString().split(".")[1].length;
  return 0;
};

export const sortByGroupSelect = (
  value: number,
  orders: IOrder[] = []
): IOrder[] => {
  let updatedOrderBook = [...orders];

  for (let i = 0; i < updatedOrderBook.length; i++) {
    const selectedValuePrice = updatedOrderBook[i][0];
    let remainder = selectedValuePrice % value;

    if (remainder) {
      const numberOfDecimals = countDecimals(value);
      const valueWithoutRemainder = parseFloat(
        (selectedValuePrice - remainder).toFixed(numberOfDecimals)
      );
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

export const calculateTotalAndReturn = (
  orderBook: IOrderBookWSRS
): IUpdatedOrderBookWSRS => {
  let newAsks: IUpdatedOrder[] = [];
  let newBids: IUpdatedOrder[] = [];

  let asksTotal = 0;
  orderBook.asks?.slice(0, 15).forEach((ask, i) => {
    asksTotal = asksTotal + ask[1];
    newAsks[i] = [...ask, asksTotal];
  });

  let bidsTotal = 0;
  orderBook?.bids?.slice(0, 15).forEach((bid, i) => {
    bidsTotal = bidsTotal + bid[1];
    newBids[i] = [...bid, bidsTotal];
  });
  const highestTotal = bidsTotal > asksTotal ? bidsTotal : asksTotal;
  return {
    ...orderBook,
    bids: newBids,
    asks: newAsks,
    highestTotal,
  };
};

export const filterOutAndRemoveOrders = (
  incomingArr?: IOrder[],
  updatedArr: IOrder[] = []
) => {
  let arrToReturn = [...updatedArr];

  incomingArr?.forEach((incomingArrItem) => {
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
