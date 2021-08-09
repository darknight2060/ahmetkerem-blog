import React from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

class NotFoundPage extends React.Component {
  render() {
    return (
       <div>
          <Nav/>

          <div className="div">
            <img src="/images/favicon.png" width="50px" />

            <p className="title">Böyle bir sayfa yok gibi görünüyor...</p>

            <div className="des">
              <a href="/" className="des-link">Ana Sayfa</a>'ya dönebilirsin.
            </div> 
          </div>
          
          <Footer/>

          <style>{`
            .div {
              max-width: 700px;
              top: 50%;
              left: 50%;
              margin: 200px auto;
              position: inherit;
              text-align: center;
            }

            .div .title {
              font-size: 47px;
              margin: 20px;
            }

            .des {
              font-size: 20px;
            }

            .des-link {
              color: var(--button-background);
              font-size: 20px;
            }

            .des-link:hover {
              color: var(--button-hover-background);
            }

            footer {
              width: 100%;
              bottom: -100px;
              padding: 80px 0;
              position: absolute;
            }

            @media (max-width: 1200px) {
              .div {
                margin: 100px auto;
              }
              
              footer {
                margin: 0;
              }
            }
          `}</style>
       </div>
    )
   
}
}

export default NotFoundPage;