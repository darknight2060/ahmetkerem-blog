import React from 'react';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false
    }

    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu () {
    if (this.state.opened == false) {
      this.setState({ opened: true })

      document.getElementById("nav-ul").style.left = "0";
      document.getElementById("showMenu").style.backgroundColor = "#000";
    } else {
      this.setState({ opened: false })

      document.getElementById("nav-ul").style.left = "-120%";
      document.getElementById("showMenu").style.backgroundColor = "#adadad96";
    }
  }

  render() {
    return (
      <div>
        <div className="overlay"></div>
        <label className="showMenu" id="showMenu" onClick={this.toggleMenu}>☰</label>
        <nav className="nav" id="nav">
          <ul id="nav-ul">
            <a href="/" className="nav-image-container">
              <img src="/images/favicon.png" className="nav-image"/>
            </a>

            <li>
              <a href="/">Ana Sayfa</a>
            </li>

            <li>
              <a href="/hakkinda">Hakkında</a>
            </li>

            <li>
              <a href="/iletisim">İletişim</a>
            </li>
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
              padding: 10px;
              display: flex;
            }
  
            .nav-image {
              width: 32px;
              height: 32px;
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
              box-shadow: 1px 0 1px rgb(0 0 0 / 10%);
              transition: 0.2s;
              cursor: pointer;
            }

            nav ul li:hover {
              background: rgb(0 0 0 / 12%);
            }
            
            nav ul li a {
              color: #000;
              padding: 15px 20px;
              transition: 0.2s;
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
              background-color: #adadad96;
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
  
              nav ul {
                width: 100%;
                height: 100vh;
                background: #fff;
                left: -120%;
                border: 0;
                padding: 0;
                padding-top: 70px;
                position: fixed;
                display: block;
                transition: 0.2s cubic-bezier(0.65, 0.05, 0.36, 1);
              }
            
              nav ul li {
                color: #000;
                display: block;
                text-align:center;
                padding: 15px 0px;
                margin: 0;
              }
            
              nav ul li:hover {
                box-shadow: 0 0 0;
              }
  
              nav ul li a {
                color: #000;
                font-size: 20px;
                padding: 15px 55px;
              }

              .nav-image-container {
                display: none;
              }
            }
          `}</style>
        </nav>
      </div>
    )
  }
}

export default Nav;