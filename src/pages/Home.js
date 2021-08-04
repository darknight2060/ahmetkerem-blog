import React, { Component } from 'react';
import { database } from '../services/firebase';
import Nav from './../components/Nav';
import Footer from './../components/Footer';
import '../css/App.css';
import '../css/Home.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    const posts = this.state.posts;

    database.ref("posts").on("child_added", snap => {
      document.getElementById("loading").style.display = "none";

      posts.push({
        id: snap.key,
        image: snap.val().image,
        title: snap.val().title,
        content: snap.val().content,
        date: snap.val().date
      })

      this.setState({ posts: posts });
    })
  }

  render() {
    return (
      <div>
        <Nav/>

        <div className="main">

          <div className="main2">
            <div className="posts">
              {this.state.posts.length > 0 ? this.state.posts.map(post => {return (
                <a href={"/post/"+post.id}>
                  <div className="post">
                    <img className="image" src={post.image}/>
                    
                    <div style={{padding: "0 16px"}}>
                      <h2 className="title">{post.title}</h2>
                      <div className="description">{post.content}</div>
                
                      <div className="date">{post.date}</div>
                    </div>
                  </div>
                </a>
              )}) : <img id="loading" src="/images/favicon.png"/>}
            </div>

            <div className="popular-post-container" style={{display: "none"}}>
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

        <Footer />
      </div>
    )
  }
};

export default Home;