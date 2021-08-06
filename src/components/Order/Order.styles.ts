import styled from "styled-components/native";

interface IIsBid {
  isBid?: boolean;
}

export const MainContainerView = styled.View`
  flex: 1;
`;

export const RowContainerView = styled.View`
  flex-direction: row;
  background-color: ${(props: IIsBid) => (props.isBid ? "#2E3D31" : "#3A2B33")};
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
