import React from "react";
import { MainContainerView } from "./HomeScreen.styles";
import { openWebSocketThunk } from "../../redux/orderBook/orderBookThunks";
import { OrderBook } from "../components/OrderBook/OrderBook";
import { TopBar } from "../components/TopBar/TopBar";
import { BottomBar } from "../components/BottomBar/BottomBar";
interface IProps {
  openWebSocket: () => void;
  sortByGroupSelect: (value: number) => void;
  orderBook: IUpdatedOrderBookWSRS;
}

export default class HomeScreen extends React.PureComponent<IProps> {
  componentDidMount() {
    this.props.openWebSocket();
  }
  onPressKillFeed = () => {};
  onPressToggleFeed = () => {};
  // onSelectGroup = (groupSelect: number) => {
  //   this.props.sortByGroupSelect(groupSelect);
  //   console.log(groupSelect);
  // };
  // This is going to consist of a TopBar with the group select box in it
  // the middle or main component which will be the order book
  // the bottom bar which will contain the buttons
  render() {
    const { orderBook, sortByGroupSelect } = this.props;
    return (
      <MainContainerView>
        <TopBar setGroupSelect={sortByGroupSelect} />
        {/* <Text>Open up App.js to start working on your app!</Text>*/}
        <OrderBook orderBookData={orderBook} />
        <BottomBar
          killFeed={this.onPressKillFeed}
          toggleFeed={this.onPressToggleFeed}
        />
      </MainContainerView>
    );
  }
}
