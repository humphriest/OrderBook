import styled from "styled-components/native";

export const MainContainerView = styled.View`
  flex: 1;
`;

export const RowContainerView = styled.View`
  flex-direction: row;
  background-color: ${(props: { isBid: boolean }) =>
    props.isBid ? "green" : "red"};
`;

export const SectionContainerView = styled.View`
  flex: 0.33;
  align-items: flex-end;
  padding-right: 16;
`;
