import React, { FC } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Avatar, { genConfig } from "react-nice-avatar";
import { Box } from "./box";
import { CROSS, ZERO } from "./constats";

type propsType = {
  winner: string;
  status: string;
  statusMessage: string;
  isFilled: boolean;
  boxes: string[];
  handleBoxClick: (cellIndex: number) => void;
  handleBoardRestart: () => void;
  setPlayerX: () => void;
  setPlayerO: () => void;
  xUser: string;
  oUser: string;
  currenUserName: string;
};

const GameField: FC<propsType> = ({
  status,
  winner,
  isFilled,
  statusMessage,
  boxes,
  handleBoxClick,
  handleBoardRestart,
  setPlayerX,
  setPlayerO,
  xUser,
  oUser,
  currenUserName,
}): React.ReactElement => {
  const isUserSelected = status === "init" && !(xUser !== "" && oUser !== "");

  return (
    <div className="view view--board">
      <div className="board-wrapper">
        <div className="board">
          <Container>
            <h2 className="board-heading">{statusMessage}</h2>
            {isUserSelected && (
              <Row xl={5}>
                <Col>
                  <Button
                    variant="primary"
                    style={{ fontSize: "20px" }}
                    onClick={setPlayerX}
                    disabled={xUser !== "" || currenUserName === oUser}
                  >
                    Выбрать {CROSS}
                  </Button>
                </Col>

                <Col xl={6}> </Col>
                <Col>
                  <Button
                    variant="secondary"
                    style={{ fontSize: "20px" }}
                    onClick={setPlayerO}
                    disabled={oUser !== "" || currenUserName === xUser}
                  >
                    Выбрать {ZERO}
                  </Button>
                </Col>
              </Row>
            )}

            <Row>
              <hr></hr>
            </Row>
            <Row>
              <Col>
                {xUser && (
                  <>
                    <Avatar
                      style={{
                        width: `40px`,
                        height: `40px`,
                      }}
                      className="w-32 h-32"
                      {...genConfig()}
                    />
                    <p>
                      {CROSS} {xUser}{" "}
                    </p>
                  </>
                )}
              </Col>
              <Col>
                <Row className="board-row">
                  <Box value={boxes[0]} onClick={() => handleBoxClick(0)} />

                  <Box value={boxes[1]} onClick={() => handleBoxClick(1)} />

                  <Box value={boxes[2]} onClick={() => handleBoxClick(2)} />
                </Row>

                <Row>
                  <Box value={boxes[3]} onClick={() => handleBoxClick(3)} />

                  <Box value={boxes[4]} onClick={() => handleBoxClick(4)} />

                  <Box value={boxes[5]} onClick={() => handleBoxClick(5)} />
                </Row>

                <Row className="board-row">
                  <Box value={boxes[6]} onClick={() => handleBoxClick(6)} />

                  <Box value={boxes[7]} onClick={() => handleBoxClick(7)} />

                  <Box value={boxes[8]} onClick={() => handleBoxClick(8)} />
                </Row>
              </Col>

              <Col>
                {oUser && (
                  <>
                    <Avatar
                      style={{
                        width: `40px`,
                        height: `40px`,
                      }}
                      className="w-32 h-32"
                      {...genConfig()}
                    />
                    <p>
                      {ZERO} {oUser}
                    </p>
                  </>
                )}
              </Col>
            </Row>
          </Container>
        </div>

        {(winner || isFilled) && (
          <Button onClick={handleBoardRestart}>Start new game</Button>
        )}

        <Button onClick={handleBoardRestart}>Reset</Button>
      </div>
    </div>
  );
};

export default GameField;
