import React, { Component } from "react";
import Nav from "../components/Nav";
import Footer from '../components/Footer';

class About extends Component {
  render() {
    return (
      <div className="container">
        <Nav/>

        <div className='main'>
          <div className="card">
            <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/49c16a38805735.57701dcdd452c.gif" alt="Yazı Fotoğrafı" className='card-image' draggable="false"/>

            <h1 className="card-title"></h1>

            <div className="card-content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque sit amet porttitor eget. Neque viverra justo nec ultrices dui sapien. Lorem mollis aliquam ut porttitor leo a diam. Elit ullamcorper dignissim cras tincidunt. Felis imperdiet proin fermentum leo vel orci porta non pulvinar. Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci. Pharetra convallis posuere morbi leo. Volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque in. Sed velit dignissim sodales ut eu sem integer. Ipsum faucibus vitae aliquet nec ullamcorper sit. Nisl condimentum id venenatis a condimentum vitae sapien. Vel risus commodo viverra maecenas accumsan lacus vel. Arcu vitae elementum curabitur vitae nunc sed velit dignissim sodales.

Id aliquet risus feugiat in ante metus dictum at. Sed turpis tincidunt id aliquet risus feugiat in. Tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras. Faucibus in ornare quam viverra orci. Tellus molestie nunc non blandit massa enim nec dui. Faucibus purus in massa tempor nec feugiat nisl. Nisl nisi scelerisque eu ultrices. Turpis cursus in hac habitasse platea dictumst. Sit amet risus nullam eget felis eget nunc. Placerat in egestas erat imperdiet sed euismod nisi porta. Tortor consequat id porta nibh. Auctor urna nunc id cursus metus aliquam. Orci sagittis eu volutpat odio facilisis mauris sit amet massa. Amet volutpat consequat mauris nunc congue nisi vitae.
            </div>
          </div>
        </div>
  
        <Footer/>
        
        <style>{`
          html {
            background: #fff;
          }

          .container {
            padding: 120px 0 0;
            background: #eeeeef;
          }

          .main {
            max-width: 700px;
            width: 100%;
            margin: 0 auto;
            padding: 0;
          }
    
          .card {
            color: #000;
            padding: 30px 0 35px;
            border-radius: 10px;
            background: #fff;
            box-shadow: 0px 10px 16px rgb(0 0 0 / 24%);
            width: 100%;
            text-align: center;
          }
    
          .card-image {
            width: 200px;
            height: 200px;
            padding: 0px 20px;
            border-radius: 100%;
            object-fit: cover;
            float: right;
          }
    
          .card-title {
            margin: 30px auto 35px;
            text-align: center;
            font-size: 48px;
            font-weight: normal;
            display: none;
          }

          .card-content {
            min-height: 200px;
            padding: 0 30px;
            text-align: justify;
          }
    
          .card-date {
            padding: 30px;
            text-align: right;
          }
    
          @media (max-width: 700px) {
            .container {
              padding: 0;
            }

            .main {
              width: 100%;
            }
    
            .card {
              margin: 0 auto;
              padding: 70px 0 35px;
              border-radius: 0;
              box-shadow: 0px 10px 16px rgb(0 0 0 / 94%);
            }

            .card-image {
              float: unset;
            }

            .card-content {
              margin-top: 25px;
            }

            footer {
              margin: 0;
            }
          }
        `}</style>
      </div>
    )
  }
};

export default About;