import React, { Component } from "react";
import { database } from '../services/firebase';
import Nav from "../components/Nav";
import Footer from '../components/Footer';

class Contact extends Component {
  constructor(props) {
    super(props);
    this.database = database.ref(`posts/${window.location.pathname.slice(6)}`);
  }

  componentDidMount() {
    this.database.get().then(snap => {
      if (!snap.exists()) return;

      document.getElementById("card-image").src = snap.val().image;
      document.getElementById("card-title").innerText = snap.val().title;
      document.getElementById("card-content").innerText = snap.val().content;
      document.getElementById("card-date").innerText = snap.val().date;
    })

    //this.database.on("child_added", snap => {
    //
    //})
    //
    //this.database.on('child_removed', snap => {
    //  for (var i = 0; i < previousComments.length; i++) {
    //      if (previousComments[i].id === snap.key) {
    //          previousComments.splice(i, 1);
    //      }
    //  }
    //  this.setState({
    //    yorumlar: previousComments,
    //  })
    //})
  }

  render() {
    return (
      <div className="container">
        <Nav/>

        <div className='main'>
          <div className="card">
            <img id="card-image" alt="Yazı Fotoğrafı" className='card-image' draggable="false"/>

            <h1 id="card-title" className="card-title"></h1>

            <div id="card-content" className="card-content"></div>

            <div id="card-date" className="card-date"></div>
          </div>
        </div>
  
        <Footer/>
        
        <style>{`
          html {
            background: #fff;
          }

          .container {
            padding: 100px 0 0;
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
            border-radius: 10px;
            background: #fff;
            box-shadow: 0px 10px 16px rgb(0 0 0 / 24%);
            width: 100%;
            text-align: center;
          }
    
          .card-image {
            width: 100%;
            height: 300px;
            border-radius: 10px 10px 0 0;
            object-fit: cover;
          }
    
          .card-title {
            margin: 30px auto 35px;
            text-align: center;
            font-size: 48px;
            font-weight: normal;
          }

          .card-content {
            padding: 0 30px;
          }
    
          .card-date {
            padding: 30px;
            text-align: right;
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
              border-radius: 0;
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

export default Contact;