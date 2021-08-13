import React, { Component } from 'react';

class Statistics extends Component {
  render() {return (
    <div className="panel-tab panel-mid">
      <div className="head">İstatistikler</div>
  
      <div style={{display: "flex", justifyContent: "center"}}>
        <div className="count">
          <img src="/images/view.png" />
          <b>{this.props.viewCount}</b>
        </div>
  
        <div className="count">
          <img src="/images/liked.png" />
          <b>{this.props.likeCount}</b>
        </div>
      </div>
      
      <style>{`
        .panel-mid {
          width: 700px;
          height: 75vh;
          background: #fff;
          border-radius: 10px 0 0 10px;
          display: flex;
          flex-direction: column;
          overflow: hidden auto;
        }
      
        .panel-mid .head {
          color: #fff;
          font-size: 18px;
          font-weight: bold;
          text-transform: uppercase;
          padding: 20px;
          background: rgb(0 211 128);
          user-select: none;
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
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: .1s;
        }
        
        .panel-mid .count:hover {
          transform: scale(1.1);
        }
        
        @media (max-width: 700px) {
          .panel-mid {
            width: 100%;
            height: 50vh;
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