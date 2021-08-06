import React from "react";
import {
  MainContainerView,
  OrderText,
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
          <OrderText isBid={isBid}>{price}</OrderText>
        </SectionContainerView>
        <SectionContainerView>
          <OrderText>{size}</OrderText>
        </SectionContainerView>
        <SectionContainerView>
          <OrderText>{total}</OrderText>
        </SectionContainerView>
      </RowContainerView>
    </MainContainerView>
  );
};
