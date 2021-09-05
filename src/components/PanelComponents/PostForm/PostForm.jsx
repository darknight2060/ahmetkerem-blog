import React, { Component } from 'react';
import { database, storage } from '../../../services/firebase';
import './PostForm.css';

class PostForm extends Component {
  constructor(state) {
    super(state);
    this.postID = this.props.postID;
    this.state = {
      postTitle: "",
      postContent: "",
      postDate: "",

      file: null
    }

    this.savePost = this.savePost.bind(this);
  }

  componentDidMount() {
    database.ref("posts/" + this.postID).get().then(snap => {
      if (!snap.exists()) return window.location.pathname = "/panel";
      
      this.setState({
        postTitle: snap.val().title,
        postContent: snap.val().content,
        fileLink: snap.val().image,
      })
    })
  }

  onFileUpload = async () => {
    var file = this.state.file;

    if (file) {
      const storages = storage.ref("post-photos").child(this.postID);
      await storages.put(file)
      await storages.getDownloadURL().then((url) => {
        database.ref("posts/" + this.postID).update({
          image: url
        })
      })
    }

    window.location.href = "/panel";
  };

  savePost() {
    this.onFileUpload();

    database.ref("posts/" + this.postID).update({
      title: this.state.postTitle || null,
      content: this.state.postContent || null,
    })
  }
  
  render() {return (
    <div className="postForm">
      <img src="/images/back.png" className="back" onClick={this.props.goBack} />

      <h4 className="title">Yazıyı Düzenle</h4>

      <label className="image2" htmlFor="imeyç" style={{cursor: "pointer"}}>
        <img src={this.state.fileLink || "/images/default-user.png"} id="post_photo" />
        <div className="upload">Yazı Resmi Yükle</div>
      </label>

      <input
        placeholder="Yazı Başlığı"
        className="baslik" 
        maxLength="24" 
        spellCheck="false"
        value={this.state.postTitle} 
        onChange={event => this.setState({ postTitle: event.target.value })}
      />

      <textarea
        placeholder="Yazı İçeriği" 
        id="area"
        className="icerik" 
        spellCheck="false"
        value={this.state.postContent} 
        onChange={event => this.setState({ postContent: event.target.value })} 
      />

      <input
        id="imeyç" 
        className="image" 
        type="file"
        accept="image/*"
        onChange={e => {
          document.getElementById('post_photo').src = window.URL.createObjectURL(e.target.files[0])
          this.setState({ file: e.target.files[0] })
        }}
      />

      <button onClick={this.savePost} className="save-button">Kaydet</button>

      <style>{`
        .main {
          background: #f57029;
        }

        .overlay {
          top: 0;
          left: 0;
          background: #fff;
          position: fixed;
          width: 100%;
          height: 100%;
          opacity: 0.7;
          z-index: 888;
          display: none;
        }

        .overlay-img {
          top: 50%;
          left: 50%;
          width: 150px;
          height: 150px;
          position: fixed;
          margin-top: -75px;
          margin-left: -75px;
          z-index: 899;
          display: none;
        }

        .editor-toolbar button {
          color: #fff;
          background: var(--button-background);
        }

        .editor-toolbar button:hover {
          background: var(--button-background);
          filter: opacity(0.7);
        }

        .editor-toolbar button.active {
          background: var(--button-background);
          filter: opacity(0.7);
        }
      `}</style>
    </div>
  )}
}

export default PostForm;