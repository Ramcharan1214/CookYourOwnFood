import { Link, useNavigate ,useLocation} from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import website_logo from "./nav_images/LOGO.jpeg";
import "./navbar.css";

function Navbar1(props) {
  const navigate = useNavigate();
  const [redirect, setRedirect] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const onSignout = () => {
    Cookies.remove("jwt_token");
    localStorage.removeItem("isAuthenticated");
    setRedirect(true);
    navigate("/login");
  };
  const location = useLocation();
  const isDishesPage = location.pathname === "/dishes"; 
  useEffect(() => {
    if (redirect) {
      navigate("/login");
    }
  }, [redirect, navigate]);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".nav");
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`nav ${isDishesPage ? "dishes-navbar" : ""}`}>
      <Link to="/">
        <img src={website_logo} alt="Website Logo" className="website_logo" />
      </Link>
      
      {/* Hamburger Menu for Mobile */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      {/* Navigation Links */}
      <ul className={`navelements ${menuOpen ? "active" : ""}`}>
        <li className="nav_ele">
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        </li>
        <li className="nav_ele">
          <Link to="/regions" onClick={() => setMenuOpen(false)}>Regions</Link>
        </li>
        <li className="nav_ele">
          <Link to="/dishes" onClick={() => setMenuOpen(false)}>Dishes</Link>
        </li>
        <li className="nav_ele">
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact Us</Link>
        </li>
      </ul>

      <button type="button" className="nav_button" onClick={onSignout}>
        Sign Out
      </button>
    </nav>
  );
}

export default Navbar1;
