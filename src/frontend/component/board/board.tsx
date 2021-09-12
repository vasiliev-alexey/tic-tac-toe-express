import React from "react";

import { CROSS, ZERO } from "./constats";
import GameField from "./GameField";
import { boxClicked, gameRestart, handlePlayer } from "../../store/gameSlice";
import { RootState } from "../../store/store";
import { connect } from "react-redux";

function areAllBoxesClicked(boxes: string[]): boolean {
  let count = 0;

  boxes.forEach(function (item) {
    if (item !== null) {
      count++;
    }
  });

  if (count === 9) {
    return true;
  } else {
    return false;
  }
}

type stateType = {
  boxes: string[];
};

export type DispatchPropsType = typeof actionProps &
  ReturnType<typeof mapStateToProps>;

class Board extends React.Component<DispatchPropsType, stateType> {
  constructor(props: DispatchPropsType) {
    super(props);

    this.state = {
      boxes: Array(9).fill(null),
    };
  }

  handleBoxClick = (index: number): void => {
    const boxes = this.props.gameField.slice();

    if (
      !(
        this.props.userName === this.props.xUser ||
        this.props.userName === this.props.oUser
      )
    ) {
      return;
    }

    if (this.props.xIsNext && this.props.xUser != this.props.userName) {
      return;
    }

    if (!this.props.xIsNext && this.props.oUser != this.props.userName) {
      return;
    }

    if (this.props.winner || boxes[index]) {
      return;
    }
    this.props.boxClicked(index);
  };

  handlePlayer = (player: string): void => {
    this.props.handlePlayer({ player: player, userName: this.props.userName });
  };

  handleBoardRestart = (): void => {
    this.props.gameRestart(null);
  };

  render(): React.ReactElement {
    const winner = this.props.winner;
    const isFilled = areAllBoxesClicked(this.props.gameField);

    let statusMessage;

    if (winner) {
      statusMessage = `Победитель: ${
        winner === "❌" ? this.props.xUser : this.props.oUser
      }!`;
    } else if (!winner && isFilled) {
      statusMessage = "Ничья!";
    } else {
      statusMessage = `Ход ${
        this.props.xIsNext
          ? this.props.xUser + "  " + CROSS
          : this.props.oUser + "  " + ZERO
      }`;
    }

    return (
      <GameField
        // boxes={this.state.boxes}
        boxes={this.props.gameField}
        status={this.props.gameState}
        winner={winner}
        isFilled={isFilled}
        handleBoardRestart={this.handleBoardRestart}
        handleBoxClick={this.handleBoxClick}
        setPlayerX={() => this.handlePlayer(CROSS)}
        setPlayerO={() => this.handlePlayer(ZERO)}
        xUser={this.props.xUser}
        oUser={this.props.oUser}
        currenUserName={this.props.userName}
        statusMessage={statusMessage}
      ></GameField>
    );
  }
}

const actionProps = {
  boxClicked: boxClicked,
  gameRestart: gameRestart,
  handlePlayer: handlePlayer,
};

const mapStateToProps = (state: RootState) => ({
  userName: state.game.currenUserName,
  gameField: state.game.gameField,
  gameState: state.game.gameState,
  winner: state.game.winner,
  oUser: state.game.oUser,
  xUser: state.game.xUser,
  xIsNext: state.game.xIsNext,
});

export default connect(mapStateToProps, {
  ...actionProps,
})(Board);
