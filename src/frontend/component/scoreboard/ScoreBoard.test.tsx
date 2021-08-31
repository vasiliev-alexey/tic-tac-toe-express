import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import configureStore from "redux-mock-store";

import { Provider } from "react-redux";
import ScoreBoard from "./ScoreBoard";
import { Middleware } from "@reduxjs/toolkit";

const middlewares: Middleware[] = [];

const mockStore = configureStore(middlewares);

describe("ScoreBoard comp is function", () => {
  test("ScoreBoard is function", () => {
    expect(ScoreBoard).toBeInstanceOf(Object);
  });

  test("ScoreBoard must be render in page", () => {
    const initialState = {
      game: {
        userList: ["1111"],
        players: ["1111"],
        currentUser: "1111",
        gameField: [""],
      },
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <ScoreBoard />
      </Provider>
    );
    expect(screen.getByText("Зрители и участники")).toBeInTheDocument();
  });
});
