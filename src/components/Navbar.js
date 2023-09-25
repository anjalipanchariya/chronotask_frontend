import React from "react";
import '../styles/Navbar.css'
import logo from '../images/logo.jfif'
import Bills from './Bills'
import { BrowserRouter as Router, Link, Routes, Route} from "react-router-dom";
function Navbar(){
  return(
    <>
    <Router>
    <div className="navbar">
      <ul>
        <li><Link to="/"><img src={logo} alt="" /></Link></li>
        <li><Link to="/bills">Bills</Link></li>
        <li><Link to="/incomes">Incomes</Link></li>
        <li><Link to="/expenses">Expenses</Link></li>
        <li><Link to="/graphs">Graphs</Link></li>
      </ul>
      <div className="lg">

      </div>
      <Routes>
        <Route exact path="/bills" element={<Bills/>}></Route>
        {/* <Route exact path="/incomes" element = {<Incomes/>}></Route>
        <Route exact path="/expenses" element = {<Expense/>}></Route>
        <Route exact path="/graphs" element = {<Graphs/>}></Route> */}
      </Routes>
    </div>
    </Router>
    </>
    
  )
}

export default Navbar;