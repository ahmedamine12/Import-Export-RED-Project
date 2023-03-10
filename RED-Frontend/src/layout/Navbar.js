import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../Images/Logo.png";
import "./Navbar.css";
import 'bootstrap/dist/js/bootstrap';

import $ from 'jquery';
window.jQuery = $;
window.$ = $;

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-primary">
            <div className="container">
                <Link className="navbar-brand" to="/">Application VINCI</Link>
                <div className="logo ">
                    <img className="logo-image" alt='logo' src={logo} width="200" height="50"/>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/" style={{ textDecoration: 'none', color: 'white', marginRight: '10px' }}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/homeRedproduct" style={{ textDecoration: 'none', color: 'white', marginRight: '10px' }}>Espace RED</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/homeRespo" style={{ textDecoration: 'none', color: 'white' }}>Espace Responsable</Link>
                        </li>
                    </ul>
                </div>

            </div>
        </nav>
    );
}
