import { createSlice } from "@reduxjs/toolkit";
import { areAllBoxesClicked, findWinner } from "./functions";

import { Logger } from "tslog";
const logger: Logger = new Logger({ name: "gameSlice" });

export const CROSS = "❌";
export const ZERO = "⭕";
const NO_BODY = "NO_BODY";

const initState = {
  userList: [] as string[],
  gameField: [...Array<string>(9).fill(null)],
  playerX: "",
  playerO: "",
  winner: null as string,
  gameState: "init",
  xIsNext: true,
};

const gameSlice = createSlice({
  name: "game",
  initialState: initState,
  reducers: {
    resetState: () => {
      return initState;
    },

    addUser: (state, action) => {
      const userSet = new Set(state.userList);
      userSet.add(action.payload);
      state.userList = [...userSet];
    },

    setUserRoleX: (state, action) => {
      logger.debug("setUserRoleX", action.payload);
      if (state.playerX === "") {
        state.playerX = action.payload;
      }
    },

    setUserRoleO: (state, action) => {
      logger.debug("setUserRoleO", action.payload);
      if (state.playerO === "") {
        state.playerO = action.payload;
      }
    },
    gameRestart: (state) => {
      logger.debug("gameRestart");
      state.gameField = [...Array<string>(9).fill(null)];
      state.playerX = "";
      state.playerO = "";
      state.winner = null;
      state.gameState = "init";
      state.xIsNext = true;
    },

    boxClicked: (state, action) => {
      logger.debug("boxClicked", action.payload);
      const boxes = state.gameField.slice();

      boxes[action.payload] = state.xIsNext ? CROSS : ZERO;

      state.gameField = boxes;
      state.xIsNext = !state.xIsNext;

      const winner = findWinner(state.gameField);

      if (winner) {
        state.winner = winner;
        state.gameState = "finish";
        return;
      }
      if (areAllBoxesClicked(boxes) === true) {
        state.gameState = "finish";
        state.winner = NO_BODY;
        return;
      }
    },
  },
});

const { actions, reducer } = gameSlice;

export const {
  addUser,
  boxClicked,
  gameRestart,
  setUserRoleX,
  setUserRoleO,
  resetState,
} = actions;

export default reducer;
