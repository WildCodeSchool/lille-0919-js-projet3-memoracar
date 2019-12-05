import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style/LoginSignup.scss";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }
  handleChangeEmail(event) {
    if (event.target.value.includes("*")) {
      return;
    }
    this.setState({ email: event.target.value });
  }

  handleChangePassword(event) {
    if (event.target.value.includes("*")) {
      return;
    }
    this.setState({ password: event.target.value });
  }

  render() {
    return (
      <div id="loginSignup">
        <header>
          <Link to="/identification">
            <img
              src="/pictures/logos/Logo_MemoraCar_Def-03.png"
              alt="logo_Memoracar"
            />
          </Link>
        </header>
        <form>
          <label className="button">
            <input
              id="email"
              name="email"
              type="email"
              value={this.state.email}
              placeholder="email"
              onChange={this.handleChangeEmail}
            ></input>
          </label>
          <label className="button">
            <input
              id="password"
              name="password"
              placeholder="mot de passe"
              type="password"
              value={this.state.password}
              onChange={this.handleChangePassword}
            ></input>
          </label>
          <input className="button" type="submit" value="Soummettre"></input>
        </form>
      </div>
    );
  }
}
