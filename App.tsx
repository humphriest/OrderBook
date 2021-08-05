import React from "react";
import { Text } from "react-native";
import { connectToWebSocket } from "./api/websocket";
import { MainContainerView } from "./App.styles";

export default function App() {
  connectToWebSocket();

  // This is going to consist of a TopBar with the Geropu select box in it
  // the middle or main component which will be the order book
  // the bottom bar which will
  return (
    <MainContainerView>
      <Text>Open up App.js to start working on your app!</Text>
    </MainContainerView>
  );
}
