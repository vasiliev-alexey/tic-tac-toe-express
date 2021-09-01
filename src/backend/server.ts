import { Server, Socket } from "socket.io";
import { store } from "./srore-backend/store";

import { Logger } from "tslog";

const logger: Logger = new Logger({ name: "app-server" });

import {
  addUser,
  boxClicked,
  CROSS,
  gameRestart,
  setUserRoleO,
  setUserRoleX,
} from "./srore-backend/gameSlice";

import { AnyAction } from "@reduxjs/toolkit";

import express from "express";
import path from "path";
import { config } from "dotenv";

config();

const app = express();

export const httpServer = app.listen(process.env.PORT || 3000, () => {
  logger.info("server started");
});

export const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

let basePath = "../../client";

if (process.env.NODE_ENV === "development") {
  basePath = "../../dist/client";
}

app.use(express.static(path.resolve(__dirname, basePath)));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, basePath, "index.html"));
});

io.on("connect", (socket: Socket) => {
  logger.debug(`connected client with id: ${socket.id}`);

  socket.on("game/userLogin", (data) => {
    logger.debug("game/userLogin", data);
    store.dispatch(addUser(data));
  });

  socket.on("game/boxClicked", (data) => {
    logger.debug("game/boxClicked", data);
    store.dispatch(boxClicked(data));
  });
  socket.on("game/gameRestart", (data) => {
    logger.debug("game/boxClicked", data);
    store.dispatch(gameRestart());
  });

  socket.on("game/handlePlayer", (data) => {
    logger.debug("game/handlePlayer", data);
    let userSetAction: AnyAction;
    if (data.player === CROSS) {
      userSetAction = setUserRoleX(data.userName);
    } else {
      userSetAction = setUserRoleO(data.userName);
    }
    store.dispatch(userSetAction);
  });

  store.subscribe(() => {
    logger.debug("sync state with client", store.getState().game);
    socket.emit("game/stateChanged", store.getState().game);
  });

  socket.on("disconnect", () => {
    logger.info(`disconnect  client${socket.id}`);
  });
});
