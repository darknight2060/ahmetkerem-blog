import React, { Component } from "react";
import { database } from '../services/firebase';

class Like extends Component {
  constructor(props) {
    super(props);
    this.postID = window.location.pathname.slice(6);
    this.database = database.ref(`posts/${this.postID}/likes`)
    this.like = this.like.bind(this);
  }

  componentDidMount() {
    this.database.on("child_added", snap => {
      if (snap.key == localStorage.getItem("currentUser")) {
        document.getElementById("iy").src = "/images/liked.png";
        document.getElementById("tooltiptext").innerText = "Beğeniyi Kaldır";
      }
    })

    this.database.on("child_removed", snap => {
      if (snap.key == localStorage.getItem("currentUser")) {
        document.getElementById("iy").src = "/images/like.png";
        document.getElementById("tooltiptext").innerText = "Beğen";
      }
    })
  }

  like() {
    if (localStorage.getItem("like-"+this.postID) == "liked") {
      this.database.child(localStorage.getItem("currentUser")).remove();
    } else {
      this.database.child(localStorage.getItem("currentUser")).set({
        liked: true
      })
    }
  }

  render() {return (
    <div id="labıl" className="labıl">
      <div className="tooltip">
        <div style={{display: "flex"}}>
          <a id="likeCount" className="likeCount">9999</a>

          <div className="iyy">
            <img id="iy" className="iy" src="/images/like.png" onClick={this.like} />
            <span id="tooltiptext" className="tooltiptext">Beğen</span>
          </div>
        </div>
      </div>

      <style>{`
        .labıl {
          width: auto;
          height: auto;
          text-align: left;
          background-size: cover;
          padding: 0 30px;
        }
  
        .iy {
          width: 20px;
          height: 20px;
          object-fit: contain;
          cursor: pointer;
        }

        .iyy:hover .tooltiptext {
          visibility: visible;
          opacity: 1;
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
          margin-left: -75px;
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