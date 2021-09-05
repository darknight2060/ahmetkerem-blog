import React from 'react';
import Nav from '../../components/Nav/Nav';
import { database, auth } from '../../services/firebase';
import Skeleton from "react-loading-skeleton";
import './Profile.css';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
    }
  }
  
  componentDidMount() {
    if (!localStorage.getItem("currentUser")) window.location.href = "/giris";
    
    database.ref("users").on("child_added", snap => {
      if (snap.key == localStorage.getItem("currentUser")) {
        this.setState({ user: snap.val() });
      }
    })
  }

  SignOut() {
    localStorage.removeItem("currentUser");
    
    auth.signOut().then(() => {
      window.location.href = "/giris";
    }).catch(error => {
      console.log(error)
    });
  }

  render() {return (
    <div className="Profile">
      <Nav />

      <div className="card">
        {this.state.user.userImage ?
          <img
            src={this.state.user.userImage || "/images/default.jpg"} 
            alt="Profil Görseli" 
            className="card-image"
          />
        :
          <Skeleton style={{
            width: "150px",
            height: "150px",
            margin: "5px auto 0",
            border: "5px solid var(--button-background)",
            borderRadius: "100%",
            opacity: ".8"}} 
          />
        }

        <h1 style={{margin: "5px 0px 15px"}}>
          {this.state.user.userName ?
            this.state.user.userName
          :
            <Skeleton width={200} style={{minHeight: "43.75px", borderRadius: "20px", opacity: ".8"}} />
          }
        </h1>

        <div id="email">
          {this.state.user.userEmail}
        </div>

        <div className="buttons">
          <div className="button-edit" onClick={() => window.location.href = "/profil/duzenle"}>
            Düzenle
          </div>
  
          <div className="button-signOut" onClick={this.SignOut}>
            Çıkış Yap
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          html {
            background: #fff;
          }
        }
      `}</style>
    </div>
  )}
};

export default Profile;