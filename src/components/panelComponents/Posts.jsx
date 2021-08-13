import React, { Component } from 'react';
import ms from '../../services/ms';

class Posts extends Component {
  render() {return (
    <div className="panel-posts">
      <div className="head">Yazılar</div>
      <div className="panel-posts-overlay">
        {this.props.posts.map(post => {return (
          <div className="panel-post">
            <img className="post-image" src={post.image} />
        
            <div style={{textAlign: "left"}}>
              <div className="post-date">{ms(Date.now() - post.date, {long: true}) + " önce"}</div>
              <div className="post-content">{post.title}</div>
  
              <button className="edit-button" onClick={this.props.goPost}>Düzenle</button>
              <button className="delete-button">Sil</button>
            </div>
  
          </div>
        )}).reverse()}
      </div>

      <style>{`
        .panel-posts {
          width: 100%;
          height: 72vh;
          background: #fff;
          border-radius: 0 0 10px 10px;
          float: right;
          overflow: hidden;
        }
        
        .panel-posts-overlay {
          height: calc(100% - 65px);
          overflow: hidden auto;
        }
        
        .panel-posts-overlay::-webkit-scrollbar {
          width: 8px;
        }
        
        .panel-posts-overlay::-webkit-scrollbar-thumb {
          background: #ddd;
        }
        
        .panel-posts-overlay::-webkit-scrollbar-thumb:hover {
          background: #bbb;
        }
      
        .panel-post {
          padding: 15px 20px;
          border-bottom: 1px solid #e2e2e2;
          display: flex;
          user-select: none;
          transition: .1s;
        }
      
        .panel-post:hover {
          background: #ececec;
        }
      
        .panel-post .img {
          width: 22px;
          height: 22px;
          margin: auto 15px auto 0;
          background: #000;
          border-radius: 50px;
          background: url(https://cdn2.iconfinder.com/data/icons/racket-sports-1/24/badminton_Copy-512.png);
          background-size: contain;
          background-repeat: no-repeat;
        }
      
        .panel-post .post-date {
          color: #8e8e8e;
          font-size: 12px;
          font-style: italic;
          text-transform: uppercase;
        }

        .panel-post .post-image {
          width: 40px;
          height: 40px;
          margin: auto 15px auto 0;
          background: #000;
          border-radius: 5px;
        }

        .panel-post .edit-button {
          margin: 10px 5px 0 0;
          padding: 5px 10px;
          color: #fff;
          background: var(--button-background);
          border: 0;
          border-radius: 10px;
          transition: .1s;
        }

        .panel-post .edit-button:hover {
          background: var(--button-hover-background);
        }

        .panel-post .delete-button {
          margin: 10px 5px 0 0;
          padding: 5px 10px;
          color: #fff;
          background: #ed1c1c;
          border: 0;
          border-radius: 10px;
          transition: .1s;
        }

        .panel-post .delete-button:hover {
          background: #cc1818;
        }
      
        @media (max-width: 700px) {
          .panel-posts {
            width: 100%;
            height: 50vh;
            border-radius: 0;
          }
        }
      `}</style>
    </div>
  )}
};

export default Posts;