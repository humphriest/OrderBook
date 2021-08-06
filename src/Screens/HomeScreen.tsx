import React from "react";
import NetInfo, {
  NetInfoState,
  NetInfoSubscription,
} from "@react-native-community/netinfo";
import {
  ErrorButtonContainerView,
  ErrorContainerView,
  ErrorText,
  MainContainerView,
} from "./HomeScreen.styles";
import { OrderBook } from "../components/OrderBook/OrderBook";
import { TopBar } from "../components/TopBar/TopBar";
import { BottomBar } from "../components/BottomBar/BottomBar";
import { closeWebSocketThunk } from "../../redux/orderBook/orderBookThunks";
import { AppState, AppStateStatus, Button } from "react-native";

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
  setError: (error?: Error) => void;
};

interface IProps extends IStateToProps, IDispatchToProps {}

interface IState {
  isConnected: boolean | null;
}

let unsubscribeNetInfo: NetInfoSubscription | undefined;
let appState: AppStateStatus = AppState.currentState;

export default class HomeScreen extends React.PureComponent<IProps, IState> {
  componentDidMount() {
    this.reopenWebSocket();

    unsubscribeNetInfo = NetInfo.addEventListener(
      this._handleConnectivityChange
    );
    AppState.addEventListener("change", this._handleAppStateChange);
  }

  reopenWebSocket = () => {
    this.props.openWebSocket("PI_XBTUSD");
  };

  _handleConnectivityChange = (state: NetInfoState) => {
    try {
      if (this.state.isConnected === state.isConnected) return;

      this.setState({ isConnected: state.isConnected });
      if (state.isConnected) {
        this.reopenWebSocket();
      } else {
        closeWebSocketThunk();
      }
    } catch (err) {}
  };

  componentWillUnmount() {
    closeWebSocketThunk();
    AppState.removeEventListener("change", this._handleAppStateChange);
    unsubscribeNetInfo && unsubscribeNetInfo();
  }

  _handleAppStateChange = async (nextAppState: AppStateStatus) => {
    try {
      if (nextAppState !== appState) {
        appState = nextAppState;
        if (nextAppState === "active") {
          // reopen it when you come back into the foreground
          this.reopenWebSocket();
        } else {
          // Closing the WebSocket when the app goes to background
          closeWebSocketThunk();
        }
      }
    } catch (err) {}
  };

  resetErrorAndOpenWebSocket = () => {
    this.props.setError();
    this.reopenWebSocket();
  };

  renderAppError = () => {
    const { error } = this.props;

    return (
      <ErrorContainerView>
        {!!error?.name && !!error?.message ? (
          <>
            <ErrorText>Name:{error.name}</ErrorText>
            <ErrorText>Message:{error.message}</ErrorText>
          </>
        ) : (
          <ErrorText>Opps! Something went wrong</ErrorText>
        )}
        <ErrorButtonContainerView>
          <Button
            title="Clear Error and Retry WebSocket"
            onPress={this.resetErrorAndOpenWebSocket}
          />
        </ErrorButtonContainerView>
      </ErrorContainerView>
    );
  };

  render() {
    const {
      setSelectedGrouping,
      groupings,
      selectedGrouping,
      displayOrderBook,
      throwWebSocketError,
      updateWebSocket,
      error,
    } = this.props;

    if (error) return this.renderAppError();

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
          toggleFeed={updateWebSocket}
        />
      </MainContainerView>
    );
  }
}
