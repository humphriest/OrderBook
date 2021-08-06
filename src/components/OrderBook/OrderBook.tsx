import React from "react";
import { Order } from "../Order/Order";
import {
  AskContainerView,
  BidContainerView,
  MainContainerView,
  VerticalContainerView,
} from "./OrderBook.styles";

export const OrderBook = ({
  orderBookData,
}: {
  orderBookData?: IUpdatedOrderBookWSRS;
}) => (
  <MainContainerView>
    <VerticalContainerView>
      <BidContainerView>
        <Order price="Price" size="Size" total="Total" />
        {orderBookData?.bids?.reverse()?.map((bid) => {
          return (
            <Order
              price={bid[0]}
              size={bid[1]}
              total={bid[2]}
              overallTotal={orderBookData.highestTotal}
              isBid={true}
            />
          );
        })}
      </BidContainerView>
      <AskContainerView>
        {orderBookData?.asks?.map((ask) => {
          return (
            <Order
              price={ask[0]}
              size={ask[1]}
              total={ask[2]}
              overallTotal={orderBookData.highestTotal}
              isBid={false}
            />
          );
        })}
      </AskContainerView>
    </VerticalContainerView>
  </MainContainerView>
);
