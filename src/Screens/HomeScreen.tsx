import React from "react";
import NetInfo, {
  NetInfoState,
  NetInfoSubscription,
} from "@react-native-community/netinfo";
import { MainContainerView } from "./HomeScreen.styles";
import { OrderBook } from "../components/OrderBook/OrderBook";
import { TopBar } from "../components/TopBar/TopBar";
import { BottomBar } from "../components/BottomBar/BottomBar";
import { closeWebSocketThunk } from "../../redux/orderBook/orderBookThunks";

export interface IStateToProps {
  groupings: number[];
  selectedGrouping: number;
  displayOrderBook?: IUpdatedOrderBookWSRS;
  error?: Error;
}

export type IDispatchToProps = {
  openWebSocket: (productId?: string) => void;
  setSelectedGrouping: (value: number) => void;
  updateWebSocket: () => void;
  throwWebSocketError: () => void;
};

interface IProps extends IStateToProps, IDispatchToProps {}

interface IState {
  isConnected: boolean | null;
}

let unsubscribeNetInfo: NetInfoSubscription | undefined;

export default class HomeScreen extends React.PureComponent<IProps, IState> {
  componentDidMount() {
    this.props.openWebSocket("PI_XBTUSD");

    unsubscribeNetInfo = NetInfo.addEventListener(
      this._handleConnectivityChange
    );
  }

  _handleConnectivityChange = (state: NetInfoState) => {
    try {
      if (this.state.isConnected === state.isConnected) return;
      const { displayOrderBook, openWebSocket } = this.props;

      this.setState({ isConnected: state.isConnected });

      if (state.isConnected) {
        openWebSocket(displayOrderBook?.product_id);
      } else {
        closeWebSocketThunk();
      }
    } catch (err) {}
  };

  componentWillUnmount() {
    closeWebSocketThunk();
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
      throwWebSocketError,
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
