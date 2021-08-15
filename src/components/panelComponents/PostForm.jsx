import React, { Component } from 'react';
import { database, storage } from '../../services/firebase';
import EasyMDE from 'easymde';
import '../../css/PostForm.css';

class PostForm extends Component {
  constructor(state) {
    super(state);
    this.postID = this.props.postID;
    this.state = {
      postTitle: "",
      postContent: "",
      postDate: "",

      tags: [],
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
        tags: snap.val().tags || [],
      })
    })

    var easyMDE = new EasyMDE({element: document.getElementById('my-text-area')});
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
      tags: this.state.tags || null
    })
  }
      
  removeTag = (i) => {
    const newTags = [ ...this.state.tags ];
    newTags.splice(i, 1);
    this.setState({ tags: newTags });
  }

  inputKeyDown = (e) => {
    const val = e.target.value;
    if (e.key === 'Enter' && val) {
      if (this.state.tags.find(tag => tag.toLowerCase() === val.toLowerCase())) return;

      this.setState({ tags: [...this.state.tags, val]});
      document.getElementById("tagInput").value = null;
    } else if (e.key === 'Backspace' && !val) {
      this.removeTag(this.state.tags.length - 1);
    }
  }
  
  render() {
    const { tags } = this.state;

    return (
    <div className="postForm">
      <img src="/images/back.png" className="back" onClick={this.props.goBack} />

      <h4 className="title">Yazıyı Düzenle</h4>

      <label className="resim2" htmlFor="imeyç" style={{cursor: "pointer"}}>
        <img src={this.state.fileLink || "/images/example.jpg"} id="draft_photo" />
        <div className="upload">Yazı Resmi Yükle</div>
      </label>

      <input
        placeholder="Yazı Başlığı"
        className="baslik" 
        maxLength="24" 
        value={this.state.postTitle} 
        onChange={event => this.setState({ postTitle: event.target.value })}
      />

      <textarea
        placeholder="Yazı İçeriği" 
        id="area"
        className="icerik" 
        value={this.state.postContent} 
        onChange={event => this.setState({ postContent: event.target.value })} 
        style={{display: "none"}}
      />

<textarea id="my-text-area"></textarea>



      <input
        id="imeyç" 
        className="resim" 
        type="file"
        accept="image/*"
        onChange={e => {
          document.getElementById('draft_photo').src = window.URL.createObjectURL(e.target.files[0])
          this.setState({ file: e.target.files[0] })
        }}
      />

      <div className="input-tag">
        <ul className="input-tag__tags">
          {tags.map((tag, i) => (
            <li key={tag}>
              {tag}

              <button onClick={() => this.removeTag(i)}>+</button>
            </li>
          ))}

          <li className="input-tag__tags__input">
            <input
              type="text"
              placeholder="En az 1 etiket gir."
              onKeyDown={this.inputKeyDown}
              id="tagInput"
            />
          </li>
        </ul>
      </div>

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

        .input-tag {
          background: rgba(0, 0, 0, .06);
          border-radius: 10px;
          display: flex;
          flex-wrap: wrap;
          padding: 7px 7px 2px;
          max-width: 486px;
          margin: 10px auto;
          margin-bottom: 30px;
        }
        
        .input-tag input {
          border: none;
          width: 100%;
          color: #000;
          text-align: left;
          font-size: 15px;
          background: none;
          padding: 15px;
        }

        .input-tag input:focus {
          background: none;
          transform: scale(1);
        }
        
        .input-tag__tags {
          display: inline-flex;
          flex-wrap: wrap;
          margin: 0;
          padding: 0;
          width: 100%;
        }
        
        .input-tag__tags li {
          align-items: center;
          background: var(--button-background);
          border-radius: 6px;
          color: white;
          display: flex;
          font-weight: 300;
          list-style: none;
          margin-bottom: 5px;
          margin-right: 5px;
          padding: 5px 10px;
        }
        
        .input-tag__tags li button {
          align-items: center;
          appearance: none;
          background: var(--button-hover-background);
          border: none;
          border-radius: 50%;
          color: white;
          display: inline-flex;
          font-size: 12px;
          height: 15px;
          justify-content: center;
          line-height: 0;
          margin-left: 8px;
          padding: 0;
          transform: rotate(45deg);
          width: 15px;
        }
        
        .input-tag__tags li.input-tag__tags__input {
          background: none;
          flex-grow: 1;
          padding: 0;
        }

        @media (max-width: 623px) {
          .input-tag {
            width: 85%;
            padding: 10px;
          }
        }
      `}</style>
    </div>
  )}
}

export default PostForm;