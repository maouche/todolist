import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.svg";
import "../assets/css/navbar.css";

export default function Navbar({logged}) {  
    const [toggle, setToggle] = useState(false);  
    return (
        <nav className="navbar">

            <a className="btn-menu" onClick={(e) => setToggle(!toggle)}>
                <span className="fas fa-bars"></span>
            </a>

            <a className="logo" href="/">
                <img  className="w-24" src={logo} />
            </a>

            <div className={"links " + (toggle ? " show" : "")}>
                <div className="flex w-full justify-end items-center relative">
                    <div className="ul">
                        <Link to="/todos">Todos</Link>
                        <Link to="/logout">Logout</Link>
                    </div>                
                </div>
            </div>

        </nav>
    )
}