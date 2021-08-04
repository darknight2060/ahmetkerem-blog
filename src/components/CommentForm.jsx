import React, {Component} from 'react';
import { database, auth } from '../services/firebase';
import Skeleton from "react-loading-skeleton";

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.database = database.ref("users");
        this.state = {
          newCommentContent: ""
        }
        
        this.shareComment = this.shareComment.bind(this);
    }

    componentDidMount() {
      auth.onAuthStateChanged(user => {
        if (auth.currentUser !== null) {
          database.ref("users/" + user.uid).get().then(snap => {
            if (snap.val().userImage) document.getElementById("commentform-image").src = snap.val().userImage;
            document.getElementById("commentform-name").innerText = snap.val().userName;
          })
        } else document.getElementById("commentform-name").innerText = "Misafir";
      })
    }

    shareComment() {
      if (this.state.newCommentContent == "") return;
      else {
        var date = new Date;

        database.ref(`posts/${window.location.pathname.slice(6)}/comments`).push().set({
          commentAuthor: auth.currentUser !== null ? auth.currentUser.uid : "Misafir",
          commentContent: this.state.newCommentContent,
          commentDate: date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear()
        })
      }

      this.setState({
        newCommentContent: ""
      });
    }

    render() {
        return (
            <div className="div">
            <h4 className="comments-title" style={{userSelect: "none"}}>Yorumlar</h4>

            <div className="comment-card-edit">
              <img src={"/images/example.jpg"} className="comment-image" id="commentform-image" />

              <div style={{width: "100%"}}>
                <div className="başlık" id="commentform-name">
                  <Skeleton width={100} style={{borderRadius: "20px"}}/>  
                </div>

                <textarea 
                  placeholder="Yorum Metni" 
                  className="commentInput"
                  value={this.state.newCommentContent}
                  onChange={event => this.setState({newCommentContent: event.target.value})}
                />

                <button className="shareButton" onClick={this.shareComment}>
                  Yayınla
                </button>
              </div>
            </div>
              <style>{`
                .div {
                  padding: 5px 0;
                  background: none;
                  width: 100%;
                  margin: auto;
                  border-top: 2px solid #fff;
                  user-select: none;
                }

                .commentInput {
                  width: calc(100% - 30px);
                  height: 40px;
                  border: 0;
                  margin-top: 5px;
                  padding: 10px;
                  border-radius: 5px;
                  background: rgba(0, 0, 0, .04);
                  resize: none;
                  outline: none;
                  text-align: left;
                  font-size: 14px;
                  display: block;
                }

                .shareButton {
                  background: var(--button-background);
                  border: none;
                  border-radius: 5px;
                  margin: 10px;
                  padding: 10px 15px;
                  color: #fff;
                  display: flex;
                  outline: none;
                  float: right;
                  transition: .1s;
                }

                .shareButton:hover {
                  background: var(--button-hover-background);
                  cursor: pointer;
                }

                .comment-card-edit {
                  border-radius: 10px;
                  margin: 10px 0px;
                  padding-bottom: 5px;
                  background: #ffffff;
                  border: 2px solid #cccccc6e;
                  display: flex;
                }
        
                .comment-card-edit img {
                  position: relative;
                  margin: 10px;
                  border-radius: 50%;
                  width: 40px;
                  height: 40px;
                  object-fit: cover;
                }
        
                .başlık {
                  font-size: 13px;
                  margin-top: 10px;
                  text-align: left;
                }
  
                .comment-content {
                  color: #000;
                  height: auto;
                  text-align: left;
                  font-size: 14px;
                  font-weight: normal;
                  padding-right: 5px;
                  margin: 5px 0 0 0;
                }
  
                .comments {
                  width: 100%;
                  color: #000;
                  text-align: left;
                  margin-top: 15px;
                  display: block;
                }
        
                .comment-date {
                  text-align: left;
                  font-size: 13px;
                  color: #606060;
                  margin: 10px 0 0 10px;
                }

                @media (max-width: 623px) {
                  .comment-card-edit {
                    width: 100%;
                    height: auto;
                    margin: 0;
                    box-shadow: 0 0;
                  }
                }
              `}</style>
            </div>
        )
    }
}

export default CommentForm;