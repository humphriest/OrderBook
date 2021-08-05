let ws: WebSocket;
export const connectToWebSocket = () => {
  const wsURL = "wss://www.cryptofacilities.com/ws/v1";
  ws = new WebSocket(wsURL);

  ws.onopen = function () {
    console.log("on open");
  };
  ws.onerror = function (error) {
    console.log("on error");
  };
  ws.onmessage = function (event) {
    console.log("on message");
    console.log(event);
  };
  ws.onclose = function (error) {
    console.log("on close");
  };

  return {
    data: '{"numLevels":25,"feed":"book_ui_1_snapshot","bids":[[38173.0,1200.0],[38165.5,2500.0],[38160.5,2085.0],[38159.0,7938.0],[38158.0,1000.0],[38157.5,2020.0],[38155.5,4314.0],[38154.0,64666.0],[38153.5,23999.0],[38152.5,30000.0],[38151.5,1335.0],[38150.5,6054.0],[38150.0,18700.0],[38149.5,8339.0],[38148.0,9293.0],[38147.5,6903.0],[38147.0,1.0],[38145.5,2021.0],[38144.0,50000.0],[38143.5,2031.0],[38142.0,177917.0],[38141.0,65504.0],[38139.0,2042.0],[38138.0,4928.0],[38137.0,7500.0]],"asks":[[38174.0,400.0],[38176.5,1803.0],[38178.0,76351.0],[38178.5,1434.0],[38180.0,3848.0],[38180.5,10025.0],[38186.5,4300.0],[38189.0,2500.0],[38189.5,7169.0],[38194.0,60.0],[38196.0,7494.0],[38196.5,6054.0],[38197.5,6886.0],[38199.0,6444.0],[38200.0,1200.0],[38203.5,9342.0],[38204.5,1992.0],[38205.0,1958.0],[38205.5,58909.0],[38206.0,50944.0],[38208.0,3042.0],[38210.5,3081.0],[38211.5,2049.0],[38212.5,30000.0],[38214.5,91019.0]],"product_id":"PI_XBTUSD"}',
    isTrusted: false,
  };
};

export const sendEventToWebSocket = (event: string, productId: string) => {
  ws.send(
    JSON.stringify({
      event,
      feed: "book_ui_1",
      products_ids: [productId],
    })
  );
};
