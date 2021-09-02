import React, { Component } from "react";
import { database } from '../services/firebase';
import { SocialIcon } from 'react-social-icons';
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
            <SocialIcon
            url="https://www.facebook.com/ahmetkerem.akyel.3/"
            style={{width: "35px", height: "35px"}}
          />

          <SocialIcon
            url="https://www.instagram.com/ahmetkeremakyel/"
            style={{width: "35px", height: "35px"}}
          />

          <SocialIcon
            url="https://twitter.com/ahmetkeremakyel"
            style={{width: "35px", height: "35px"}}
          />
            </div>

            <div>
              <div className="or">veya</div>
              <hr style={{width: "50%", marginTop: "-20px"}} />
            </div>
            
            <h2 className="contact-title-second">E-Posta Gönder</h2>

            <form id="contact-form">
              <input
                type="text"
                className="contact-input"
                placeholder="İsim (Zorunlu)"
                name="from_name"
                autocomplete="off"
                required
              />

              <input
                type="text"
                className="contact-input"
                placeholder="Konu (İsteğe Bağlı)"
                name="from_subject"
                autocomplete="off"
              />

              <textarea
                type="text"
                className="contact-textarea"
                placeholder="İçerik (Zorunlu)"
                name="message"
                autocomplete="off"
                required
              />
  
              <input
                type="submit"
                value="Gönder"
                className="contact-button"
              />
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
            box-shadow: 0px 10px 16px rgb(0 0 0 / 10%);
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

          .contact a.social-icon {
            margin-right: 10px;
          }
          
          .contact a.social-icon:hover {
            filter: brightness(0.8);
          }
          
          .contact a.social-icon:active {
            filter: brightness(0.6);
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
            background: rgba(0, 0, 0, .04);
            box-shadow: inset 0 0 0 2px var(--button-background);
          }

          .contact-textarea {
            width: 300px;
            height: 150px;
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
            background: rgba(0, 0, 0, .04);
            box-shadow: inset 0 0 0 2px var(--button-background);
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
            cursor: pointer;
          }

          .contact-button:hover {
            background: var(--button-hover-background);
          }

          .contact-button:active {
            background: var(--button-active-background);
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
              padding: 40px 0 50px;
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