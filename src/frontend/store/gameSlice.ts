import { createSlice } from "@reduxjs/toolkit";
import wsService from "../api/wsService";

const gameSlice = createSlice({
  name: "game",
  initialState: {
    currenUserName: "",
    userLogged: false,
    gameField: [],
    userList: [],
    gameState: "init",
    winner: "",
    xUser: "",
    oUser: "",
    xIsNext: true,
  },
  reducers: {
    userLogin: (state, action) => {
      state.currenUserName = action.payload;
      wsService.sendActionToServer(action);
      state.userLogged = true;
    },

    boxClicked: (state, action) => {
      wsService.sendActionToServer(action);
    },
    handlePlayer: (state, action) => {
      wsService.sendActionToServer(action);
    },
    gameRestart: (state, action) => {
      wsService.sendActionToServer(action);
    },

    serverStateChanged: (state, action) => {
      const {
        gameField,
        gameState,
        userList,
        winner,
        playerX,
        playerO,
        xIsNext,
      } = action.payload;

      state.gameField = gameField;
      state.gameState = gameState;
      state.userList = userList;
      state.winner = winner;
      state.xUser = playerX;
      state.oUser = playerO;
      state.xIsNext = xIsNext;
    },
  },
});

const { actions, reducer } = gameSlice;

export const {
  userLogin,
  boxClicked,
  serverStateChanged,
  gameRestart,
  handlePlayer,
} = actions;

export default reducer;
