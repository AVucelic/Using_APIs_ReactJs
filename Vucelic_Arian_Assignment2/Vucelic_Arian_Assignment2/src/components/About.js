/**
 * Class About which displays description about the iSchool and puts a quote
 */

import React, { Component } from "react";
import Box from "@mui/material/Box";
import gearsLoading from "./gears.gif";
import axios from "axios";
import "./About.css";

class About extends Component {
  /**
   * Constructor which has about array, and loaded as boolean set as false
   * @param {*} props 
   */
  constructor(props) {
    super(props);

    this.state = {
      about: {},
      loaded: false
    };

    this.aboutBoxRef = React.createRef();
  }

  /**
   * Accessing the API through in built method, and axios
   */
  componentDidMount() {
    axios
      .get("https://people.rit.edu/~dsbics/proxy/https://ischool.gccis.rit.edu/api/about")
      .then((response) => {
        this.setState({
          about: response.data,
          loaded: true
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  /**
   * In built method which renders text from the API
   * @returns 
   */
  render() {
    const { about, loaded } = this.state;

    return (
      <Box className="about-container">
        <Box className="about-box" ref={this.aboutBoxRef}>
          <h1>About <span>iSchool</span></h1>
          {loaded ? (
            <Box className="about-content">
              <p className="title">{about.title}</p>
              <p className="description">{about.description}</p>
              <div className="about-quote">
                "{about.quote}"
                <p>- {about.quoteAuthor}</p>
              </div>
            </Box>
          ) : (
            <img src={gearsLoading} alt="loading" className="loading-img" />
          )}
        </Box>
      </Box>
    );
  }
}

export default About;
