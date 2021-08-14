import React, { Component } from "react";
import { database } from '../services/firebase';
import Skeleton from "react-loading-skeleton";
import Markdown from "react-markdown";
import ms from '../services/ms';
import Nav from "../components/Nav";
import Footer from '../components/Footer';
import Like from "../components/Like";
import Comments from '../components/Comments';

class PostID extends Component {
  constructor(props) {
    super(props);
    this.postID = window.location.pathname.slice(6);
    this.state = {
      post: [],
      loaded: false
    }
  }

  componentDidMount() {
    database.ref("posts/" + this.postID).get().then(snap => {
      if (!snap.exists()) return window.location.href = "/404";
    })

    database.ref("posts").on("value", snap => {
      snap.forEach(s => {
        if (s.key == this.postID) {
          if (!localStorage.getItem("view_" + this.postID)) {
            localStorage.setItem("view_" + this.postID, true)

            database.ref(`posts/${this.postID}`).update({
              view: s.val().view + 1
            })
          }

          this.setState({ 
            post: s.val(),
            loaded: true
          });
        }
      })
    })
  }

  render() {
    return (
      <div className="container">
        <Nav />

        <div className='main'>
          <div className="card">
            {this.state.post.title ? 
              <img src={this.state.post.image||"/default.jpg"} alt="Yazı Fotoğrafı" className='card-image' />
            : 
              <Skeleton className="card-image-skeleton" />
            }

            {this.state.post.title ?
              <h1 className="card-title">{this.state.post.title}</h1>
            :
              <Skeleton className="card-title-skeleton" />
            }

            <div id="card-content" className="card-content">
              <Markdown>
                {this.state.post.content}
              </Markdown>
            </div>

            <div className="card-date">
              {this.state.post.date ? 
                ms(Date.now() - this.state.post.date || 0, {long: true}) + " önce"
              :
                ""
              }
            </div>

            {this.state.loaded == true ?
              <div style={{display: "flex"}}>
                <div className="viewContainer">
                  <a className="viewCount">{this.state.post.view}</a>
                  <img src="/images/view.png" className="viewImage" />
                </div>

                <Like />
              </div>
            :
              ""
            }

            <Comments />
          </div>
        </div>
  
        <Footer />
        
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
            box-shadow: 0px 10px 16px rgb(0 0 0 / 10%);
            width: 100%;
            text-align: center;
          }

          .card-image-skeleton {
            width: 100%;
            height: 300px;
            border-radius: 10px 10px 0 0;
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
            height: 66px;
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

          .card .viewContainer {
            padding: 0 10px 0 30px;
            display: flex;
            align-items: center;
            user-select: none;
          }

          .card .viewCount {
            color: #000;
            margin-right: 5px;
          }

          .card .viewImage {
            width: 22px;
            height: 22px;
            object-fit: contain;
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
              padding-top: 60px;
              border-radius: 0;
            }

            .card-image-skeleton {
              height: 250px;
              border-radius: 0;
            }

            .card-image {
              height: 250px;
              border-radius: 0;
            }

            .card-title-skeleton {
              width: calc(100% - 60px);
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