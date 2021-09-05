import React, { Component } from 'react';
import Nav from '../../components/Nav/Nav';
import { database, auth, storage } from '../../services/firebase';
import Skeleton from "react-loading-skeleton";
import './ProfileEdit.css';

class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    this.database = database.ref().child('users');
    this.user = auth.currentUser;
    this.state = {
      user: [],

      file: null,
      file_banner: null
    }

    this.Save = this.Save.bind(this);
  }

  componentDidMount() {
    if (!localStorage.getItem("currentUser")) window.location.href = "/giris";
    
    auth.onAuthStateChanged(user => {
      database.ref("users/" + user.uid).on(`value`, snap => {
        this.setState({ user: snap.val() });

        document.getElementById("name").value = snap.val().userName;
        document.getElementById("email").value = snap.val().userEmail;
        document.getElementById("name").disabled = false;
        document.getElementById("email").disabled = false;
      })
    });
  }
  
  onFileUpload = async () => {
    var file = this.state.file;
  
    if (file) {
      document.getElementById("overlay").style.display = "block";
      document.getElementById("overlay-img").style.display = "block";

      const storageRef = storage.ref("profile-photos");

      await storageRef.child(`${auth.currentUser.uid}`).put(file)
      await storageRef.child(`${auth.currentUser.uid}`).getDownloadURL().then(url => {
        database.ref('users/'+auth.currentUser.uid).update({
          userImage: url,
        });
      })

      window.location.href = "/profil";
    } else window.location.href = "/profil";
  };

  Save() {
    this.onFileUpload();
    
    if (this.state.email !== "") auth.currentUser.updateEmail(this.state.email);
    
    database.ref('users/'+auth.currentUser.uid).update({
      userName: document.getElementById("name").value, //TODO: if length < 1 return alert text
      userEmail: document.getElementById("email").value,
    });
  }

  render() {
    return (
      <div className="ProfileEdit">
        <Nav />

        <div className="overlay" id="overlay" />
        <img src="/images/favicon.png" className="overlay-img" id="overlay-img" />

        <div className="card">
          {this.state.user.userName ? 
            <React.Fragment>
              <img
                id="photo"
                src={this.state.user.userImage || "/images/default-user.png"}
                alt="Profil Görseli"
                className='card-image'
              />
          
              <label htmlFor="p_image" style={{maxWidth: "200px"}}>
                <div className='card-image-container'>
                  <div style={{display: "inline-block", margin: "0 auto", marginTop: "60px"}}>
                    Profil Fotoğrafını Değiştir
                  </div>
                </div>
              </label>
            </React.Fragment>
          : 
            <Skeleton style={{
              width: "150px",
              height: "150px",
              border: "5px solid var(--button-background)",
              borderRadius: "100%",
              opacity: ".8"}} 
            />
          }

          <input
            id="name" 
            type="text" 
            placeholder="Kullanıcı Adı"
            className="name profile-edit-input"
            maxLength="20"
            autoComplete="off"
            spellCheck="false"
            onChange={event => this.setState({name: event.target.value})}
            disabled
          />

          <input
            id="email"
            type="email"
            placeholder="E-Posta"
            className="profile-edit-input"
            autoComplete="off"
            spellCheck="false"
            onChange={event => this.setState({email: event.target.value})}
            disabled
          />

          <div className="button-save" onClick={this.Save}>
            Kaydet
          </div>

          <input
            type="file" 
            id="p_image"
            style={{display: "none"}}
            onChange={e => {
              document.getElementById('photo').src = window.URL.createObjectURL(e.target.files[0])
              this.setState({file: e.target.files[0]})
            }}
          />
        </div>

        <style>{`
          @media (max-width: 700px) {
            html {
              background: #fff;
            }
          }
        `}</style>
      </div>
    );
}};

export default ProfileEdit;