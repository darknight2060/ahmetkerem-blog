import React from 'react';
import { database } from '../../services/firebase';
import Skeleton from "react-loading-skeleton";
import './Nav.css';

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
            <li>
              <a href="/panel">Panel</a>
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
                        src={this.state.user.userImage || "/images/default-user.png"}
                      />
                    :
                      <Skeleton style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "100%",
                        marginLeft: "12px",
                        boxShadow: "0 0 0px 2px var(--button-background)",
                        display: "block"}} 
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
        </nav>
      </div>
    )
  }
}

export default Nav;