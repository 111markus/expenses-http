import React, { useReducer, useContext } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import AuthContext from "../../store/auth-context";
import "./Login.css";

const initialState = {
  username: "",
  password: "",
  error: null,
  isLoading: false,
  formIsValid: false,
};

const loginReducer = (state, action) => {
  switch (action.type) {
    case "USERNAME_INPUT":
      return {
        ...state,
        username: action.value,
        formIsValid:
          action.value.includes("@") && state.password.trim().length > 0,
      };
    case "PASSWORD_INPUT":
      return {
        ...state,
        password: action.value,
        formIsValid:
          state.username.includes("@") && action.value.trim().length > 0,
      };
    case "SUBMIT_START":
      return { ...state, isLoading: true, error: null };
    case "SUBMIT_SUCCESS":
      return { ...state, isLoading: false };
    case "SUBMIT_ERROR":
      return { ...state, isLoading: false, error: action.message };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

const Login = () => {
  const ctx = useContext(AuthContext);
  const [state, dispatch] = useReducer(loginReducer, initialState);

  const usernameChangeHandler = (e) => {
    dispatch({ type: "USERNAME_INPUT", value: e.target.value });
  };

  const passwordChangeHandler = (e) => {
    dispatch({ type: "PASSWORD_INPUT", value: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch({ type: "SUBMIT_START" });

    try {
      const response = await fetch("http://localhost:3005/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: state.username,
          password: state.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      dispatch({ type: "SUBMIT_SUCCESS" });

      ctx.onLogin(data.user.username);
    } catch (err) {
      dispatch({ type: "SUBMIT_ERROR", message: err.message });
    }
  };

  return (
    <Card className="login">
      <h2>Login</h2>
      <form onSubmit={submitHandler}>
        <div className="login__control">
          <label htmlFor="username">Email</label>
          <input
            id="username"
            type="email"
            value={state.username}
            onChange={usernameChangeHandler}
            required
          />
        </div>
        <div className="login__control">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={state.password}
            onChange={passwordChangeHandler}
            required
          />
        </div>
        {state.error && <p className="login__error">{state.error}</p>}
        <div className="login__actions">
          <Button type="submit" disabled={!state.formIsValid}>
            {state.isLoading ? "Logging in..." : "Login"}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
