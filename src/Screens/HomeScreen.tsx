import React from "react";
import { useEffect } from "react";
import { Text } from "react-native";
import { useDispatch } from "react-redux";
import { MainContainerView } from "./HomeScreen.styles";
import { openWebSocketThunk } from "../../redux/orderBook/orderBookThunks";
import { OrderBook } from "../components/OrderBook/OrderBook";
import { TopBar } from "../components/TopBar/TopBar";
interface IProps {
  openWebSocket: () => void;
  orderBook: IUpdatedOrderBookWSRS;
}

export default class HomeScreen extends React.PureComponent<IProps> {
  componentDidMount() {
    // debugger;
    this.props.openWebSocket();
  }

  // This is going to consist of a TopBar with the group select box in it
  // the middle or main component which will be the order book
  // the bottom bar which will contain the buttons
  render() {
    return (
      <MainContainerView>
        <TopBar />
        {/* <Text>Open up App.js to start working on your app!</Text>*/}
        <OrderBook orderBookData={this.props?.orderBook} />
      </MainContainerView>
    );
  }
}
