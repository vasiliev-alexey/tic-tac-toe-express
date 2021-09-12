import React, { Component, ReactElement } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { RootState } from "../../store/store";
import { connect } from "react-redux";
import { userLogin } from "../../store/gameSlice";
import { people } from "memorable-moniker";

export type DispatchPropsType = typeof actionProps &
  ReturnType<typeof mapStateToProps>;

class Login extends Component<DispatchPropsType> {
  state = {
    inputValue: people.next(),
    inputValid: true,
  };

  #inputTyped = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      inputValue: event.target.value,
      inputValid: event.target.value !== "",
    });
  };

  #onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    this.props.userLogin(this.state.inputValue);
  };

  render(): ReactElement {
    return (
      <>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1" data-testid={"InputGroup-Test-Id"}>
            Представьтесь
          </InputGroup.Text>
          <FormControl
            aria-label="Username"
            aria-describedby="basic-addon1"
            onChange={this.#inputTyped}
            value={this.state.inputValue}
          />
        </InputGroup>
        <Button onClick={this.#onClick} disabled={!this.state.inputValid}>
          Войти в игру
        </Button>
      </>
    );
  }
}

const actionProps = {
  userLogin: userLogin,
};

const mapStateToProps = (state: RootState) => ({
  userName: state.game.currenUserName,
});

export default connect(mapStateToProps, {
  ...actionProps,
})(Login);
