import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./navBar.css";

import {Navbar, Nav}  from "react-bootstrap";



export const Navbar = () => {
    return (
        <div className="menu">
            <div className="menu-content">
                <Navbar 
                bg="light" 
                expand="lg" 
                className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Nav.brand className="ml auto">
                    <img src="/img/favicon.png" alt="" />
                </Nav.brand>
                </Navbar>
            </div>
        </div>
    )
}