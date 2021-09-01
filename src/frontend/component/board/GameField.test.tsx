import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import GameField from "./GameField";

describe("GameField comp is function", () => {
  test("GameField is function", () => {
    expect(GameField).toBeInstanceOf(Object);
  });

  test("GameField must be render in page", () => {
    render(
      <GameField
        boxes={[]}
        status="init"
        winner=""
        isFilled={false}
        handleBoardRestart={jest.fn()}
        handleBoxClick={jest.fn()}
        setPlayerX={jest.fn()}
        setPlayerO={jest.fn()}
        xUser={"playerX"}
        oUser={"playerY"}
        currenUserName={"playerX"}
        statusMessage={"statusMessage"}
      />
    );
    expect(screen.getByText("statusMessage")).toBeInTheDocument();
  });
});
