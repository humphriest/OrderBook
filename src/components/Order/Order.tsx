import React from "react";
import { Text } from "react-native";
import { WhiteText } from "../OrderBook/OrderBook.styles";
import {
  MainContainerView,
  RowContainerView,
  SectionContainerView,
} from "./Order.styles";

export const Order = ({
  price,
  size,
  total,
  isBid,
}: {
  price: number;
  size: number;
  total: number;
  isBid: boolean;
}) => {
  return (
    <MainContainerView>
      <RowContainerView isBid={isBid}>
        <SectionContainerView>
          <WhiteText>{price}</WhiteText>
        </SectionContainerView>
        <SectionContainerView>
          <WhiteText>{size}</WhiteText>
        </SectionContainerView>
        <SectionContainerView>
          <WhiteText>{total}</WhiteText>
        </SectionContainerView>
      </RowContainerView>
    </MainContainerView>
  );
};
