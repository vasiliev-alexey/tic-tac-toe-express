import React from "react";

type propsType = {
  value: string;
  onClick: () => void;
};

export const Box = ({ onClick, value }: propsType): React.ReactElement => {
  return (
    <button
      style={{
        width: `100px`,
        height: `100px`,
        fontSize: "50px",
      }}
      className="board__box"
      onClick={onClick}
    >
      {value}
    </button>
  );
};
