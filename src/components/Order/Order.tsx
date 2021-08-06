import React from "react";
import {
  BackgroundColourView,
  MainContainerView,
  OrderText,
  RowContainerView,
  SectionContainerView,
} from "./Order.styles";

export const Order = ({
  price,
  size,
  total,
  overallTotal,
  isBid,
}: {
  price: number;
  size: number;
  total: number;
  overallTotal?: number;
  isBid: boolean;
}) => {
  return (
    <MainContainerView>
      <BackgroundColourView
        isBid={isBid}
        overallTotal={overallTotal}
        total={total}
      />
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
