import React, { Component } from 'react';
import { database } from '../../../services/firebase';
import Skeleton from "react-loading-skeleton";
import './CommentForm.css';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.database = database.ref("users");
    this.state = {
      user: [],
      newCommentContent: ""
    }
    
    this.shareComment = this.shareComment.bind(this);
  }

  componentDidMount() {
    database.ref("users").on("child_added", snap => {
      if (snap.key == localStorage.getItem("currentUser")) {
        this.setState({ user: snap.val() });
      }
    })
  }

  shareComment() {
    if (this.state.newCommentContent.length < 1) return;
    else {
      var date = new Date;

      database.ref(`statistics/notifications`).push().set({
        member: localStorage.getItem("currentUser") || "Misafir",
        type: "comment",
        date: Date.now()
      })
      
      database.ref(`posts/${window.location.pathname.slice(6)}/comments`).push().set({
        commentAuthor: localStorage.getItem("currentUser") || "Misafir",
        commentContent: this.state.newCommentContent,
        commentDate: date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear()
      })
    }

    this.setState({
      newCommentContent: ""
    });
  }

  render() {
    
    if (document.getElementById("shareButton")) {
      if (this.state.newCommentContent.length < 1) document.getElementById("shareButton").disabled = true;
      else document.getElementById("shareButton").disabled = false;
    }  

  return (
    <div className="commentform-div">
      <h4 className="comments-title" style={{userSelect: "none"}}>Yorumlar</h4>

      <div className="comment-card-edit">
        {localStorage.getItem("currentUser") ?

          (this.state.user.userName ? 
            <img
              src={this.state.user.userImage || "/images/default-user.png"}
              className="comment-image"
              id="commentform-image"
            />
          :
            <Skeleton style={{
              width: "40px",
              height: "40px",
              margin: "10px",
              borderRadius: "100%"}} 
            />
          )

        :
          <img
            src="/images/default-user.png"
            className="comment-image"
            id="commentform-image"
          />
        }

        <div style={{width: "calc(100% - 60px)"}}>          
          <div className="commentform-name" id="commentform-name">
            {localStorage.getItem("currentUser") ?

              this.state.user.userName ?
                this.state.user.userName
              :
                <Skeleton width={100} style={{borderRadius: "20px"}} />

            :
              "Misafir"
            }
          </div>

          {localStorage.getItem("currentUser") ?
            this.state.user.userName ?
              <React.Fragment>
                <textarea 
                  placeholder="Yorum Metni" 
                  className="commentInput"
                  value={this.state.newCommentContent}
                  onChange={event => this.setState({newCommentContent: event.target.value})}
                />
      
                <button
                  className="shareButton"
                  onClick={this.shareComment}
                  id="shareButton"
                  disabled
                >
                  Paylaş
                </button>
              </React.Fragment>
            :
              ""
          :
            <React.Fragment>
              <textarea 
                placeholder="Yorum Metni" 
                className="commentInput"
                value={this.state.newCommentContent}
                onChange={event => this.setState({newCommentContent: event.target.value})}
              />
    
              <button
                className="shareButton"
                onClick={this.shareComment}
                id="shareButton"
                disabled
              >
                Paylaş
              </button>
            </React.Fragment>
          }
        </div>
      </div>
    </div>
  )}
}

export default CommentForm;