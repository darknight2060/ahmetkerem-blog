import React from 'react';
import { auth } from '../../services/firebase';
import Nav from '../../components/Nav/Nav';
import './Login.css';

const Login = () => {
  if (localStorage.getItem("currentUser") !== null) window.location.href = "/";

  function SignIn() {
    const emailValue = document.getElementById("email").value;
    const passValue = document.getElementById("pass").value;

    if (emailValue == "") return document.getElementById("errorMessage").innerText = "Lütfen bir E-Posta girin.";
    if (passValue == "") return document.getElementById("errorMessage").innerText = "Lütfen bir şifre girin.";

    document.getElementById("overlay").style.display = "block";
    document.getElementById("overlay-img").style.display = "block";

    auth.signInWithEmailAndPassword(emailValue, passValue)
      .then((user) => {
        if (user !== null) {
          localStorage.setItem("currentUser", auth.currentUser.uid);
          return window.location.href = "/";
        }
      }).catch((error) => {
        document.getElementById("overlay").style.display = "none";
        document.getElementById("overlay-img").style.display = "none";
      });
  }

  window.addEventListener("keypress", (e) => {
    if (e.keyCode == "13") document.getElementById("signButton").click();
  })

  return (
    <div className="Login">
      <Nav />
  
      <div className="overlay" id="overlay" />
      <img src="/images/favicon.png" className="overlay-img" id="overlay-img" />

      <div className="ana">
  
        <p style={{fontWeight: "bold", userSelect: "none"}}>Giriş Yap</p>
        <div id="errorMessage" className="errorMessage"></div>
  
        <input id="email" type="email" placeholder="E-Posta" />

        <input id="pass" type="password" placeholder="Şifre" />
        
        <button onClick={SignIn} id="signButton">Giriş Yap</button><br/><br/>
        <label className="text">Henüz bir hesabın yok mu? <a href="/kaydol">Kaydol.</a></label>
      </div>
    </div>
  );
};
 
export default Login;