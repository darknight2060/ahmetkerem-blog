import React, { Component } from "react";
import { database } from '../services/firebase';
import Nav from "../components/Nav";
import Footer from '../components/Footer';
import emailjs, { init } from 'emailjs-com';

init("user_Vdwby8A4OwT7IbNJvylLf");

class Contact extends Component {
  constructor(props) {
    super(props);
    this.database = database.ref(`posts/${window.location.pathname.slice(6)}`);
  }

  componentDidMount() {
    this.database.get().then(snap => {
      if (!snap.exists()) return;

      document.getElementById("contact-image").src = snap.val().image;
      document.getElementById("contact-title").innerText = snap.val().title;
      document.getElementById("contact-content").innerText = snap.val().content;
      document.getElementById("contact-date").innerText = snap.val().date;
    })

    document.getElementById("contact-form").addEventListener('submit', event => {
      event.preventDefault();

      emailjs.sendForm('service_1tize8k', "template_66d4i7o", event.target, "user_Vdwby8A4OwT7IbNJvylLf")
        .then(function() {
          alert('SUCCESS!');
        }, function(error) {
          alert('FAILED...', error);
        });
    });
  }

  render() {
    return (
      <div className="container">
        <Nav/>

        <div className='main'>
          <div className="contact">
            <img id="contact-image" className="contact-image" />

            <h2 className="contact-title">Sosyal Medya</h2>

            <div className="social-links">
              <a href="https://www.facebook.com/ahmetkerem.akyel.3/" target="blank">
                <div className="social" style={{backgroundColor: "#1278f3"}}>Facebook</div>
              </a>
  
              <a href="https://www.instagram.com/ahmetkeremakyel/" target="blank">
                <div className="social" style={{background: "linear-gradient(45deg, #405de6, #5851db, #833ab4, #c13584, #e1306c, #fd1d1d)"}}>Instagram</div>
              </a>
  
              <a href="https://twitter.com/ahmetkeremakyel" target="blank">
                <div className="social" style={{backgroundColor: "#00a2f5"}}>Twitter</div>
              </a>
            </div>

            <div>
              <div className="or">veya</div>
              <hr style={{width: "50%", marginTop: "-20px"}} />
            </div>
            
            <h2 className="contact-title-second">E-Posta Gönder</h2>

            <form id="contact-form">
              <input type="text" className="contact-input" placeholder="İsim" name="from_name" autocomplete="off" required />
              <input type="text" className="contact-input" placeholder="Konu" name="from_subject" autocomplete="off" />
              <textarea type="text" className="contact-textarea" placeholder="İçerik" name="message" autocomplete="off" required />
  
              <input type="submit" value="Gönder" className="contact-button" />
            </form>
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
    
          .contact {
            color: #000;
            border-radius: 10px;
            background: #fff;
            box-shadow: 0px 10px 16px rgb(0 0 0 / 24%);
            width: 100%;
            padding: 30px 0 50px;
            text-align: center;
          }
    
          .contact-image {
            width: 100%;
            height: 300px;
            border-radius: 10px 10px 0 0;
            object-fit: cover;
            display: none;
          }

          .contact-title {
            font-weight: normal;
            user-select: none;
          }

          .contact-title-second {
            font-weight: normal;
            user-select: none;
          }

          .contact .social {
            width: 100px;
            margin: 8px;
            padding: 10px;
            color: #fff;
            border-radius: 5px;
            display: inline-block;
            transition: .1s;
          }

          .contact .social:hover {
            box-shadow: 0 5px 10px #ccc;
          }

          .contact .social:active {
            transform: scale(.95);
          }

          .contact .or {
            width: max-content;
            background: #fff;
            margin: 20px auto 10px;
            padding: 0 16px;
            user-select: none;
            position: relative;
          }

          .contact hr {
            width: 50%;
            margin-top: -20px;
            border-color: rgb(238 238 239 / 50%);
          }
    
          .contact-input {
            width: 300px;
            border: 0;
            margin: 15px auto 0;
            padding: 12px;
            border-radius: 5px;
            background: rgba(0, 0, 0, .06);
            resize: none;
            outline: none;
            font-size: 16px;
            transition: .1s;
            display: block;
          }

          .contact-input:focus {
            background: rgb(0 0 0 / 10%);
            transform: scale(1.05);
          }

          .contact-textarea {
            width: 300px;
            border: 0;
            margin: 15px auto 0;
            padding: 12px;
            border-radius: 5px;
            background: rgba(0, 0, 0, .06);
            resize: none;
            outline: none;
            text-align: left;
            font-size: 14px;
            transition: .1s;
            display: block;
          }

          .contact-textarea:focus {
            background: rgb(0 0 0 / 10%);
            transform: scale(1.05);
          }

          .contact-button {
            width: 120px;
            background: var(--button-background);
            border: none;
            border-radius: 5px;
            margin: 20px auto 0;
            padding: 10px;
            color: #fff;
            font-size: 16px;
            outline: none;
            transition: .1s;
          }

          .contact-button:hover {
            background: var(--button-hover-background);
            cursor: pointer;
          }

          .contact-button:active {
            transform: scale(.95);
          }
    
          @media (max-width: 700px) {
            .container {
              padding: 0;
            }

            .main {
              width: 100%;
            }
    
            .contact {
              margin: 0 auto;
              border-radius: 0;
            }

            .contact-title {
              margin: 70px 0 20px;
            }

            .contact .social-links {
              max-width: 80%;
              margin: auto;
            }

            .contact-input {
              width: 80%;
            }

            .contact-textarea {
              width: 80%;
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