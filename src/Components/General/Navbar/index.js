import React from 'react'
import { Button } from 'bootstrap'
import { NavLink } from 'react-router-dom'


const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink to="/" className="nav-link" >Add</NavLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  )
}

export default Navbar