import React from "react";
import '../styles/Navbar.css'
import logo from '../images/logo.jfif'
import { BrowserRouter as Router, Link } from "react-router-dom";
function Navbar(){
  return(
    <>
    <Router>
    <div className="navbar">
      <ul>

        <li><a href="">
          <img src={logo} alt="" /></a></li>
        <li><a href="">Notes</a></li>
        <li><a href="">Incomes</a></li>
        <li><a href="">Expenses</a></li>
        <li><a href="">Graphs</a></li>
      </ul>
    </div>
    </Router>
    </>
    
  )
}

export default Navbar;