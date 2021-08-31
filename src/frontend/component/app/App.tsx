import React, { Component } from "react";
import "bootswatch/dist/cosmo/bootstrap.min.css";
import "../../../../public/index.scss";
import wsService from "../../api/wsService";
import { BrowserRouter, Route } from "react-router-dom";
// import { Login } from '../login/Login';
import ScoreBoard from "../scoreboard/ScoreBoard";
import Login from "../login/Login";
import { RootState } from "../../store/store";
import { connect } from "react-redux";

// type RootStateType = {};

class App extends Component<ReturnType<typeof mapStateToProps>> {
  render(): React.ReactElement {
    return (
      <BrowserRouter>
        <Route
          exact
          path="/"
          render={() => (this.props.userLogged ? <ScoreBoard /> : <Login />)}
        />
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  userLogged: state.game.userLogged,
});

export default connect(mapStateToProps, {})(App);

// export default App;
