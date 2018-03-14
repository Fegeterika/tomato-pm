/**
 * Navbar.jsx
 *
 * Navbar Component
 *
 * @author: Jae Sung Song
 * @license:
 * @version: 1.0.0
 * @see README
 */

// Initialization ==============================================================
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

class Navbar extends Component {
  render() {
    return (
      <header>
        <h2><a>Tomato PM</a></h2>
        <nav>
          <li><NavLink exact to="/dashboard">Dashboard</NavLink></li>
          <li><NavLink exact to="/">Projects</NavLink></li>
        </nav>
      </header>
    );
  }
}

export default Navbar
