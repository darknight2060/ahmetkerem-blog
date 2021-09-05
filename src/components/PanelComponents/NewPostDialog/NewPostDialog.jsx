import React, { Component } from 'react';
import { database, storage } from '../../../services/firebase';
import randomstring from 'randomstring';
import './NewPostDialog.css';

class NewPostDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null
    }

    this.closeNewPost = this.closeNewPost.bind(this);
    this.newPost = this.newPost.bind(this);
  }

  onFileUpload = async (postID) => {
    var file = this.state.file;

    if (file) {
      const storages = storage.ref("post-photos").child(postID);
      await storages.put(file)
      await storages.getDownloadURL().then((url) => {
        database.ref("posts/" + postID).update({
          image: url
        })
      })
    }

    window.location.href = "/panel";
  };

  closeNewPost() {
    document.getElementById("newPostOverlay").style.visibility = "hidden";
    document.getElementById("newPostOverlay").style.opacity = "0";

    document.getElementById("newPost").style.visibility = "hidden";
    document.getElementById("newPost").style.opacity = "0";
    document.getElementById("newPost").style.transform = "scale(1.2)";

    document.getElementById("baslik").value = "";
    document.getElementById("area").value = "";
  }

  newPost() {
    if (document.getElementById("baslik").value.length < 1) return;
    if (document.getElementById("area").value.length < 1) return;

    document.getElementById("overlay").style.display = "block";
    document.getElementById("overlay-img").style.display = "block";

    const newPostID = randomstring.generate({
      length: 8,
      charset: "numeric"
    });

    this.onFileUpload(newPostID);

    database.ref("posts/" + newPostID).set({
      title: document.getElementById("baslik").value,
      content: document.getElementById("area").value,
      date: Date.now(),
      view: 0
    })
  }

  render() {return (
    <div>
      <div className="overlay" id="overlay" />
      <img src="/images/favicon.png" className="overlay-img" id="overlay-img" />

      <div className="newPostOverlay" id="newPostOverlay" onClick={this.closeNewPost} />

      <div className="newPost" id="newPost">
        <label className="image2" htmlFor="imeyç" style={{cursor: "pointer"}}>
          <img src={this.state.fileLink || "/images/default.jpg"} id="draft_photo" />
          <div className="upload">Yazı Resmi Yükle</div>
        </label>

        <input
          placeholder="Yazı Başlığı"
          id="baslik"
          className="baslik" 
          maxLength="24" 
        />
  
        <textarea
          placeholder="Yazı İçeriği" 
          id="area"
          className="icerik" 
        />

        <input
          id="imeyç" 
          className="image" 
          type="file"
          accept="image/*"
          onChange={e => {
            document.getElementById('draft_photo').src = window.URL.createObjectURL(e.target.files[0])
            this.setState({ file: e.target.files[0] })
          }}
        />

        <div>
          <button className="rejection" onClick={this.closeNewPost}>Vazgeç</button>
          <button className="confirmation" onClick={this.newPost}>Paylaş</button>
        </div>

      </div>
    </div>
  )}
}

export default NewPostDialog;