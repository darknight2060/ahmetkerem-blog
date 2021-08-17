import React, { Component } from 'react';

class LoginAlert extends Component {

  closeAlert() {
    document.getElementById("alertOverlay").style.visibility = "hidden";
    document.getElementById("alertOverlay").style.opacity = "0";

    document.getElementById("alert").style.visibility = "hidden";
    document.getElementById("alert").style.opacity = "0";
    document.getElementById("alert").style.transform = "scale(1.2)";
  }

  go() {
    window.location.href = "/giris";
  }

  render() {return (
    <div>
      <div className="alertOverlay" id="alertOverlay" onClick={this.closeAlert} />

      <div className="alert" id="alert">

        <a>:(</a>
        <p>Bunun için giriş yapman gerekli.</p>

        <button className="nope" onClick={this.closeAlert}>Kapat</button>
        <button className="yeah" onClick={this.go}>Giriş Sayfası</button>

      </div>

      <style>{`
        .alertOverlay {
          top: 0;
          left: 0;
          background: #000;
          position: fixed;
          width: 100%;
          height: 100%;
          opacity: 0;
          z-index: 99;
          visibility: hidden;
          transition: .2s;
        }

        .alert {
          top: 50%;
          margin-top: -80px;
          left: 50%;
          margin-left: -150px;
          background: #fff;
          width: 300px;
          height: 160px;
          opacity: 0;
          z-index: 999;
          position: fixed;
          border-radius: 10px;
          text-align: center;
          padding: 20px 10px;
          user-select: none;
          visibility: hidden;
          transform: scale(1.2);
          transition: .2s;
        }

        .alert a {
          color: #000;
          font-size: 40px;
          font-weight: bold;
        }

        .alert p {
          color: #000;
          font-size: 18px;
          margin-top: 15px;
        }

        .alert button {
          margin-top: 5px;
          outline: none;
        }

        .yeah {
          width: 125px;
          margin: 0 8px 0;
          padding: 10px;
          color: #fff;
          background: var(--button-background);
          border: 0;
          border-radius: 5px;
          outline: none;
          user-select: none;
          transition: .1s;
        }

        .yeah:hover {
          background: var(--button-hover-background);
        }

        .nope {
          width: 125px;
          margin: 0 8px 0;
          padding: 10px;
          color: var(--button-background);
          background: none;
          border: 2px solid var(--button-background);
          border-radius: 5px;
          outline: none;
          user-select: none;
          transition: .1s;
        }

        .nope:hover {
          color: var(--button-hover-background);
          border-color: var(--button-hover-background);
        }

        @media (max-width: 623px) {
          .alert {
            width: 100%;
            height: 100%;
            left: 0;
            padding: 20px 0px;
            margin: 0;
          }
        }
      `}</style>
    </div>
  )}
}

export default LoginAlert;