import styled from "styled-components/native";

export const MainContainerView = styled.SafeAreaView`
  flex: 1;
  background-color: #1b262c;
`;

export const ErrorContainerView = styled.View`
  height: 100%;
  width: 100%;
  flex: 1;
  align-self: center;
  justify-content: center;
  background-color: rgba(248, 73, 95, 0.2);
  padding-horizontal: 16px;
`;

export const ErrorText = styled.Text`
  font-size: 32;
  color: #000;
`;

export const ErrorButtonContainerView = styled.View`
  justify-content: flex-end;
  margin-top: 20%;
  top: 15%; ;
`;
