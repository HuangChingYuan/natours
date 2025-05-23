import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import authService from "../services/authService";
// import { useAuth } from "../contexts/AuthContext";
import { setUser } from "../store/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { showAlert } from "../utils/alerts";

const Account = () => {
  // const { user, setUser } = useAuth();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  let [passwordCurrent, setPasswordCurrent] = useState("");
  let [password, setPassword] = useState("");
  let [passwordConfirm, setPasswordConfirm] = useState("");
  const inputName = useRef();
  const inputEmail = useRef();
  const inputPhoto = useRef();

  useEffect(() => {
    if (user) {
      document.title = `Natours | ${user?.name.split(" ")[0]}`;
    }
  }, [user]);

  if (!user) {
    return (
      <main className="main">
        <div className="error">
          <div className="error__title">
            <h2 className="heading-secondary heading-secondary--error">
              錯誤頁面
            </h2>
            <h2 className="error__emoji">😢 🤯</h2>
          </div>
          <div className="error__msg">尚未登入任何帳號</div>
        </div>
      </main>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handlePasswordCurrent = (e) => {
    setPasswordCurrent(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handlePasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value);
  };

  const handleUpdateSettings = async () => {
    const userName = inputName.current.value;
    const userEmail = inputEmail.current.value;
    const userPhoto = inputPhoto.current.files[0];
    try {
      const form = new FormData();
      form.append("name", userName);
      form.append("email", userEmail);
      if (userPhoto) form.append("photo", userPhoto);
      let response = await authService.updateSettings(form);
      if (response.data.status === "success") {
        dispatch(setUser(response.data.data.user));
        // setUser(response.data.data.user);
        showAlert("success", "資料更新成功");
      }
    } catch (err) {
      showAlert("error", err.response.data.message);
    }
  };

  const handleupdateMyPassword = async () => {
    try {
      const updatedMyPassword = {
        ...user,
        passwordCurrent,
        password,
        passwordConfirm,
      };
      let response = await authService.updateMyPassword(updatedMyPassword);
      if (response.data.status === "success") {
        dispatch(setUser(response.data.data.user));
        // setUser(response.data.data.user);
        showAlert("success", "密碼更新成功");
      }
    } catch (err) {
      showAlert("error", err.response.data.message);
    }
  };

  const navItem = (link, text, icon, active) => {
    return (
      <li className={`${active ? "side-nav--active" : ""}`}>
        <Link to={link}>
          <svg>
            <use xlinkHref={`/img/icons.svg#icon-${icon}`}></use>
          </svg>
          {text}
        </Link>
      </li>
    );
  };

  return (
    <div className="user-view">
      <nav className="user-view__menu">
        <ul className="side-nav">
          {navItem("#", "Settings", "settings", true)}
          {navItem("#", "My bookings", "briefcase")}
          {navItem("#", "My reviews", "star")}
          {navItem("#", "Billing", "credit-card")}
        </ul>
        {user.role === "admin" && (
          <div className="admin-nav">
            <h5 className="admin-nav__heading">Admin</h5>
            <ul className="side-nav">
              {navItem("#", "Manage tours", "map")}
              {navItem("#", "Manage users", "users")}
              {navItem("#", "Manage reviews", "star")}
              {navItem("#", "Manage bookings", "briefcase")}
            </ul>
          </div>
        )}
      </nav>
      <div className="user-view__content">
        <div className="user-view__form-container">
          <h2 className="heading-secondary ma-bt-md">Your account settings</h2>
          <form className="form form-user-data" onSubmit={handleSubmit}>
            <div className="form__group">
              <label className="form__label" htmlFor="name">
                Name
              </label>
              <input
                ref={inputName}
                className="form__input"
                id="name"
                type="text"
                defaultValue={user.name}
                required=""
                name="name"
              />
            </div>
            <div className="form__group ma-bt-md">
              <label className="form__label" htmlFor="email">
                Email address
              </label>
              <input
                ref={inputEmail}
                className="form__input"
                id="email"
                type="email"
                defaultValue={user.email}
                required=""
                name="email"
              />
            </div>
            <div className="form__group form__photo-upload">
              <img
                className="form__user-photo"
                src={`http://localhost:8080/img/users/${user.photo}`}
                alt="user img"
              />
              <input
                ref={inputPhoto}
                className="form__upload"
                type="file"
                accept="image/*"
                id="photo"
                name="photo"
              />
              <label htmlFor="photo">Choose new photo</label>
            </div>
            <div className="form__group right">
              <button
                onClick={handleUpdateSettings}
                className="btn btn--small btn--green"
              >
                Save settings
              </button>
            </div>
          </form>
        </div>
        <div className="line">&nbsp;</div>
        <div className="user-view__form-container">
          <h2 className="heading-secondary ma-bt-md">Password change</h2>
          <form className="form form-user-password" onSubmit={handleSubmit}>
            <div className="form__group">
              <label className="form__label" htmlFor="password-current">
                Current password
              </label>
              <input
                onChange={handlePasswordCurrent}
                className="form__input"
                id="password-current"
                type="password"
                placeholder="••••••••"
                required=""
                minLength="8"
              />
            </div>
            <div className="form__group">
              <label className="form__label" htmlFor="password">
                New password
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
            <div className="form__group ma-bt-lg">
              <label className="form__label" htmlFor="password-confirm">
                Confirm password
              </label>
              <input
                onChange={handlePasswordConfirm}
                className="form__input"
                id="password-confirm"
                type="password"
                placeholder="••••••••"
                required=""
                minLength="8"
              />
            </div>
            <div className="form__group right">
              <button
                onClick={handleupdateMyPassword}
                className="btn btn--small btn--green btn--save-password"
              >
                Save password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Account;
