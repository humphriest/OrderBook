import DropDownPicker from "react-native-dropdown-picker";
import React, { useState } from "react";
import {
  ButtonContainerView,
  MainContainerView,
  TitleContainerView,
  TitleText,
} from "./TopBar.styles";

interface IProps {
  setSelectedGrouping: (selectedGrouping: number) => void;
  groupings: number[];
  selectedGrouping: number;
}

export const TopBar = ({
  setSelectedGrouping,
  groupings,
  selectedGrouping,
}: IProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const onPressGroupSelect = (value: () => number) => {
    if (typeof value === "function") setSelectedGrouping(value());
    else setSelectedGrouping(value);
  };

  const returnDropDownItems = () =>
    groupings.map((grouping) => ({
      label: `Group ${grouping}`,
      value: grouping,
      selectable: true,
    }));

  return (
    <MainContainerView>
      <TitleContainerView>
        <TitleText>Order Book</TitleText>
      </TitleContainerView>
      <ButtonContainerView>
        <DropDownPicker
          style={{ backgroundColor: "black", height: 30 }}
          containerStyle={{
            width: 150,
            height: 80,
          }}
          textStyle={{ color: "white", fontSize: 11 }}
          listItemContainerStyle={{
            height: 20,
            backgroundColor: "black",
          }}
          items={returnDropDownItems()}
          value={selectedGrouping}
          open={isOpen}
          setOpen={(value) => setIsOpen(value)}
          setValue={onPressGroupSelect}
        />
      </ButtonContainerView>
    </MainContainerView>
  );
};
