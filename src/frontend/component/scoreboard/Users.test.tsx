import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Users from "./Users";

describe("Users comp is function", () => {
  test("Users is function", () => {
    expect(Users).toBeInstanceOf(Object);
  });

  test("Users must be render in page", () => {
    render(
      <Users
        currentUser={"qqq"}
        players={["qqq", "qqqqqq"]}
        userList={["qqq", "wwwww"]}
      ></Users>
    );
    expect(screen.getByTestId("Users-Test-Id")).toBeInTheDocument();
    expect(screen.getByTestId("qqq-Test-Id")).toBeInTheDocument();
  });
});
