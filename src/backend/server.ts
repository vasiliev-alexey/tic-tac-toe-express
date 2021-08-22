import { Server, Socket } from "socket.io";
import { store } from "./srore-backend/store";
import {
  addUser,
  boxClicked,
  CROSS,
  gameRestart,
  setUserRoleO,
  setUserRoleX,
} from "./srore-backend/gameSlice";
// const io = new Server(8080);
import { createServer } from "http";
import { AnyAction } from "@reduxjs/toolkit";

// import cors from "cors";

import express from "express";
import path from "path";
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    //  methods: ["GET", "POST"],
  },
});

console.log("base:", path.resolve(__dirname, "../../client"));

app.use(express.static(path.resolve(__dirname, "../../client")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../client/index.html"));
});

// app.use(cors());const app = express();
// app.use(cors());

httpServer.listen(3000);
//app.listen(3001);

io.on("connect", (socket: Socket) => {
  console.log(`connect ${socket.id}`);

  socket.on("ping", () => {
    console.log("ping");
  });

  socket.on("go go", () => {
    console.log("go go");
  });
  socket.on("game/userLogin", (data) => {
    console.log("go go: ", "game/userLogin", data);
    const data2 = addUser(data);
    store.dispatch(data2);
    console.log("data2", data2);
  });

  socket.on("game/userLogin", (data) => {
    console.log("go go: ", "game/userLogin", data);
    const data2 = addUser(data);
    store.dispatch(data2);
    console.log("data2", data2);
  });

  socket.on("game/boxClicked", (data) => {
    console.log("go go: ", "game/boxClicked", data);
    const data2 = boxClicked(data);
    store.dispatch(data2);
    console.log("data2", data2);
  });
  socket.on("game/gameRestart", (data) => {
    console.log("go go: ", "game/boxClicked", data);
    const data2 = gameRestart();
    store.dispatch(data2);
    console.log("data2", data2);
  });

  socket.on("game/setUserRoleX", (data) => {
    console.log("go go: ", "game/setUserRoleX", data);
    const data2 = setUserRoleX(data);
    store.dispatch(data2);
    console.log("data2", data2);
  });

  socket.on("game/handlePlayer", (data) => {
    console.log("go go: ", "game/handlePlayer", data);
    let data2: AnyAction;
    if (data.player === CROSS) {
      data2 = setUserRoleX(data.userName);
    } else {
      data2 = setUserRoleO(data.userName);
    }

    store.dispatch(data2);
    console.log("data2", data2);
  });

  socket.on("disconnect", () => {
    console.log(`disconnect ${socket.id}`);
  });

  store.subscribe(() => {
    console.log("dddd:", store.getState().game);
    socket.emit("game/stateChanged", store.getState().game);
  });
});
