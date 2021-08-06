import { connect } from "react-redux";
import { setSelectedGrouping } from "../../redux/orderBook/orderBookActions";
import {
  getGroupings,
  getGroupSelect,
  getOrderBook,
} from "../../redux/orderBook/orderBookSelectors";
import {
  openWebSocketThunk,
  updateWebSocketThunk,
} from "../../redux/orderBook/orderBookThunks";
import HomeScreen, { IDispatchToProps, IStateToProps } from "./HomeScreen";

const mapStateToProps = (state: IState): IStateToProps => {
  return {
    orderBook: getOrderBook(state),
    groupings: getGroupings(state),
    selectedGrouping: getGroupSelect(state),
  };
};

const mapDispatchToProps: IDispatchToProps = {
  openWebSocket: openWebSocketThunk,
  setSelectedGrouping,
  updateWebSocket: updateWebSocketThunk,
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
