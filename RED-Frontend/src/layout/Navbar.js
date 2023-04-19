import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import logo from "../Images/Logo.png";
import "./Navbar.css";
import 'bootstrap/dist/js/bootstrap';

import $ from 'jquery';
window.jQuery = $;
window.$ = $;

export default function Navbar() {
    const location = useLocation();
    const isLoginPage = location.pathname === "/";

    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove flag or token from cookies or local storage
        localStorage.removeItem("isLoggedIn");

        // Navigate to the login page
        navigate("/");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
                <div className="logo order-1 order-lg-0">
                    <img className="logo-image" alt='logo' src={logo} width="200" height="50"/>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end order-2 order-lg-1" id="navbarNav">
                    <ul className="navbar-nav">
                        {isLoginPage ? null : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to="/home" style={{ textDecoration: 'none', color: 'white', marginRight: '10px' }}>Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to="/homeRedproduct" style={{ textDecoration: 'none', color: 'white', marginRight: '10px' }}>Espace RED</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/homeRespo" style={{ textDecoration: 'none', color: 'white', marginRight: '10px' }}>Espace Responsable</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/homeLc" style={{ textDecoration: 'none', color: 'white', marginRight: '10px' }}>Espace LC</Link>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link" style={{ textDecoration: 'none', color: 'white', background: 'transparent', border: 'none', cursor: 'pointer' }} onClick={handleLogout}>Log out</button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
