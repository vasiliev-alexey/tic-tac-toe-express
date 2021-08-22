import React from "react";
import { Col } from "react-bootstrap";
import Avatar, { genConfig } from "react-nice-avatar";

type propsType = {
  userList: string[];
  currentUser: string;
  players: string[];
};

function Users(props: propsType): React.ReactElement {
  const data = props.userList.map((user: string) => {
    return (
      <Col key={user}>
        <Avatar
          style={{
            width: `40px`,
            height: `40px`,
          }}
          className="w-32 h-32"
          {...genConfig({
            bgColor: props.currentUser === user ? "red" : "white",
          })}
        />
        <p>
          {props.players.some((p) => p === user) ? "🖲️" : "👓"} {user}
        </p>
      </Col>
    );
  });
  return (
    <>
      <p>Зрители и участники</p>
      {data}
    </>
  );
}

export default Users;
