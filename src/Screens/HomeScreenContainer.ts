import { connect } from "react-redux";
import { getOrderBook } from "../../redux/orderBook/orderBookSelectors";
import {
  openWebSocketThunk,
  sortByGroupSelectThunk,
  updateWebSocketThunk,
} from "../../redux/orderBook/orderBookThunks";
import HomeScreen from "./HomeScreen";

const mapStateToProps = (state: IState) => {
  return {
    orderBook: getOrderBook(state),
  };
};

const mapDispatchToProps = {
  openWebSocket: openWebSocketThunk,
  sortByGroupSelect: sortByGroupSelectThunk,
  updateWebSocket: updateWebSocketThunk,
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
