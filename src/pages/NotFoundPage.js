import React from 'react';
import Footer from './../components/Footer';

class NotFoundPage extends React.Component {
  render() {
    return (
       <div>
          <div className="div">
            <img src="/Sad-Web.png" width="300px" draggable="false"/>
            <p className="text1">Böyle bir sayfa yok gibi görünüyor...</p>
            <div className="des">
              <a href="/" className="des-link">Ana Sayfa</a>'ya dönebilirsin.
            </div> 
             <br/><br/>
            <a className="ul-header">Bu hata genel olarak şunlardan kaynaklanır:
              <li className="li">- Var olmayan bir link, veya yanlış link</li>
              <li className="li">- Site sahibi tarafından kaldırılmış içerik</li>
            </a>
          </div>
          
          <Footer/>

          <style>{`
            c {
              color: #fff;
              font-size: 12px;
              margin: 0;
            }

            .des {
              color: #000;
              font-size: 20px;
            }

            .des-link {
              font-size: 20px;
              color: #00a0d9;
            }

            .ul-header {
              margin: 10px 0 0 0;
              font-size: 15px;
              color: #000;
              display: none;
            }

            .li {
              list-style-type: none;
              text-align: center;
            }

            .div {
              max-width: 700px;
              top: 50%;
              left: 50%;
              margin: 200px auto;
              position: inherit;
              text-align: center;
            }

            .text1 {
              font-size: 47px;
              margin-bottom: 20px;
              color: #000;
            }

            footer {
              width: 100%;
              bottom: -100px;
              position: absolute;
            }

            @media (max-width: 1200px) {
              footer {
                position: inherit;
                margin: 0;
              }
            }
          `}</style>
       </div>
    )
   
}
}

export default NotFoundPage;