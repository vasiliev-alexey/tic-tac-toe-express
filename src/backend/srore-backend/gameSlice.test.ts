import { store } from "./store";
import {
  addUser,
  boxClicked,
  CROSS,
  gameRestart,
  resetState,
  setUserRoleO,
  setUserRoleX,
} from "./gameSlice";
import { nanoid } from "nanoid";

describe("store and reducers test", () => {
  afterEach(() => {
    store.dispatch(resetState());
  });

  test("addUser reducer", () => {
    const state = store.getState().game;
    expect(state.userList).not.toBeNull();
    expect(state.userList.length).toBe(0);
    const rndString = nanoid().toString();
    store.dispatch(addUser(rndString));
    expect(store.getState().game.userList.length).toBe(1);
  });

  test("setUserRoleX reducer", () => {
    const state = store.getState().game;
    expect(state.playerX).toBe("");

    const rndString = nanoid().toString();
    store.dispatch(setUserRoleX(rndString));
    expect(store.getState().game.playerX).toBe(rndString);
  });

  test("setUserRoleO reducer", () => {
    const state = store.getState().game;
    expect(state.playerO).toBe("");

    const rndString = nanoid().toString();
    store.dispatch(setUserRoleO(rndString));
    expect(store.getState().game.playerO).toBe(rndString);
  });

  test("gameRestart reducer", () => {
    let state = store.getState().game;
    expect(state.playerO).toBe("");

    const rndString = nanoid().toString();
    store.dispatch(setUserRoleO(rndString));
    expect(store.getState().game.playerO).toBe(rndString);

    store.dispatch(setUserRoleX(rndString));
    expect(store.getState().game.playerX).toBe(rndString);

    store.dispatch(gameRestart());

    state = store.getState().game;

    expect(state.playerX).toBe("");
    expect(state.playerO).toBe("");
    expect(state.winner).toBeNull();
    expect(state.gameState).toBe("init");
    expect(state.xIsNext).toBeTruthy();
  });
  test("boxClicked reducer", () => {
    let state = store.getState().game;
    expect(state.xIsNext).toBeTruthy();
    store.dispatch(boxClicked(CROSS));
    state = store.getState().game;
    expect(state.xIsNext).toBeFalsy();
  });
});
