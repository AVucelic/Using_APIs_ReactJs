/**
 * Navbar class that creates navbar
 */
import React from 'react';
import './Navbar.css';

export default class Navbar extends React.Component {
  /**
   * displays navbar
   * @returns 
   */
  render() {
    return (
      <div>
        <div className="App">
          <nav>
            <div className="logo">
              <h4 className='text'>iSchool@RIT</h4>
            </div>
            <ul className="nav-links">
              <li><a href="#About">About</a></li>
              <li><a href="#Degrees">Degrees</a></li>
              <li><a href="#Employment">Employment</a></li>
              <li><a href="#Faculty">Faculty</a></li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}
