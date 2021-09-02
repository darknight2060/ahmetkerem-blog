import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { database } from '../../services/firebase';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.database = database.ref().child(`users`);
    this.commentAuthor = props.commentAuthor;
    this.commentContent = props.commentContent;
    this.commentDate = props.commentDate;
    this.commentId = props.commentId;
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    const previousUsers = this.state.users;

    this.database.on('child_added', snap => {
      previousUsers.push({
        id: snap.key,
        name: snap.val().userName,
        image: snap.val().userImage
      })
      
      this.setState({
        users: previousUsers,
      })
    })

    this.database.on('child_removed', snap => {
      for (var i = 0; i < previousUsers.length; i++) {
        if (previousUsers[i].id === snap.key) {
          previousUsers.splice(i, 1);
        }
      }

      this.setState({
        users: previousUsers,
      })
    })

    document.getElementById("content-"+this.commentId).innerText = this.props.commentContent;
  }

  updateName(id) {
    if (id == "Misafir") return "Misafir";

    var data = "";
    this.state.users.forEach(p => {
      if (p.id !== id) return;
      else {
        database.ref(`users/${id}`).on('value', (snapshot) => {
          data = snapshot.val().userName;
        });
      }
    })

    return data;
  }

  updateImage(id) {
    if (id == "Misafir") return "/images/default-user.png";

    var data = "";
    this.state.users.forEach(p => {
      if (p.id !== id) return;
      else {
        database.ref(`users/${id}`).on('value', (snapshot) => {
          data = snapshot.val().userImage || "/images/default-user.png";
        });
      }
    })

    return data;
  }

  render() {return (
    <div className="comment-card">
      <img
        src={this.updateImage(this.props.commentAuthor)}
        className="comment-image"
      />

      <div>
        <div style={{padding: "10px 0 0", display: "flex", alignItems: "center"}}>
          <div className="comment-author">{this.updateName(this.props.commentAuthor)}</div>
          <div className="comment-date">{this.props.commentDate}</div>
        </div>

        <p className="comment-content" id={"content-"+this.commentId}></p>
      </div>

      <style>{`
        .comment-card {
          border-radius: 10px;
          margin: 10px 0px;
          padding: 0px;
          background: #ffffff;
          border: 2px solid #cccccc6e;
          width: 100%;
          max-width: 100%;
          height: auto;
          display: flex;
        }
    
        .comment-image {
          margin: 10px;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          object-fit: cover;
        }
    
        .comment-author {
          font-size: 13px;
          font-weight: bold;
          text-align: left;
        }

        .comment-content {
          color: #000;
          height: auto;
          text-align: left;
          font-size: 14px;
          font-weight: normal;
          margin: 2px 0 0;
          padding-right: 30px;
          line-height: 22px;
        }

        .comments {
          width: 100%;
          color: #000;
          text-align: left;
          margin: 15px 0;
          display: block;
        }
    
        .comment-date {
          text-align: left;
          font-size: 13px;
          color: #606060;
          margin: 0 0 0 10px;
          user-select: none;
        }
    
        @media (max-width: 623px) {
          .comment-card {
            width: 100%;
            height: auto;
            margin: 18px 0;
            padding-bottom: 10px;
            overflow: hidden;
          }
        }
      `}</style>
    </div>
  )}
};

Comment.propTypes = {
  commentAuthor: PropTypes.string,
  commentContent: PropTypes.string,
  commentDate: PropTypes.string,
  commentId: PropTypes.string,
};

export default Comment;