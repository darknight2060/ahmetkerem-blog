import React from 'react';
import { auth } from '../services/firebase';
import Skeleton from "react-loading-skeleton";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false
    }

    this.toggleMenu = this.toggleMenu.bind(this);
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        document.getElementById("nav-name").innerHTML = user.displayName;
        document.getElementById("nav-pp").src = user.photoURL;
      }
    })
  }

  toggleMenu () {
    if (this.state.opened == false) {
      this.setState({ opened: true })

      document.getElementById("nav-ul").style.left = "0";
      document.getElementById("showMenu").style.backgroundColor = "#000";
      document.getElementById("showMenu").innerHTML = "&#x2715;";
    } else {
      this.setState({ opened: false })

      document.getElementById("nav-ul").style.left = "-120%";
      document.getElementById("showMenu").style.backgroundColor = "rgb(0 211 128 / 80%)";
      document.getElementById("showMenu").innerHTML = "&#9776;";
    }
  }

  render() {
    return (
      <div>
        <div className="overlay"></div>
        <label className="showMenu" id="showMenu" onClick={this.toggleMenu}>&#9776;</label>
        <nav className="nav" id="nav">
          <ul id="nav-ul">
            <a href="/" className="nav-image-container">
              <img src="/images/favicon.png" className="nav-image"/>
            </a>
              <div className="section"></div>
            <li>
              <a href="/">Ana Sayfa</a>
            </li>
              <div className="section"></div>
            <li>
              <a href="/hakkinda">Hakkında</a>
            </li>
              <div className="section"></div>
            <li>
              <a href="/iletisim">İletişim</a>
            </li>
              <div className="section"></div>
            {localStorage.getItem("currentUser") ? (
              <a href="/profil">
                <div className="profile-div">
                  <div className="profile">
                    <span id="nav-name" className="nav-name" style={{color: "#000"}}>
                      <Skeleton 
                        width={100}
                        style={{borderRadius: "20px"}} />
                    </span>

                    <img id="nav-pp" src="/images/default.jpg" />
                  </div>
                </div>
              </a>
            ) : (
              <div style={{display: "flex", padding: "15px 20px"}}>
                <a href="/giris" style={{color: "var(--button-background)"}}>Giriş yap</a>
                  <div style={{margin: "0 5px", userSelect: "none"}}>veya</div>
                <a href="/kaydol" style={{color: "var(--button-background)"}}>Kaydol</a>
              </div>
            )}
          </ul>

          <style>{`
            a {
              color: #00a0d9;
              text-decoration: none;
              font-size: 16px;
              padding: 0px;
            }
  
            .overlay {
              position: fixed;
              width: 100%;
              height: 100%;
              z-index: 99;
              background: #000;
              opacity: 0.4;
              display: none;
            }
  
            nav {
              top: 0%;
              width: 100%;
              position: fixed;
              z-index: 2;
            }

            .nav-image-container {
              padding: 10px 20px;
              display: flex;
            }
  
            .nav-image {
              width: 32px;
              height: 32px;
              object-fit: contain;
            }
  
            nav ul {
              width: 100%;
              color: #000;
              background: #fff;
              margin:auto;
              padding: 0;
              list-style-type: none;
              border-bottom: 5px solid #00a0d9;
              border-bottom: none;
              box-shadow: 0 3px 16px rgb(0 0 0 / 12%);
              display: flex;
              align-items: center;
              justify-content: center;
              transition: 0.4s;
            }
  
            nav ul li {
              color: #000;
              padding: 15px 0;
              display: inline-block;
              position: relative;
              transition: 0.1s;
              cursor: pointer;
            }

            nav ul li:hover {
              background: rgb(0 0 0 / 12%);
            }
            
            nav ul li a {
              color: #000;
              padding: 15px 20px;
            }

            nav .section {
              width: 1px;
              height: 24px;
              background: rgb(0 0 0 / 10%);
            }

            nav .profile-div {
              padding: 10px 20px;
              display: flex;
            }

            nav .profile-div:hover {
              background: rgb(0 0 0 / 12%);
            }

            nav .profile {
              display: flex;
              align-items: center;
              border-radius: 20px;
            }

            nav .profile img {
              width: 32px;
              height: 32px;
              margin-left: 12px;
              border-radius: 100%;
              box-shadow: 0 0 0px 2px var(--button-background);
            }
            
            .showMenu {
              display: none;
              width: 30px;
              text-align: center;
              top: 8px;
              left: 10px;
              color: white;
              font-size: 28px;
              position: fixed;
              padding: 10px 15px 10px 15px;
              background-color: rgb(0 211 128 / 80%);
              border-radius: 5px;
              z-index: 101;
              cursor: pointer;
              backdrop-filter: blur(2px);
              box-shadow: 0 2px 4px #000;
            }
            
            @media (max-width: 900px) {
              .showMenu {
                display: block;
              }

              nav {
                width: 50%;
                float: right;
                height: 0;
                z-index:100;
              }

              .nav-image-container {
                top: 15px;
                right: 15px;
                position: absolute;
                padding: 0;
                display: none;
              }

              .nav-image {
                width: 50px;
                height: 50px;
              }
  
              nav ul {
                width: 100%;
                height: 100vh;
                background: #fff;
                left: -120%;
                border: 0;
                padding: 0;
                padding-top: 80px;
                position: fixed;
                display: block;
                transition: 0.2s cubic-bezier(0.65, 0.05, 0.36, 1);
              }
            
              nav ul li {
                color: #000;
                display: block;
                text-align: center;
                padding: 15px 0px;
                margin: 0;
                box-shadow: none;
                border-top: 1px solid rgb(0 0 0 / 10%);
              }
            
              nav ul li:hover {
                box-shadow: 0 0 0;
              }
  
              nav ul li a {
                color: #000;
                font-size: 20px;
                padding: 15px 55px;
              }

              nav .section {
                width: 90%;
                height: 1px;
                background: rgb(0 0 0 / 10%);
                margin: auto;
              }

              nav .profile-div {
                position: absolute;
                top: 12px;
                right: 0px;
                border-radius: 40px 0 0 40px;
              }

              nav .name {
                font-size: 18px;
              }

              nav .profile img {
                width: 36px;
                height: 36px;
              }
            }
          `}</style>
        </nav>
      </div>
    )
  }
}

export default Nav;