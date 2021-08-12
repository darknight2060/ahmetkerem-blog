import React from 'react';
import { database } from '../services/firebase';
import Skeleton from "react-loading-skeleton";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      opened: false
    }

    this.toggleMenu = this.toggleMenu.bind(this);
  }

  componentDidMount() {
    database.ref("users").on("child_added", snap => {
      if (snap.key == localStorage.getItem("currentUser")) {
        this.setState({ user: snap.val() });
      }
    })
  }

  toggleMenu () {
    if (this.state.opened == false) {
      this.setState({ opened: true })

      document.getElementById("nav-ul").style.left = "0";
      document.getElementById("showMenu").innerHTML = "&#x2715;";
    } else {
      this.setState({ opened: false })

      document.getElementById("nav-ul").style.left = "-120%";
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
              <img src="/images/favicon.png" className="nav-image" />
            </a>
            <div className="section" />
            <li>
              <a href="/">Ana Sayfa</a>
            </li>
            <div className="section" />
            <li>
              <a href="/hakkinda">Hakkında</a>
            </li>
            <div className="section" />
            <li>
              <a href="/iletisim">İletişim</a>
            </li>
              <div className="section" />
            {localStorage.getItem("currentUser") ? (
              <a href="/profil">
                <div className="profile-div">
                  <div className="profile">
                    <span id="nav-name" className="nav-name" style={{color: "#000"}}>
                      {this.state.user.userName ?
                        this.state.user.userName
                      :
                        <Skeleton 
                          style={{width: "100px", borderRadius: "20px"}} 
                        />
                      }
                    </span>

                    {this.state.user.userName ?
                      <img
                        id="nav-pp"
                        src={this.state.user.userImage || "/images/example.jpg"}
                      />
                    :
                      <Skeleton style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "100%",
                        marginLeft: "12px",
                        boxShadow: "0 0 0px 2px var(--button-background)"}} 
                      />
                    }
                  </div>
                </div>
              </a>
            ) : (
              <div className="loginOrRegister">
                <a href="/giris">Giriş yap</a>
                  <div className="or">veya</div>
                <a href="/kaydol">Kaydol</a>
              </div>
            )}
          </ul>

          <style>{`
            a {
              color: var(--button-background);
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
              user-select: none;
            }
  
            nav ul li {
              color: #000;
              padding: 17px 0;
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
              padding: 17px 20px;
            }

            nav .section {
              width: 1px;
              height: 24px;
              background: rgb(0 0 0 / 10%);
            }

            nav .profile-div {
              padding: 12px 20px;
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
              object-fit: cover;
            }

            nav .loginOrRegister {
              padding: 15px 20px;
              display: flex;
            }

            nav .loginOrRegister a {
              transition: .1s;
            }

            nav .loginOrRegister a:hover {
              color: var(--button-hover-background);
            }

            nav .loginOrRegister .or {
              margin: 0 5px;
              user-select: none;
            }
            
            .showMenu {
              display: none;
              width: 30px;
              height: 46px;
              background: #fff;
              text-align: center;
              font-size: 32px;
              line-height: 48px;
              position: fixed;
              padding: 9.5px 25px;
              z-index: 101;
              cursor: pointer;
            }
            
            @media (max-width: 900px) {
              .showMenu {
                display: block;
              }

              nav {
                width: 100%;
                height: 65px;
                background: #fff;
                float: right;
                z-index: 100;
                box-shadow: 0 3px 16px rgb(0 0 0 / 12%);
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
                margin: auto;
              }

              nav .profile-div {
                position: absolute;
                top: 2.5px;
                right: 0px;
                border-radius: 40px 0 0 40px;
              }

              nav .profile-div:hover {
                background: initial;
              }

              nav .name {
                font-size: 18px;
              }

              nav .profile img {
                width: 36px;
                height: 36px;
              }

              .loginOrRegister {
                position: absolute;
                top: 15px;
                right: 0px;
              }
            }
          `}</style>
        </nav>
      </div>
    )
  }
}

export default Nav;