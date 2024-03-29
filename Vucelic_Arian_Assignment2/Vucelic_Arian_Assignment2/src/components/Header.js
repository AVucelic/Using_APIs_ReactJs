/**
 * Header class for header
 */
import React from 'react';
import './Header.css';


export default class Header extends React.Component {
    /**
     * displays hearder
     * @returns 
     */
    render() {
        return (
            <header id="home" className="head">
                <h2>iSchool@RIT</h2>
                <p>RIT stands for integ<span className='rit'>RIT</span>y</p>
            </header>
        );
    }
}
