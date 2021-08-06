declare interface IOrderBookWSRS {
  numLevels?: number;
  bids?: IOrder[];
  asks?: IOrder[];
  product_id?: string;
}

declare interface IUpdatedOrderBookWSRS {
  numLevels?: number;
  bids?: IUpdatedOrder[];
  asks?: IUpdatedOrder[];
  product_id?: string;
  highestTotal?: number;
}

declare type IOrder = [price: number, amount: number];
declare type IUpdatedOrder = [price: number, amount: number, total: number];
declare interface IOrderBookResponse {
  data: IOrderBookWSRS;
}
