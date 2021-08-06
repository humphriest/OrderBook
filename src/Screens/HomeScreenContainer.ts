import { connect } from "react-redux";
import { setSelectedGrouping } from "../../redux/orderBook/orderBookActions";
import {
  getDisplayOrderBook,
  getGroupings,
  getSelectedGrouping,
  getError,
} from "../../redux/orderBook/orderBookSelectors";
import {
  openWebSocketThunk,
  throwWebSocketError,
  updateWebSocketThunk,
} from "../../redux/orderBook/orderBookThunks";
import HomeScreen, { IDispatchToProps, IStateToProps } from "./HomeScreen";

const mapStateToProps = (state: IState): IStateToProps => {
  return {
    groupings: getGroupings(state),
    selectedGrouping: getSelectedGrouping(state),
    displayOrderBook: getDisplayOrderBook(state),
    error: getError(state),
  };
};

const mapDispatchToProps: IDispatchToProps = {
  openWebSocket: openWebSocketThunk,
  setSelectedGrouping,
  updateWebSocket: updateWebSocketThunk,
  throwWebSocketError,
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
