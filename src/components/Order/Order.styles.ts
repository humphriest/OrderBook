import styled from "styled-components/native";

interface IIsBid {
  isBid?: boolean;
}

interface IBackgroundColorProps {
  isBid?: boolean;
  overallTotal?: number;
  total?: number;
}

const calculateBackgroundPercentage = (props: IBackgroundColorProps) => {
  if (!props.overallTotal || !props.total) return `0%`;
  return `${(props.total / props.overallTotal) * 100}%`;
};

const getTextColor = (props: IIsBid) => {
  if (props.isBid === undefined) return "#FFFFFF";

  if (!!props.isBid) return "green";

  return "red";
};

export const MainContainerView = styled.View`
  flex: 1;
`;
export const BackgroundColourView = styled.View`
  width: ${calculateBackgroundPercentage};
  background-color: ${(props: IBackgroundColorProps) =>
    props.isBid ? "rgba(011, 195, 090, 0.1)" : "rgba(248,73,95,0.1)"};
  height: 100%;
  align-self: flex-end;
`;
export const RowContainerView = styled.View`
  flex-direction: row;
  background-color: transparent;
  position: absolute;
  width: 100%;
`;

export const SectionContainerView = styled.View`
  flex: 0.33;
  align-items: flex-end;
  padding-right: 32;
`;

export const OrderText = styled.Text`
  color: ${getTextColor};
  font-size: 12px;
`;
