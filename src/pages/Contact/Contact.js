import React, { Component } from "react";
import { database } from '../../services/firebase';
import { SocialIcon } from 'react-social-icons';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';
import emailjs, { init } from 'emailjs-com';
import './Contact.css';

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

  render() {return (
    <div className="Contact">
      <Nav/>

      <div className='main'>
        <div className="contact-div">
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
              autoComplete="off"
              required
            />

            <input
              type="text"
              className="contact-input"
              placeholder="Konu (İsteğe Bağlı)"
              name="from_subject"
              autoComplete="off"
            />

            <textarea
              type="text"
              className="contact-textarea"
              placeholder="İçerik (Zorunlu)"
              name="message"
              autoComplete="off"
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

      <style>{`
        html {
          background: #fff; 
        }
      `}</style>
  
      <Footer/>
    </div>
  )}
};

export default Contact;