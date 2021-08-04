import React, { Component } from "react";
import { firebase, database, auth } from '../services/firebase';

class Like extends Component {
  constructor(props) {
    super(props);
    this.database = database.ref(`posts/${window.location.pathname.slice(6)}/likes`)
    this.like = this.like.bind(this);
  }

  componentDidMount() {
    document.getElementById("labıl").style.display = "block";
  }

  like() {
    
  }

  render() {return (
    <div id="labıl" className="labıl">
      <div className="tooltip">
        <div style={{display: "flex"}}>
          <a id="likeCount" className="likeCount">9999</a>

          <div className="iyy">
            <img id="iy" className="iy" src="/images/like.png" onClick={this.like} />
            <span className="tooltiptext">Beğen</span>
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
          display: none;
        }
  
        .iy {
          width: 20px;
          height: 20px;
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
          cursor: pointer;
        }
  
        .tooltip {
          position: relative;
          display: inline-block;
        }
        
        .tooltip .tooltiptext {
          visibility: hidden;
          width: 60px;
          background-color: var(--button-background);
          color: #fff;
          text-align: center;
          border-radius: 6px;
          padding: 5px;
          position: absolute;
          z-index: 1;
          bottom: 30px;
          margin-left: -45px;
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