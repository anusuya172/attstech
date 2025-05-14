import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); 
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false); 
    navigate("/"); 
  };

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        background: "#123458",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.08)",
        position: "fixed",
        top: 0,
        width: "100vw",
        zIndex: 999,
        left: 0,
        right: 0,
      }}
    >
      <div className="container">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <a href="/" style={{ textDecoration: "none", color: "#D8C4B6", fontSize: "30px", fontWeight: 700 }}>
            ATTS
          </a>
          <p style={{ fontWeight: "500", color: "#D8C4B6", fontSize: "14px" }}>Technologies Private Limited</p>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
          aria-controls="navbarSupportedContent"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" style={{ filter: "invert(100%)" }}></span>
        </button>

        <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`} id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0" onClick={closeMenu}>
            <li className="nav-item">
              <a className="nav-link" href="/" onClick={() => window.scrollTo(0, 0)} style={linkStyle}>
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/" onClick={() => window.scrollTo(0, 0)} style={linkStyle}>
                About Us
              </a>
            </li>

            <li className="nav-item">
              {isLoggedIn ? (
                <button
                  className="btn ms-lg-3 contbtn"
                  onClick={handleLogout}
                  style={{
                    fontWeight: "500",
                    padding: "6px 20px",
                    borderRadius: "30px",
                    transition: "0.3s",
                    border: "2px solid #F1EFEC",
                    background: "#F1EFEC",
                    color: "#123458",
                  }}
                >
                  Logout
                </button>
              ) : (
                <a
                  className="btn ms-lg-3 contbtn"
                  href="/"  
                  style={{
                    fontWeight: "500",
                    padding: "6px 20px",
                    borderRadius: "30px",
                    transition: "0.3s",
                    border: "2px solid #F1EFEC",
                    background: "#F1EFEC",
                    color: "#123458",
                  }}
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Login
                </a>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

const linkStyle = {
  color: "#D8C4B6",
  fontWeight: "500",
  margin: "0 8px",
  transition: "0.3s",
};

export default NavBar;
