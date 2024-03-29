/**
 * footer class for footer
 * @component
 */
import '@fortawesome/fontawesome-free/css/all.min.css';
import React from 'react';
import './Footer.css';

export default class Footer extends React.Component {
    /**
     * displys footer
     * @returns 
     */
    render() {
        return (
            <footer>
                <div className="footer">
                    <div className="flex">
                        <ul>
                            <li><a href="mailto:admissions@croatia.rit.edu">Contact us</a></li>
                            <li><a href="https://www.rit.edu">RIT page</a></li>
                            <li><a href="https://www.rit.edu/computing/">GCCIS page</a></li>
                            <li><a href="https://www.rit.edu/academicaffairs/global/global-campuses">Global Campuses</a></li>
                        </ul>
                    </div>

                    <div className="flex">
                        Arian Vucelic &copy; - All rights reserved
                    </div>
                </div>
            </footer>
        );
    }
}
