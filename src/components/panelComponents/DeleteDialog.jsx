import React, { Component } from 'react';
import { database } from '../../services/firebase';

class DeleteDialog extends Component {
  constructor(props) {
    super(props);
    this.closeDelete = this.closeDelete.bind(this);
    this.deletePost = this.deletePost.bind(this);
  }

  closeDelete(deleted) {
    if (deleted == true)
      document.getElementById("panel-post-" + this.props.postID).style.display = "none";

    document.getElementById("deleteOverlay").style.visibility = "hidden";
    document.getElementById("deleteOverlay").style.opacity = "0";

    document.getElementById("delete").style.visibility = "hidden";
    document.getElementById("delete").style.opacity = "0";
    document.getElementById("delete").style.transform = "scale(1.2)";
  }

  deletePost() {
    database.ref("posts/" + this.props.postID).remove();
    this.closeDelete(true);
  }

  render() {return (
    <div>
      <div className="deleteOverlay" id="deleteOverlay" onClick={this.closeDelete} />

      <div className="delete" id="delete">

        <a>Yazıyı Sil?</a>
        <p>Bu yazıyı silmek istediğine emin misin?</p>

        <button className="red" onClick={this.closeDelete}>Vazgeç</button>
        <button className="onay" onClick={this.deletePost}>Eminim, sil onu!</button>

      </div>

      <style>{`
        .deleteOverlay {
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

        .delete {
          top: 50%;
          margin-top: -110px;
          left: 50%;
          margin-left: -175px;
          background: #fff;
          width: 350px;
          height: 160px;
          opacity: 0;
          z-index: 999;
          position: fixed;
          border-radius: 10px;
          text-align: center;
          padding: 30px 10px;
          user-select: none;
          visibility: hidden;
          transform: scale(1.2);
          transition: .2s;
        }

        .delete a {
          color: #000;
          font-size: 40px;
          font-weight: bold;
        }

        .delete p {
          color: #000;
          font-size: 18px;
          margin-top: 15px;
        }

        .delete button {
          margin-top: 5px;
          outline: none;
        }

        .onay {
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

        .onay:hover {
          background: var(--button-hover-background);
        }

        .red {
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

        .red:hover {
          color: var(--button-hover-background);
          border-color: var(--button-hover-background);
        }

        @media (max-width: 623px) {
          .delete {
            width: 100%;
            height: 100%;
            left: 0;
            padding: 20px 0px;
            margin: 0;
          }
        }
      `}</style>
    </div>
  )}
}

export default DeleteDialog;