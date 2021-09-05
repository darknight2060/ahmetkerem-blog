import React, { Component } from 'react';
import DeleteDialog from '../DeleteDialog/DeleteDialog';
import NewPostDialog from '../NewPostDialog/NewPostDialog';
import ms from '../../../services/ms';
import './Posts.css';

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deletePostID: ""
    }

    this.createNewPost = this.createNewPost.bind(this);
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
    document.getElementById("newPostOverlay").style.visibility = "visible";
    document.getElementById("newPostOverlay").style.opacity = ".6";

    document.getElementById("newPost").style.visibility = "visible";
    document.getElementById("newPost").style.opacity = "1";
    document.getElementById("newPost").style.transform = "scale(1)";
  }

  render() {return (
    <div className="panel-posts">
      <DeleteDialog postID={this.state.deletePostID} />

      <NewPostDialog />

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
    </div>
  )}
};

export default Posts;