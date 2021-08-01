import React from 'react';

class Nav extends React.Component {
  toggleMenu () {

  }

  render() {
    return (
      <div>
        <div className="overlay"></div>
        <label className='showMenu' htmlFor='hiddenInput' onClick={this.toggleMenu}>☰</label>
        <nav className='nav'>
          <input id='hiddenInput' type='checkbox' value='0'/>

          <ul>
            <a href="/" style={{padding: "10px", display: "flex"}}>
              <img src="/images/favicon.png" className="nav-img"/>
            </a>

            <li>
              <a href="/">Ana Sayfa</a>
            </li>

            <li>
              <a href="/blog">İletişim</a>
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
              display: flex;
              align-items: center;
            }
  
            .nav-img {
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
  
            nav ul.scrolled {
              background: #2c2f33;
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
            
            #hiddenInput{
              display: none;
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
            }
            
            @media (max-width: 900px) {
              .showMenu {
                display: block;
              }
  
              nav ul {
                transition: 0.4s;
                position: fixed;
                left: 120%;
                background: #2c2f33;
              }
              
              nav {
                width: 50%;
                float: right;
                left: 25%;
                height: 0;
                z-index:100;
              }
  
              nav ul {
                width: 75%;
                height: 100vh;
                border: 0;
                padding: 0;
              }
              
              #hiddenInput:checked ~ nav ul, div.overlay {
                left: 25%;
              }
  
              nav ul {
                background: #2c2f33;
              }
            
              nav ul li {
                color: white;
                top: 80px;
                display: block;
                text-align:center;
                padding: 15px 0px;
                margin: 0;
                border-bottom:1px solid rgba(1,1,1,1,.1);
              }
            
              nav ul li:hover {
                box-shadow:0 0 0;
              }
  
              nav ul li a {
                color: #fff;
                padding: 15px 55px;
              }
            }
          `}</style>
        </nav>
      </div>
    )
  }
}

export default Nav;