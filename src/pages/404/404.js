import React from 'react';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';
import './404.css';

class NotFoundPage extends React.Component {
  render() {return (
    <div className="NotFoundPage">
      <Nav/>

      <div className="x404-div">
        <img src="/images/favicon.png" style={{width: "50px", filter: "grayscale(1)"}} />

        <p className="title">Böyle bir sayfa yok gibi görünüyor...</p>

        <div className="back-div">
          <a href="/" className="back-link">Ana Sayfa</a>'ya dönebilirsin.
        </div> 
      </div>
      
      <Footer />
    </div>
  )}
}

export default NotFoundPage;