import React, { Component } from 'react';
import Skeleton from "react-loading-skeleton";

class LoadingComments extends Component {
  render() {return (
    <div>
      <div className="comment-card-edit" style={{marginBottom: "10px"}}>      
        <Skeleton className="comment-image-skeleton" />

        <div>
          <div style={{padding: "10px 0 0", display: "flex", alignItems: "center"}}>
            <div className="comment-name">
              <Skeleton className="comment-name-skeleton" />
            </div>
          </div>
  
          <p className="comment-content" style={{width: "min-content", margin: "5px 0", textAlign: "left"}}>
            <Skeleton className="comment-content-skeleton" />
          </p>
        </div>
      </div>

      <div className="comment-card-edit" style={{marginBottom: "10px"}}>      
        <Skeleton className="comment-image-skeleton" />

        <div>
          <div style={{padding: "10px 0 0", display: "flex", alignItems: "center"}}>
            <div className="comment-name">
              <Skeleton className="comment-name-skeleton" />
            </div>
          </div>
  
          <p className="comment-content" style={{width: "min-content", margin: "5px 0", textAlign: "left"}}>
            <Skeleton className="comment-content-skeleton" />
          </p>
        </div>
      </div>

      <div className="comment-card-edit" style={{marginBottom: "10px"}}>      
        <Skeleton className="comment-image-skeleton" />

        <div>
          <div style={{padding: "10px 0 0", display: "flex", alignItems: "center"}}>
            <div className="comment-name">
              <Skeleton className="comment-name-skeleton" />
            </div>
          </div>
  
          <p className="comment-content" style={{width: "min-content", margin: "5px 0", textAlign: "left"}}>
            <Skeleton className="comment-content-skeleton" />
          </p>
        </div>
      </div>

      <style>{`
        .comment-image-skeleton {
          width: 40px;
          height: 40px;
          margin: 10px;
          border-radius: 100%;
        }
        
        .comment-name-skeleton {
          width: 100px;
          height: 14px;
          border-radius: 20px;
        }
        
        .comment-content-skeleton {
          width: 400px;
          height: 12px;
          border-radius: 20px;
        }
        
        @media (max-width: 900px) {
          .comment-content-skeleton {
            width: 70%;
            position: absolute;
          }
        }
      `}</style>
    </div>
  )}
}

export default LoadingComments;