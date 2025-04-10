import { Link } from "react-router-dom";
import authService from "../services/authService";
import { showAlert } from "../utils/alerts";

const Header = ({ user, setUser }) => {
  const handleLogout = async () => {
    try {
      let response = await authService.logout();
      if (response.data.status === "success") {
        showAlert("success", "登出成功");
        setUser(null);
        window.setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (err) {
      console.log(err);
      showAlert("error", err.response.data);
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
        {user ? (
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
        ) : (
          <>
            <Link to="/login" className="nav__el">
              Log in
            </Link>
            <button className="nav__el nav__el--cta">Sign up</button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
