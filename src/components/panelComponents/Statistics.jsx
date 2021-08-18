import React, { Component } from 'react';

class Statistics extends Component {
  render() {return (
    <div className="panel-mid">
      <div style={{display: "inline-block"}}>
        <div className="count">
          <img src="/images/view.png" />
          <b>{this.props.viewCount}</b>
        </div>
  
        <div className="count">
          <img src="/images/liked.png" />
          <b>{this.props.likeCount}</b>
        </div>

        <div className="count">
          <img src="/images/comment.png" />
          <b>{this.props.commentCount}</b>
        </div>
      </div>
      
      <style>{`
        .panel-mid {
          width: 100%;
          height: 68vh;
          background: #fff;
          border-radius: 0 0 10px 10px;
          float: right;
          overflow: hidden;
        }
      
        .panel-mid img {
          width: 64px;
          height: 64px;
          object-fit: contain;
        }
      
        .panel-mid b {
          font-size: 25px;
          user-select: none;
        }
        
        .panel-mid .count {
          width: max-content;
          padding: 30px 20px 0;
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          transition: .1s;
        }
        
        .panel-mid .count:hover img {
          transition: .1s;
          transform: scale(1.1);
        }
        
        @media (max-width: 700px) {
          .panel-mid {
            width: 100%;
            height: calc(100vh - 186px);
            margin: auto;
            padding-top: 65px;
            border-radius: 0;
          }
        }
      `}</style>
    </div>
  )}
};

export default Statistics;