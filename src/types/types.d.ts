declare interface IOrderBookWSRS {
  numLevels?: number;
  // feed: string;
  bids?: IOrder[];
  asks?: IOrder[];
  product_id?: string;
}

declare interface IUpdatedOrderBookWSRS {
  numLevels?: number;
  bids?: IUpdatedOrder[];
  asks?: IUpdatedOrder[];
  product_id?: string;
}

declare type IOrder = [price: number, amount: number];
declare type IUpdatedOrder = [price: number, amount: number];
declare interface IOrderBookResponse {
  data: IOrderBookWSRS;
}
