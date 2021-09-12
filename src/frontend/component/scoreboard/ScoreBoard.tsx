import React from "react";
import { RootState } from "../../store/store";
import { connect } from "react-redux";

import Users from "./Users";
import Board from "../board/board";
import { Container, Row } from "react-bootstrap";

export type DispatchPropsType = typeof actionProps &
  ReturnType<typeof mapStateToProps>;

class ScoreBoard extends React.Component<DispatchPropsType> {
  render(): React.ReactElement {
    return (
      <>
        <Container>
          <Row>
            <Users {...this.props}></Users>{" "}
          </Row>

          <Row>
            <Board />
          </Row>
        </Container>
      </>
    );
  }
}

const actionProps = {};

const mapStateToProps = (state: RootState) => ({
  userList: state.game.userList,
  currentUser: state.game.currenUserName,
  players: [state.game.oUser, state.game.xUser] as string[],
});

export default connect(mapStateToProps, {
  ...actionProps,
})(ScoreBoard);
