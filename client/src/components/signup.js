import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import { showAlert } from "../utils/alerts";

const Signup = ({ user, setUser }) => {
  const nagivate = useNavigate();

  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [passwordConfirm, setPasswordConfirm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handlePasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value);
  };

  const handleSignup = async () => {
    try {
      let response = await authService.signup(
        name,
        email,
        password,
        passwordConfirm
      );
      if (response.data.status === "success") {
        setUser(response.data.data.user);
        showAlert("success", "註冊成功");
        window.setTimeout(() => {
          nagivate("/");
        }, 1500);
      }
    } catch (err) {
      showAlert("error", err.response.data.message);
    }
  };

  return (
    <main className="main">
      <div className="login-form">
        <h2 className="heading-secondary ma-bt-lg">Create your account!</h2>
        <form className="form form--signup" onSubmit={handleSubmit}>
          <div className="form__group">
            <label className="form__label" htmlFor="name">
              Your name
            </label>
            <input
              onChange={handleName}
              className="form__input"
              id="name"
              type="text"
              placeholder=""
              required=""
            />
          </div>
          <div className="form__group">
            <label className="form__label" htmlFor="email">
              Email address
            </label>
            <input
              onChange={handleEmail}
              className="form__input"
              id="email"
              type="email"
              placeholder="you@example.com"
              required=""
            />
          </div>
          <div className="form__group ma-bt-md">
            <label className="form__label" htmlFor="password">
              Password
            </label>
            <input
              onChange={handlePassword}
              className="form__input"
              id="password"
              type="password"
              placeholder="••••••••"
              required=""
              minLength="8"
            />
          </div>
          <div className="form__group ma-bt-md">
            <label className="form__label" htmlFor="passwordConfirm">
              Confirm password
            </label>
            <input
              onChange={handlePasswordConfirm}
              className="form__input"
              id="passwordConfirm"
              type="password"
              placeholder="••••••••"
              required=""
              minLength="8"
            />
          </div>
          <div className="form__group">
            <button onClick={handleSignup} className="btn btn--green">
              Sign up
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Signup;
