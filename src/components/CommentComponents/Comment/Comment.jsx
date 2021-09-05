import React, { Component } from 'react';
import { database } from '../../../services/firebase';
import './Comment.css';

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
    </div>
  )}
};

export default Comment;