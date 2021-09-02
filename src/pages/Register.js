import React from 'react';
import { database, auth } from '../services/firebase';
import Nav from '../components/Nav';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.database = database.ref("data/users");

    this.SignUp = this.SignUp.bind(this);
  }

  componentDidMount() {
    window.addEventListener("keypress", (e) => {
      if (e.keyCode == "13") document.getElementById("registerButton").click();
    })
    
    if (localStorage.getItem("currentUser") !== null) window.location.href = "/";
  }

  async SignUp() {
    const nameValue = document.getElementById("name").value;
    const emailValue = document.getElementById("email").value;
    const passValue = document.getElementById("pass").value;

    if (nameValue == "") return document.getElementById("errorMessage").innerText = "Lütfen bir kullanıcı adı girin.";
    if (emailValue == "") return document.getElementById("errorMessage").innerText = "Lütfen bir E-Posta girin.";
    if (passValue == "") return document.getElementById("errorMessage").innerText = "Lütfen bir şifre girin.";

    document.getElementById("overlay").style.display = "block";
    document.getElementById("overlay-img").style.display = "block";

    await auth.createUserWithEmailAndPassword(emailValue, passValue).then().catch(() => {
      document.getElementById("overlay").style.display = "none";
      document.getElementById("overlay-img").style.display = "none";
    });

    auth.onAuthStateChanged(user => {
      if (user) {
        localStorage.setItem("currentUser", auth.currentUser.uid);
        
        database.ref("users/"+user.uid).set({
          userName: document.getElementById("name").value
        })

        return window.location.href = "/profil";
      }
    });
  }
  
  render() {return (
    <div>
      <Nav />

      <div className="overlay" id="overlay" />
      <img src="/images/favicon.png" className="overlay-img" id="overlay-img" />

      <div className="ana">
        <div className="ana-alt">

          <p style={{fontWeight: "bold", userSelect: "none"}}>Kaydol</p>
          <div id="errorMessage" className="errorMessage"></div>

          <input id="name" type="text" placeholder="Kullanıcı Adı" autocomplete="off" />

          <input id="email" type="email" placeholder="E-Posta" />

          <input id="pass" type="password" placeholder="Şifre" />
          
          <button className="registerButton" onClick={this.SignUp}>Kaydol</button><br/><br/>
          <label className="text">Zaten bir hesabın var mı? <a href="/giris">Giriş Yap.</a></label>
        </div>
  
        <style>{`
          .ana {
            position: fixed;
            width: 100%;
            height: 100%;
            padding-top: 100px;
            text-align: center;
            font-size: 30px;
          }
  
          .overlay {
            top: 0;
            left: 0;
            background: #000;
            position: fixed;
            width: 100%;
            height: 100%;
            opacity: 0.7;
            z-index: 888;
            display: none;
          }
    
          .overlay-img {
            top: 50%;
            left: 50%;
            width: 150px;
            height: 150px;
            position: fixed;
            margin-top: -75px;
            margin-left: -75px;
            object-fit: contain;
            z-index: 899;
            display: none;
          }
  
          .errorMessage {
            color: var(--cancel-button-background);
            font-size: 16px;
            font-weight: bold;
            margin-top: -30px;
            margin-bottom: 10px;
            padding: 10px 0;
          }
  
          input {
            width: 300px;
            border: 0;
            margin: 15px auto 0;
            padding: 12px;
            border-radius: 5px;
            background: rgba(255, 255, 255, 60%);
            resize: none;
            outline: none;
            font-size: 16px;
            transition: .1s;
            display: block;
          }
  
          input:focus {
            background: rgba(255, 255, 255);
            box-shadow: inset 0 0 0 2px var(--button-background);
          }
  
          button {
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
          
          button:hover {
            background: var(--button-hover-background);
          }

          button:active {
            background: var(--button-active-background);
          }
  
          .text {
            color: #000;
            font-size: 14px;
            display: block;
            margin: auto;
            max-width: 70%;
          }
  
          .text a {
            color: var(--button-background);
            font-weight: bold;
            transition: .1s;
          }
          
          .text a:hover {
            color: var(--button-hover-background);
          }

          .text a:active {
            color: var(--button-active-background);
          }
  
          @media (max-width: 623px) {
            .ana {
              position: fixed;
              padding: 100px 0px;
              margin: 0;
              height: 100%;
            }

            input {
              width: 80%;
            }
          }
        `}</style>
      </div>
    </div>
  )};
};

export default SignUp;