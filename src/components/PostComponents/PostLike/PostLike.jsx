import React, { Component } from "react";
import { database, auth } from '../../../services/firebase';
import LoginAlert from "../LoginAlert/LoginAlert";
import './PostLike.css';

class PostLike extends Component {
  constructor(props) {
    super(props);
    this.postID = window.location.pathname.slice(6);
    this.database = database.ref(`posts/${this.postID}/likes`);
    this.state = {
      liked: false,
      likeCount: 0
    }

    this.like = this.like.bind(this);
  }

  componentDidMount() {
    this.database.on("child_added", snap => {
      this.setState({ likeCount: this.state.likeCount + 1 });

      if (snap.key == localStorage.getItem("currentUser")) {
        this.setState({ liked: true })
      }
    })

    this.database.on("child_removed", snap => {
      this.setState({ likeCount: this.state.likeCount - 1 });

      if (snap.key == localStorage.getItem("currentUser")) {
        this.setState({ liked: false })
      }
    })
  }

  like() {
    if (!auth.currentUser) {
      document.getElementById("alertOverlay").style.visibility = "visible";
      document.getElementById("alertOverlay").style.opacity = ".6";
  
      document.getElementById("alert").style.visibility = "visible";
      document.getElementById("alert").style.opacity = "1";
      return document.getElementById("alert").style.transform = "scale(1)";
    }

    if (this.state.liked == true) {
      this.database.child(localStorage.getItem("currentUser")).remove();
    } else {
      this.database.child(localStorage.getItem("currentUser")).set({
        liked: true
      })

      database.ref(`statistics/notifications`).push().set({
        member: localStorage.getItem("currentUser") || "Misafir",
        type: "like",
        date: Date.now()
      })
    }
  }

  render() {return (
    <div className="likeContainer">
      <LoginAlert />

      <div className="tooltip">

        <div style={{display: "flex", alignItems: "center"}}>
          <a className="likeCount">
            {this.state.likeCount}
          </a>

          <div className="likeImageContainer">
            <img className="likeImage" 
              src={this.state.liked == true ? "/images/liked.png" : "/images/like.png"}
              onClick={this.like}
            />

            <span className="tooltiptext">
              {this.state.liked == true ? "Beğeniyi Kaldır" : "Beğen"}
            </span>
          </div>
        </div>

      </div>
    </div>
  )}
};

export default PostLike;