import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./navBar.css";

import { Navbar }  from "react-bootstrap";

export const NavBar = () => {
    return (
        <div className="menu">
            <div className="menu-content">
                <Navbar bg="light" 
                        expand="lg" 
                        className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <Navbar.Brand className="ml auto">
                        <img src="/img/favicon.png" alt="" />
                    </Navbar.Brand>
                </Navbar>
            </div>
        </div>
    );
}