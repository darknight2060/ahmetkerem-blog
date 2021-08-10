import React, { Component } from "react";
import { database, auth } from '../services/firebase';
import LoginAlert from "./LoginAlert";

class Like extends Component {
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
             document.getElementById("alert").style.display = "block";
      return document.getElementById("alertOverlay").style.display = "block";
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

      <style>{`
        .likeContainer {
          width: auto;
          height: auto;
          text-align: left;
          background-size: cover;
        }
        
        .likeImageContainer {
          display: flex;
        }

        .likeImageContainer:hover .tooltiptext {
          visibility: visible;
          opacity: 1;
        }
  
        .likeImage {
          width: 22px;
          height: 22px;
          object-fit: contain;
          cursor: pointer;
        }
  
        .likeCount {
          color: #000;
          margin-right: 5px;
          position: relative;
          user-select: none;
        }
  
        .tooltip {
          position: relative;
          display: inline-block;
        }
        
        .tooltip .tooltiptext {
          visibility: hidden;
          width: 120px;
          background-color: var(--button-background);
          color: #fff;
          text-align: center;
          border-radius: 6px;
          padding: 5px;
          position: absolute;
          z-index: 1;
          bottom: 30px;
          margin-left: -55px;
          white-space: nowrap;
          user-select: none;
          opacity: 0;
          transition: opacity 0.3s;
        }
        
        .tooltip .tooltiptext::after {
          content: "";
          position: absolute;
          top: 100%;
          left: 50%;
          margin-left: -5px;
          border-width: 5px;
          border-style: solid;
          border-color: var(--button-background) transparent transparent transparent;
        }
      `}</style>
    </div>
  )}
};

export default Like;