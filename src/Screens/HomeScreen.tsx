import React from "react";
import { MainContainerView } from "./HomeScreen.styles";
import { OrderBook } from "../components/OrderBook/OrderBook";
import { TopBar } from "../components/TopBar/TopBar";
import { BottomBar } from "../components/BottomBar/BottomBar";
import { throwWebSocketError } from "../../redux/orderBook/orderBookThunks";
interface IProps {
  openWebSocket: (productId: string) => void;
  sortByGroupSelect: (value: number) => void;
  updateWebSocket: () => void;
  orderBook: IUpdatedOrderBookWSRS;
}

export default class HomeScreen extends React.PureComponent<IProps> {
  componentDidMount() {
    this.props.openWebSocket("PI_XBTUSD");
  }
  // onPressKillFeed = () => {
  //   throwWebSocketError();
  // };
  onPressToggleFeed = () => {
    this.props.updateWebSocket();
  };
  // This is going to consist of a TopBar with the group select box in it
  // the middle or main component which will be the order book
  // the bottom bar which will contain the buttons
  render() {
    const { orderBook, sortByGroupSelect } = this.props;
    return (
      <MainContainerView>
        <TopBar setGroupSelect={sortByGroupSelect} />
        <OrderBook orderBookData={orderBook} />
        <BottomBar
          killFeed={throwWebSocketError}
          toggleFeed={this.onPressToggleFeed}
        />
      </MainContainerView>
    );
  }
}
