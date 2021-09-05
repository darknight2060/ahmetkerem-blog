import React, { Component } from 'react';
import './Statistics.css';

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
    </div>
  )}
};

export default Statistics;