import React, {Component} from 'react';
import { database, auth } from '../services/firebase';
import Skeleton from "react-loading-skeleton";

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
    if (this.state.newCommentContent == "") return;
    else {
      var date = new Date;

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

  render() {return (
    <div className="div">
      <h4 className="comments-title" style={{userSelect: "none"}}>Yorumlar</h4>

      <div className="comment-card-edit">
        {this.state.user.userName ?
          <img
            src={this.state.user.userImage || "/images/example.jpg"}
            className="comment-image"
            id="commentform-image"
            draggable="false"
          />
        :
          <Skeleton style={{
            width: "32px",
            height: "32px",
            margin: "10px",
            borderRadius: "100%"}} 
          />
        }

        <div style={{width: "90%"}}>          
          <div className="commentform-name" id="commentform-name">
            {this.state.user.userName ?
              this.state.user.userName
            :
            <Skeleton width={100} style={{borderRadius: "20px"}} />
            }
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
    
        .commentform-name {
          font-size: 13px;
          font-weight: bold;
          margin-top: 10px;
          text-align: left;
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
  )}
}

export default CommentForm;