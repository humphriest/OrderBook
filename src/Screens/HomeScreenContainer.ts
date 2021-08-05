import { connect } from "react-redux";
import { getOrderBook } from "../../redux/orderBook/orderBookSelectors";
import { openWebSocketThunk } from "../../redux/orderBook/orderBookThunks";
import HomeScreen from "./HomeScreen";

const mapStateToProps = (state: IState) => {
  return {
    orderBook: getOrderBook(state),
  };
};

const mapDispatchToProps = {
  openWebSocket: openWebSocketThunk,
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
