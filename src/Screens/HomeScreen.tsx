import React from "react";
import { MainContainerView } from "./HomeScreen.styles";
import { OrderBook } from "../components/OrderBook/OrderBook";
import { TopBar } from "../components/TopBar/TopBar";
import { BottomBar } from "../components/BottomBar/BottomBar";
import { throwWebSocketError } from "../../redux/orderBook/orderBookThunks";

export interface IStateToProps {
  orderBook?: IOrderBookWSRS;
  groupings: number[];
  selectedGrouping: number;
  displayOrderBook?: IUpdatedOrderBookWSRS;
}

export type IDispatchToProps = {
  openWebSocket: (productId: string) => void;
  setSelectedGrouping: (value: number) => void;
  updateWebSocket: () => void;
};

interface IProps extends IStateToProps, IDispatchToProps {}
export default class HomeScreen extends React.PureComponent<IProps> {
  componentDidMount() {
    this.props.openWebSocket("PI_XBTUSD");
  }

  onPressToggleFeed = () => {
    this.props.updateWebSocket();
  };

  render() {
    const {
      setSelectedGrouping,
      groupings,
      selectedGrouping,
      displayOrderBook,
    } = this.props;
    return (
      <MainContainerView>
        <TopBar
          setSelectedGrouping={setSelectedGrouping}
          groupings={groupings}
          selectedGrouping={selectedGrouping}
        />
        <OrderBook orderBookData={displayOrderBook} />
        <BottomBar
          killFeed={throwWebSocketError}
          toggleFeed={this.onPressToggleFeed}
        />
      </MainContainerView>
    );
  }
}
