import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";
import { useAuth } from "../contexts/AuthContext";
import { showAlert } from "../utils/alerts";

const Header = () => {
  const nagivate = useNavigate();
  const { user, setUser } = useAuth();

  const handleLogout = async () => {
    try {
      nagivate("/");
      let response = await authService.logout();
      if (response.data.status === "success") {
        showAlert("success", "登出成功");
        setUser(response.data.data.user);
      }
    } catch (err) {
      console.log(err);
      showAlert("error", err);
    }
  };
  return (
    <header className="header">
      <nav className="nav nav--tours">
        <Link to="/" className="nav__el">
          All tours
        </Link>
        <form className="nav__search">
          <button className="nav__search-btn">
            <svg>
              <use xlinkHref="img/icons.svg#icon-search"></use>
            </svg>
          </button>
          <input
            type="text"
            placeholder="Search tours"
            className="nav__search-input"
          />
        </form>
      </nav>
      <div className="header__logo">
        <img src="img/logo-white.png" alt="Natours logo" />
      </div>

      <nav className="nav nav--user">
        {user && user.photo && user.name && (
          <>
            <button onClick={handleLogout} className="nav__el nav__el--logout">
              Log out
            </button>
            <Link to="/me" className="nav__el">
              <img
                src={`/img/users/${user.photo}`}
                alt={user.name}
                className="nav__user-img"
              />
              <span>{user.name.split(" ")[0]}</span>
            </Link>
          </>
        )}
        {(!user || !user.photo || !user.name) && (
          <>
            <Link to="/login" className="nav__el">
              Log in
            </Link>
            <Link to="/signup" className="nav__el">
              <button className="nav__el nav__el--cta">Sign up</button>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
