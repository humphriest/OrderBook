import React, { useState } from "react";
import { Text } from "react-native";
import { Order } from "../Order/Order";
import {
  AskContainerView,
  BidContainerView,
  MainContainerView,
  TextView,
  VerticalContainerView,
} from "./OrderBook.styles";

export const OrderBook = ({
  orderBookData,
}: {
  orderBookData: IUpdatedOrderBookWSRS;
}) => {
  return (
    <MainContainerView>
      <VerticalContainerView>
        <BidContainerView>
          {orderBookData?.bids?.map((bid) => {
            return (
              <Order price={bid[0]} size={bid[1]} total={bid[2]} isBid={true} />
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
                isBid={false}
              />
            );
          })}
        </AskContainerView>
      </VerticalContainerView>
    </MainContainerView>
  );
};
