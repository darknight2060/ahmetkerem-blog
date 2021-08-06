import React, { Component } from 'react';
import Nav from '../components/Nav';
import { database, auth, storage } from '../services/firebase';
import Skeleton from "react-loading-skeleton";

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

        console.log(this.state.user)

        //document.getElementById("photo").src = snap.val().userImage || "/images/example.jpg";
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
      <div>
        <Nav />

        <div className="overlay" id="overlay"></div>
        <img src="/images/favicon.png" className="overlay-img" id="overlay-img" />

        <p style={{fontSize: "30px", marginBottom: "10px", display: "none"}}>Profili Düzenle</p>

        <div className="card">
          {this.state.user.userName ? 
            <React.Fragment>
              <img
                id="photo"
                src={this.state.user.userImage || "/images/example.jpg"}
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
            onChange={event => this.setState({name: event.target.value})}
            disabled
          />

          <input
            id="email"
            type="email"
            placeholder="E-Posta"
            className="profile-edit-input"
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

          .card {
            color: #000;
            border-radius: 10px;
            background: #fff;
            box-shadow: 0px 10px 16px rgb(0 0 0 / 24%);
            width: 100%;
            max-width: 400px;
            margin: 120px auto 0;
            padding: 30px;
            text-align: center;
          }

          .card-image {
            width: 150px;
            height: 150px;
            margin: auto;
            background-color: #fff;
            border: 5px solid var(--button-background);
            border-radius: 100%;
            object-fit: cover;
          }
    
          .card-image-container {
            position: relative;
            margin: auto;
            margin-top: -160px;
            border-radius: 500px;
            max-width: 150px;
            height: 150px;
            object-fit: cover;
            box-shadow: inset 0 0 150px 20px #000;
            opacity: 0;
            color: #fff;
            text-align: center;
            transition: .1s;
          }

          .card-image-container:hover {
            opacity: 1.0;
          }
    
          .profile-edit-input {
            width: 300px;
            border: 0;
            margin: 15px auto 0;
            padding: 12px;
            border-radius: 5px;
            background: rgba(0, 0, 0, .06);
            resize: none;
            outline: none;
            font-size: 16px;
            text-align: center;
            transition: .1s;
            display: block;
          }

          .profile-edit-input:focus {
            background: rgb(0 0 0 / 10%);
            transform: scale(1.05);
          }

          label {
            cursor: pointer;
            font-size: 15px;
          }

          .name {
            margin-top: 25px;
            font-size: 32px;
            font-weight: bold;
            padding: 8px 12px;
          }

          .button-save {
            width: 150px;
            margin: 20px auto 0;
            padding: 10px;
            color: #fff;
            background: var(--button-background);
            border-radius: 5px;
            outline: none;
            user-select: none;
            cursor: pointer;
            transition: .1s;
          }

          .button-save:hover {
            background: var(--button-hover-background);
          }
          
          @media (max-width: 700px) {
            html {
              background: #eeeeef;
            }

            .card {
              width: 100%;
              display: block;
              text-align: center;
            }

            .card-image {
              width: 280px;
              margin-top: -120px;
              border: 8px solid #f57029;
            }

            .card-image-container {
              width: 100%;
              margin-top: -158px;
            }

            .name {
              text-align: center;
              padding-left: 0;
              text-align: center;
              padding-left: 0;
              background: rgba(0, 0, 0, .1);
              border-radius: 10px;
            }

            .button-save {
              right: 8px;
              bottom: 62px;
              position: fixed;
            }
          }
        `}</style>
      </div>
    );
}};

export default ProfileEdit;