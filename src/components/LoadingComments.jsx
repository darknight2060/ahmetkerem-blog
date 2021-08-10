import React, { Component } from 'react';
import Skeleton from "react-loading-skeleton";

class LoadingComments extends Component {
  render() {return (
    <div>
      <div className="comment-card-edit">      
        <Skeleton style={{
          width: "40px",
          height: "40px",
          margin: "10px",
          borderRadius: "100%"}} 
        />

        <div>
          <div style={{padding: "10px 0 0", display: "flex", alignItems: "center"}}>
            <div className="comment-name">
              <Skeleton width={100} height={14} style={{borderRadius: "20px"}} />
            </div>
          </div>
  
          <p className="comment-content" style={{margin: "5px 0", textAlign: "left"}}>
            <Skeleton width={400} height={12} style={{borderRadius: "20px"}} />
          </p>
        </div>
      </div>

      <div className="comment-card-edit">      
        <Skeleton style={{
          width: "40px",
          height: "40px",
          margin: "10px",
          borderRadius: "100%"}} 
        />

        <div>
          <div style={{padding: "10px 0 0", display: "flex", alignItems: "center"}}>
            <div className="comment-name">
              <Skeleton width={100} height={14} style={{borderRadius: "20px"}} />
            </div>
          </div>
  
          <p className="comment-content" style={{margin: "5px 0", textAlign: "left"}}>
            <Skeleton width={400} height={12} style={{borderRadius: "20px"}} />
          </p>
        </div>
      </div>

      <div className="comment-card-edit">      
        <Skeleton style={{
          width: "40px",
          height: "40px",
          margin: "10px",
          borderRadius: "100%"}} 
        />

        <div>
          <div style={{padding: "10px 0 0", display: "flex", alignItems: "center"}}>
            <div className="comment-name">
              <Skeleton width={100} height={14} style={{borderRadius: "20px"}} />
            </div>
          </div>
  
          <p className="comment-content" style={{margin: "5px 0", textAlign: "left"}}>
            <Skeleton width={400} height={12} style={{borderRadius: "20px"}} />
          </p>
        </div>
      </div>
    </div>
  )}
}

export default LoadingComments;