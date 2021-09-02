import React, { Component } from 'react';
import { database, storage } from '../../services/firebase';
import randomstring from 'randomstring';
import '../../css/PostForm.css';

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
          <button className="nope" onClick={this.closeNewPost}>Vazgeç</button>
          <button className="yeah" onClick={this.newPost}>Paylaş</button>
        </div>

      </div>

      <style>{`
        .overlay {
          top: 0;
          left: 0;
          background: #000;
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
          object-fit: contain;
          z-index: 899;
          display: none;
        }

        .newPostOverlay {
          top: 0;
          left: 0;
          background: #000;
          position: fixed;
          width: 100%;
          height: 100%;
          opacity: 0;
          z-index: 99;
          visibility: hidden;
          transition: .2s;
        }

        .newPost {
          top: 50%;
          margin-top: -330px;
          left: 50%;
          margin-left: -310px;
          background: #fff;
          width: 600px;
          height: 600px;
          opacity: 0;
          z-index: 109;
          position: fixed;
          border-radius: 10px;
          text-align: center;
          padding: 30px 10px;
          user-select: none;
          visibility: hidden;
          transform: scale(1.2);
          transition: .2s;
        }

        .newPost a {
          color: #000;
          font-size: 40px;
          font-weight: bold;
        }

        .newPost .image {
          display: none;
        }
        
        .newPost .image2 {
          background: var(--button-background);
          font-size: 15px;
          display: block;
          max-width: 400px;
          margin: 8px auto;
          cursor: pointer;
          border-radius: 10px;
        }
        
        .newPost .image2 img {
          background: #2f2d33;
          font-size: 15px;
          display: block;
          margin: auto;
          width: calc(100% - 10px);
          height: 225px;
          object-fit: cover;
          border: 4px solid var(--button-background);
          border-radius: 10px 10px 0 0;
          transition: .1s;
        }
        
        .newPost .image2 .upload {
          color: #fff;
          font-weight: bold;
          padding: 5px 0;
        }

        .newPost input {
          width: 90%;
          max-width: 380px;
          margin-top: 5px;
          padding: 15px 10px;
          border: 0;
          border-radius: 10px;
          outline: none;
          display: block;
          margin: 15px auto;
          background: rgba(0, 0, 0, .06);
          font-size: 20px;
          font-weight: bold;
          text-align: center;
          transition: .1s;
        }
        
        .newPost input:focus {
          background: rgba(0, 0, 0, .04);
          box-shadow: inset 0 0 0 2px var(--button-background);
        }
        
        .newPost textarea {
          width: 90%;
          max-width: 380px;
          height: 155px;
          border: 0;
          padding: 15px 10px;
          resize: none;
          outline: none;
          background: rgba(0, 0, 0, .06);
          margin: 0 auto 15px;
          font-size: 14px;
          line-height: 22px;
          border-radius: 10px;
          transition: .1s;
        }
        
        .newPost textarea:focus {
          background: rgba(0, 0, 0, .04);
          box-shadow: inset 0 0 0 2px var(--button-background);
        }

        .newPost button {
          margin-top: 5px;
          outline: none;
        }

        .yeah {
          width: 125px;
          margin: 0 8px 0;
          padding: 10px;
          color: #fff;
          background: var(--button-background);
          border: 0;
          border-radius: 5px;
          outline: none;
          user-select: none;
          transition: .1s;
        }

        .yeah:hover {
          background: var(--button-hover-background);
        }

        .yeah:active {
          background: var(--button-active-background);
        }

        .nope {
          width: 125px;
          margin: 0 8px 0;
          padding: 10px;
          color: var(--button-background);
          background: none;
          border: 2px solid var(--button-background);
          border-radius: 5px;
          outline: none;
          user-select: none;
          transition: .1s;
        }

        .nope:hover {
          color: var(--button-hover-background);
          border-color: var(--button-hover-background);
        }

        .nope:active {
          color: var(--button-active-background);
          border-color: var(--button-active-background);
        }

        @media (max-width: 700px) {
          .newPost {
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            padding: 0px;
            margin: 0;
            border-radius: 0;
          }

          .newPost .image2 img {
            border-radius: 0;
          }
        
          .newPost .image2 {
            margin: auto;
            border-radius: 0;
          }

          .newPost input {
            width: 80%;
            padding: 15px 10px;
          }

          .newPost textarea {
            width: 80%;
            height: 20vh;
          }
        }
      `}</style>
    </div>
  )}
}

export default NewPostDialog;