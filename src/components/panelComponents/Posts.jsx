import React, { Component } from 'react';
import DeleteDialog from './DeleteDialog';
import { database } from '../../services/firebase';
import randomstring from 'randomstring';
import ms from '../../services/ms';

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deletePostID: ""
    }
  }

  openDeleteDialog(id) {
    this.setState({ deletePostID: id })

    document.getElementById("deleteOverlay").style.visibility = "visible";
    document.getElementById("deleteOverlay").style.opacity = ".6";

    document.getElementById("delete").style.visibility = "visible";
    document.getElementById("delete").style.opacity = "1";
    document.getElementById("delete").style.transform = "scale(1)";
  }

  createNewPost() {
    const newPostID = randomstring.generate({
      length: 8,
      charset: "numeric"
    });

    database.ref("posts/" + newPostID).set({
      title: "",
      content: "",
      date: Date.now(),
      view: 0
    })
  }

  render() {return (
    <div className="panel-posts">
      <DeleteDialog postID={this.state.deletePostID} />

      <div className="newPostContainer" onClick={this.createNewPost}>
        <img src="/images/plus.png" className="plusIcon" />
        <a className="newPostText">Yeni Bir Yazı Oluştur</a>
      </div>

      <div className="panel-posts-overlay">
        {this.props.posts.map(post => {return (
          <div className="panel-post" id={"panel-post-" + post.id}>
            <img className="post-image" src={post.image || "/images/default.jpg"} />
        
            <div style={{textAlign: "left"}}>
              <div className="post-date">{ms(Date.now() - post.date, {long: true}) + " önce"}</div>
              <div className="post-content">{post.title}</div>
  
              <button className="edit-button" onClick={() => this.props.goPost(post.id)}>Düzenle</button>
              <button className="delete-button" onClick={() => this.openDeleteDialog(post.id)}>Sil</button>
            </div>
  
          </div>
        )}).reverse()}
      </div>

      <style>{`
        .panel-posts {
          width: 100%;
          height: 68vh;
          background: #fff;
          border-radius: 0 0 10px 10px;
          float: right;
          overflow: hidden;
        }

        .newPostContainer {
          width: max-content;
          margin: auto;
          padding: 15px 0;
          display: flex;
        }

        .newPostContainer .plusIcon {
          width: 22px;
          height: 22px;
          padding-right: 5px;
          cursor: pointer;
        }

        .newPostText {
          font-weight: bold;
          cursor: pointer;
          user-select: none;
        }
        
        .panel-posts-overlay {
          height: 100%;
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
            height: calc(100vh - 121px);
            border-radius: 0;
          }
        }
      `}</style>
    </div>
  )}
};

export default Posts;