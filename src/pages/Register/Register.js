import React from 'react';
import { database, auth } from '../../services/firebase';
import Nav from '../../components/Nav/Nav';
import './Register.css';

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
    <div className="Register">
      <Nav />

      <div className="overlay" id="overlay" />
      <img src="/images/favicon.png" className="overlay-img" id="overlay-img" />

      <div className="ana">
        <div className="ana-alt">

          <p style={{fontWeight: "bold", userSelect: "none"}}>Kaydol</p>
          <div id="errorMessage" className="errorMessage"></div>

          <input id="name" type="text" placeholder="Kullanıcı Adı" autoComplete="off" />

          <input id="email" type="email" placeholder="E-Posta" />

          <input id="pass" type="password" placeholder="Şifre" />
          
          <button className="registerButton" onClick={this.SignUp}>Kaydol</button><br/><br/>
          <label className="text">Zaten bir hesabın var mı? <a href="/giris">Giriş Yap.</a></label>
        </div>
      </div>
    </div>
  )};
};

export default SignUp;