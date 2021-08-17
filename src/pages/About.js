import React, { Component } from "react";
import Nav from "../components/Nav";
import Footer from '../components/Footer';
import Markdown from 'react-markdown';

const AboutFile = require("../about.md");

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
      <div className="container">
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
  
        <Footer/>
        
        <style>{`
          html {
            background: #fff;
          }

          .container {
            padding: 120px 0 0;
            background: #eeeeef;
          }

          .main {
            max-width: 700px;
            width: 100%;
            margin: 0 auto;
            padding: 0;
          }
    
          .card {
            color: #000;
            padding: 30px 0 35px;
            border-radius: 10px;
            background: #fff;
            box-shadow: 0px 10px 16px rgb(0 0 0 / 10%);
            width: 100%;
            text-align: center;
          }
    
          .card-image {
            width: 200px;
            height: 200px;
            margin: 0px 60px 0 0;
            border-radius: 100%;
            object-fit: cover;
            float: right;
          }
    
          .card-title {
            margin: 68px auto 35px;
            text-align: center;
            font-size: 48px;
          }

          .card-content {
            min-height: 200px;
            padding: 15px 30px 10px;
            text-align: left;
          }
          
          .card a:hover {
            color: var(--button-hover-background);
          }

          .card h1 {
            font-weight: normal;
            text-align: center;
          }
    
          @media (max-width: 700px) {
            .container {
              padding: 0;
            }

            .main {
              width: 100%;
            }
    
            .card {
              margin: 0 auto;
              padding: 100px 0 35px;
              border-radius: 0;
              box-shadow: 0px 10px 16px rgb(0 0 0 / 94%);
            }

            .card-image {
              margin: 0;
              float: unset;
            }

            .card-title {
              margin: 0;
            }

            .card-content {
              margin-top: 25px;
              padding: 0 30px 0;
            }

            ul {
              padding-left: 15px;
            }

            footer {
              margin: 0;
            }
          }
        `}</style>
      </div>
    )
  }
};

export default About;