import React, { Component } from 'react';
import { database } from '../../../services/firebase';
import './DeleteDialog.css';

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

        <button className="rejection" onClick={this.closeDelete}>Vazgeç</button>
        <button className="confirmation" onClick={this.deletePost}>Eminim, sil onu!</button>

      </div>
    </div>
  )}  
}

export default DeleteDialog;