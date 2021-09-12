import { store } from "./store";
import {
  userLogin,
  boxClicked,
  serverStateChanged,
  gameRestart,
  handlePlayer,
  resetState,
} from "./gameSlice";
import { nanoid } from "nanoid";
import wsService from "../api/wsService";
import { mocked } from "ts-jest/utils";

jest.mock("../api/wsService", () => {
  return function () {
    return { sendActionToServerFuncMock: () => jest.fn() };
  };
});

describe("Front: store and reducers test", () => {
  const MockedWsService = mocked(wsService, true);
  MockedWsService.sendActionToServer = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    store.dispatch(resetState());
  });

  afterEach(() => {
    //   store.dispatch(resetState());
  });

  test("gameRestart reducer", () => {
    const rndString = nanoid().toString();
    store.dispatch(gameRestart(rndString));
    expect(MockedWsService.sendActionToServer).toBeCalledTimes(1);
    expect(MockedWsService.sendActionToServer).toBeCalledWith({
      payload: rndString,
      type: "game/gameRestart",
    });
  });
  test("handlePlayer reducer", () => {
    const rndString = nanoid().toString();
    store.dispatch(handlePlayer(rndString));
    expect(MockedWsService.sendActionToServer).toBeCalledTimes(1);
    expect(MockedWsService.sendActionToServer).toBeCalledWith({
      payload: rndString,
      type: "game/handlePlayer",
    });
  });

  test("boxClicked reducer", () => {
    const rndString = nanoid().toString();
    store.dispatch(boxClicked(rndString));
    expect(MockedWsService.sendActionToServer).toBeCalledTimes(1);
    expect(MockedWsService.sendActionToServer).toBeCalledWith({
      payload: rndString,
      type: "game/boxClicked",
    });
  });

  test("userLogin reducer", () => {
    const state = store.getState().game;
    expect(state.currenUserName).toBe("");
    expect(state.userLogged).toBeFalsy();
    expect(state.userList.length).toBe(0);
    const rndString = nanoid().toString();
    store.dispatch(userLogin(rndString));
    expect(store.getState().game.userLogged).toBeTruthy();
    expect(MockedWsService.sendActionToServer).toBeCalledTimes(1);
  });

  test("serverStateChanged reducer", () => {
    store.dispatch(resetState);
    const state = store.getState().game;
    expect(state.currenUserName).toBe("");
    expect(state.userLogged).toBeFalsy();
    expect(state.userList.length).toBe(0);
    expect(store.getState().game.xIsNext).toBeTruthy();
    store.dispatch(
      serverStateChanged({
        gameField: "22",
        gameState: "22",
        userList: [],
        winner: "",
        playerX: "XXX",
        playerO: "OOO",
        xIsNext: false,
      })
    );
    expect(store.getState().game.xIsNext).toBeFalsy();
    expect(store.getState().game.gameState).toBe("22");
  });
});
