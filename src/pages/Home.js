import React, { Component } from 'react';
import Nav from './../components/Nav';
import Footer from './../components/Footer';
import '../css/App.css';
import '../css/Home.css';

class Home extends React.Component {
  render() {
    return (
      <div>
        <Nav/>

        <div className="main">

          <div className="main2">
            <div className="posts">
              <a href="#">
                <div className="post">
                  <img className="image" src="/images/example.jpg"/>
                  
                  <div style={{padding: "0 16px"}}>
                    <h2 className="title">Lorem Ipsum</h2>
                    <div className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc aliquet bibendum enim facilisis gravida neque. Purus non enim praesent elementum. Laoreet non curabitur gravida arcu ac. Erat velit scelerisque in dictum non consectetur a erat nam. Sed enim ut sem viverra aliquet eget sit. Lorem ipsum dolor sit amet consectetur adipiscing elit. Arcu ac tortor dignissim convallis aenean et tortor at risus. Ipsum dolor sit amet consectetur adipiscing elit. Nascetur ridiculus mus mauris vitae ultricies leo integer malesuada.</div>
        
                    <div className="date">01/01/2021</div>
                  </div>
                </div>
              </a>
    
              <a href="#">
                <div className="post">
                  <img className="image" src="/images/example.jpg"/>
                  
                  <div style={{padding: "0 16px"}}>
                    <h2 className="title">Lorem Ipsum</h2>
                    <div className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc aliquet bibendum enim facilisis gravida neque. Purus non enim praesent elementum. Laoreet non curabitur gravida arcu ac. Erat velit scelerisque in dictum non consectetur a erat nam. Sed enim ut sem viverra aliquet eget sit. Lorem ipsum dolor sit amet consectetur adipiscing elit. Arcu ac tortor dignissim convallis aenean et tortor at risus. Ipsum dolor sit amet consectetur adipiscing elit. Nascetur ridiculus mus mauris vitae ultricies leo integer malesuada.</div>
        
                    <div className="date">01/01/2021</div>
                  </div>
                </div>
              </a>
  
              <a href="#">
                <div className="post">
                  <img className="image" src="/images/example.jpg"/>
                  
                  <div style={{padding: "0 16px"}}>
                    <h2 className="title">Lorem Ipsum</h2>
                    <div className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc aliquet bibendum enim facilisis gravida neque. Purus non enim praesent elementum. Laoreet non curabitur gravida arcu ac. Erat velit scelerisque in dictum non consectetur a erat nam. Sed enim ut sem viverra aliquet eget sit. Lorem ipsum dolor sit amet consectetur adipiscing elit. Arcu ac tortor dignissim convallis aenean et tortor at risus. Ipsum dolor sit amet consectetur adipiscing elit. Nascetur ridiculus mus mauris vitae ultricies leo integer malesuada.</div>
        
                    <div className="date">01/01/2021</div>
                  </div>
                </div>
              </a>
  
              <a href="#">
                <div className="post">
                  <img className="image" src="/images/example.jpg"/>
                  
                  <div style={{padding: "0 16px"}}>
                    <h2 className="title">Lorem Ipsum</h2>
                    <div className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc aliquet bibendum enim facilisis gravida neque. Purus non enim praesent elementum. Laoreet non curabitur gravida arcu ac. Erat velit scelerisque in dictum non consectetur a erat nam. Sed enim ut sem viverra aliquet eget sit. Lorem ipsum dolor sit amet consectetur adipiscing elit. Arcu ac tortor dignissim convallis aenean et tortor at risus. Ipsum dolor sit amet consectetur adipiscing elit. Nascetur ridiculus mus mauris vitae ultricies leo integer malesuada.</div>
        
                    <div className="date">01/01/2021</div>
                  </div>
                </div>
              </a>
            </div>

            <div className="popular-post-container">
              <a href="#">
                <div className="popular-post">
                  <img className="image" src="/images/example.jpg"/>
                  
                  <div style={{padding: "0 16px"}}>
                    <h2 className="title">Lorem Ipsum</h2>
                    <div className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc aliquet bibendum enim facilisis gravida neque. Purus non enim praesent elementum. Laoreet non curabitur gravida arcu ac. Erat velit scelerisque in dictum non consectetur a erat nam. Sed enim ut sem viverra aliquet eget sit. Lorem ipsum dolor sit amet consectetur adipiscing elit. Arcu ac tortor dignissim convallis aenean et tortor at risus. Ipsum dolor sit amet consectetur adipiscing elit. Nascetur ridiculus mus mauris vitae ultricies leo integer malesuada.</div>
          
                    <div className="date">01/01/2021</div>
                  </div>
                </div>
              </a>
            </div>
          </div>

        </div>

      </div>
    )
  }
};

export default Home;