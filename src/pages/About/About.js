import React, { Component } from "react";
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';
import Markdown from 'react-markdown';
import './About.css';

const AboutFile = require("../../about.md");

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: ""
    }
  }

  render() {
    fetch(AboutFile) 
      .then(response => response.text())
      .then(result => this.setState({ response: result }));

    return (
      <div className="About">
        <Nav/>

        <div className='main'>
          <div className="card">
            <img
              src="/images/about.jpg"
              alt="Profil Fotoğrafı"
              className='card-image' 
            />

            <h1 className="card-title">Ben Kimim?</h1>

            <div className="card-content">
              <Markdown>{this.state.response}</Markdown>
            </div>
          </div>
        </div>

        <style>{`
          html {
            background: #fff; 
          }
        `}</style>
  
        <Footer/>
      </div>
    )
  }
};

export default About;