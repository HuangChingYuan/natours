import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__logo">
        <img src="img/logo-green.png" alt="Natours logo" />
      </div>
      <ul className="footer__nav">
        <li>
          <Link to="#">About us</Link>
        </li>
        <li>
          <Link to="#">Download apps</Link>
        </li>
        <li>
          <Link to="#">Become a guide</Link>
        </li>
        <li>
          <Link to="#">Careers</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
      <p className="footer__copyright">Author</p>
    </div>
  );
};

export default Footer;
