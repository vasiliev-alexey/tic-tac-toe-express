import { store } from "../store/store";

import io from "socket.io-client";
import { serverStateChanged } from "../store/gameSlice";
// const socket = io(`localhost:3000`);
const socket = io(`${window.location.hostname}:${process.env.PORT || 3000}`);

// httpServer.listen(3000);

class WsService {
  constructor() {
    socket.on("game/stateChanged", (data) => {
      store.dispatch(serverStateChanged(data));
    });
  }

  test() {
    socket.emit("go go", "data");
  }

  sendActionToServer(data: { type: string; payload: Record<string, unknown> }) {
    socket.emit(data.type, data.payload);
  }
}

const wsService = new WsService();
export default wsService;
