import React, { Component } from "react";
import { database } from '../services/firebase';
import Skeleton from "react-loading-skeleton";
import Nav from "../components/Nav";
import Footer from '../components/Footer';
import Comments from '../components/Comments';

class PostID extends Component {
  constructor(props) {
    super(props);
    this.database = database.ref(`posts/${window.location.pathname.slice(6)}`);
    this.state = {
      post: []
    }
  }

  componentDidMount() {
    this.database.get().then(snap => {
      if (!snap.exists()) return;

      this.setState({post: snap.val()})

      document.getElementById("card-content").innerText = snap.val().content;
    })
  }

  render() {
    return (
      <div className="container">
        <Nav/>

        <div className='main'>
          <div className="card">
            {this.state.post.title ? 
              <img src={this.state.post.image||"/default.jpg"} alt="Blog Fotoğrafı" className='card-image'/>
            : 
              <Skeleton className="card-image-skeleton" />
            }

            {this.state.post.title ?
              <h1 className="card-title">{this.state.post.title}</h1>
            :
              <Skeleton className="card-title-skeleton" />
            }

            <div id="card-content" className="card-content"></div>

            <div className="card-date">{this.state.post.date}</div>

            <Comments/>
          </div>
        </div>
  
        <Footer/>
        
        <style>{`
          html {
            background: #fff;
          }

          .container {
            padding: 100px 0 0;
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
            border-radius: 10px;
            background: #fff;
            box-shadow: 0px 10px 16px rgb(0 0 0 / 24%);
            width: 100%;
            text-align: center;
          }

          .card-image-skeleton {
            width: 100%;
            height: 300px;
            display: block;
          }
    
          .card-image {
            width: 100%;
            height: 300px;
            border-radius: 10px 10px 0 0;
            object-fit: cover;
          }

          .card-title-skeleton {
            width: 550px;
            height: 70px;
            border-radius: 100px;
            margin: 30px 0;
          }
    
          .card-title {
            margin: 30px auto 35px;
            padding: 0 30px;
            font-size: 48px;
            font-weight: normal;
          }

          .card-content {
            padding: 0 30px;
            text-align: left;
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
              border-radius: 0;
            }

            .card-image-skeleton {
              height: 250px;
            }

            .card-image {
              height: 250px;
              border-radius: 0;
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

export default PostID;