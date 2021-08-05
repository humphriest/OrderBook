import React from "react";
import { Button } from "react-native";
import { MainContainerView } from "./BottomBar.styles";

interface IProps {
  toggleFeed: () => void;
  killFeed: () => void;
}
export const BottomBar = ({ toggleFeed, killFeed }: IProps) => {
  const onPressToggleFeed = () => {
    toggleFeed();
  };
  const onPressKillFeed = () => {
    killFeed();
  };
  return (
    <MainContainerView>
      <Button title="Toggle Feed" onPress={onPressToggleFeed} />
      <Button title="Kill Feed" onPress={onPressKillFeed} />
    </MainContainerView>
  );
};
