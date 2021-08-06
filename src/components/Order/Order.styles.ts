import styled from "styled-components/native";

interface IIsBid {
  isBid?: boolean;
}

interface IBackgroundColorProps {
  isBid?: boolean;
  percentage?: number;
}

export const MainContainerView = styled.View`
  flex: 1;
`;
export const BackgroundColourView = styled.View`
  width: ${(props: IBackgroundColorProps) => `${props.percentage}%`};
  background-color: ${(props: IBackgroundColorProps) =>
    props.isBid ? "rgba(011, 195, 090, 0.1)" : "rgba(66,35,45,0.3)"};
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

const getTextColor = (props: IIsBid) => {
  if (props.isBid === undefined) return "#FFFFFF";

  if (!!props.isBid) return "green";

  return "red";
};
export const OrderText = styled.Text`
  color: ${getTextColor};
  font-size: 14;
`;
