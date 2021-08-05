import React from "react";
import { Text } from "react-native";
import { connectToWebSocket } from "./api/websocket";
import { MainContainerView } from "./App.styles";
import { OrderBook } from "./src/components/OrderBook/OrderBook";
import { TopBar } from "./src/components/TopBar/TopBar";

export default function App() {
  const orderBookData = connectToWebSocket();

  // This is going to consist of a TopBar with the group select box in it
  // the middle or main component which will be the order book
  // the bottom bar which will contain the buttons
  return (
    <MainContainerView>
      <TopBar />
      <Text>Open up App.js to start working on your app!</Text>
      <OrderBook orderBookData={orderBookData} />
    </MainContainerView>
  );
}
