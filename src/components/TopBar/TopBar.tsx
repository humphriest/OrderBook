import DropDownPicker from "react-native-dropdown-picker";
import React, { useState } from "react";
import {
  ButtonContainerView,
  MainContainerView,
  TitleContainerView,
  TitleText,
} from "./TopBar.styles";

interface IProps {
  setGroupSelect: (groupSelect: number) => void;
}

export const TopBar = ({ setGroupSelect }: IProps) => {
  const [selectedValue, setSelectedValue] = useState(0.5);
  const [isOpen, setIsOpen] = useState(false);

  const onPressGroupSelect = (value: number) => {
    setSelectedValue(value);
    setGroupSelect(selectedValue);
  };

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
          items={[
            { label: "Group 0.5", value: 0.5, selectable: true },
            { label: "Group 1", value: 1, selectable: true },
            { label: "Group 2.5", value: 2.5, selectable: true },
          ]}
          value={selectedValue}
          open={isOpen}
          setOpen={(value) => setIsOpen(value)}
          setValue={(value) => onPressGroupSelect(value)}
        />
      </ButtonContainerView>
    </MainContainerView>
  );
};
