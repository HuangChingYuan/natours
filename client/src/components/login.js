import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import { useAuth } from "../contexts/AuthContext";
import { showAlert } from "../utils/alerts";

const Login = () => {
  useEffect(() => {
    document.title = "Natours | LOG IN";
  }, []);
  const nagivate = useNavigate();
  const { setUser } = useAuth();

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      let response = await authService.login(email, password);
      if (response.data.status === "success") {
        setUser(response.data.data.user);
        showAlert("success", "登入成功");
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
        <h2 className="heading-secondary ma-bt-lg">Log into your account</h2>
        <form className="form form--login" onSubmit={handleSubmit}>
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
          <div className="form__group">
            <button onClick={handleLogin} className="btn btn--green">
              Log in
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;
