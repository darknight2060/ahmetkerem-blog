import React, { Component } from "react";
import { database } from '../../services/firebase';
import Skeleton from "react-loading-skeleton";
import Markdown from "react-markdown";
import ms from '../../services/ms';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';
import Like from "../../components/PostComponents/PostLike/PostLike";
import Comments from '../../components/CommentComponents/Comments/Comments';
import Share from '../../components/PostComponents/PostShare/PostShare';
import './PostID.css';

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
      <div className="PostID">
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
                <React.Fragment>
                  <img src="/images/time.png" className="viewImage" />
                  {ms(Date.now() - this.state.post.date || 0, {long: true}) + " önce"}
                </React.Fragment>
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

                <Share />
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
        `}</style>
      </div>
    )
  }
};

export default PostID;