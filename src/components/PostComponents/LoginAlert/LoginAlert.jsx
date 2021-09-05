import React, { Component } from 'react';
import './LoginAlert.css';

class LoginAlert extends Component {

  closeAlert() {
    document.getElementById("alertOverlay").style.visibility = "hidden";
    document.getElementById("alertOverlay").style.opacity = "0";

    document.getElementById("alert").style.visibility = "hidden";
    document.getElementById("alert").style.opacity = "0";
    document.getElementById("alert").style.transform = "scale(1.2)";
  }

  render() {return (
    <div>
      <div className="alertOverlay" id="alertOverlay" onClick={this.closeAlert} />

      <div className="alert" id="alert">

        <a>:(</a>
        <p>Bunun için giriş yapman gerekli.</p>

        <button className="rejection" onClick={this.closeAlert}>Kapat</button>
        <button className="confirmation" onClick={() => window.location.href = "/giris"}>Giriş Sayfası</button>

      </div>
    </div>
  )}
}

export default LoginAlert;