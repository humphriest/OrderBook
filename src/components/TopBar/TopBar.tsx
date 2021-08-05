import React from "react";
import { Button, Text } from "react-native";
import {
  ButtonContainerView,
  MainContainerView,
  TitleContainerView,
  TitleText,
} from "./TopBar.styles";

export const TopBar = () => {
  const onPressGroupSelect = () => {};

  return (
    <MainContainerView>
      <TitleContainerView>
        <TitleText>Order Book</TitleText>
      </TitleContainerView>
      {/* Change the button to a touchable opacity with a border and icon */}
      {/* Or a picker */}
      <ButtonContainerView>
        <Button title="Group 0.5" onPress={onPressGroupSelect} color="white" />
      </ButtonContainerView>
    </MainContainerView>
  );
};
