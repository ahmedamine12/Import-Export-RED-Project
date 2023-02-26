import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../Images/Logo.png";
import "./Navbar.css";

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary" style={{ width: "100%", display: "flex" }}>
            <div className="row" style={{ width: "100%" }}>
                <div className=" title col-12 col-md-4" >
                    <Link className=" title navbar-brand" to="/">Application VINCI</Link>
                </div>
                <div className=" logo col-12 col-md-4 d-flex justify-content-center align-items-center">
                    <img style={{ marginLeft: "0px" }} className="logo" alt='logo' src={logo} width="200" height="50" />
                </div>
                <div className="col-12 col-md-4 d-flex justify-content-end ">
                    <Link className='mylink btn btn-outline-light me-3 px-4' to="/">Espace RED</Link>
                    <Link className='mylink btn btn-outline-light px-4' to="/homeRespo">Espace Responsable</Link>
                </div>
            </div>
        </nav>
    );
}
