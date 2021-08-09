import React from 'react';
import Nav from '../components/Nav';
import { database, auth } from '../services/firebase';
import Skeleton from "react-loading-skeleton";

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
    <div>
      <Nav />

      <img className="logout" onClick={this.SignOut} />

      <p style={{fontSize: "30px", marginBottom: "10px", display: "none"}}>Profil</p>

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
            border: "5px solid var(--button-background)",
            borderRadius: "100%",
            opacity: ".8"}} 
          />
        }

        <h1 style={{margin: "15px 0"}}>
          {this.state.user.userName ?
            this.state.user.userName
          :
            <Skeleton width={200} style={{borderRadius: "20px", opacity: ".8"}} />
          }
        </h1>

        <div id="email">
          {this.state.user.userEmail}
        </div>

        <div style={{margin: "20px 0 0", display: "flex", justifyContent: "center"}}>
          <div className="button-edit" onClick={() => window.location.href = "/profil/duzenle"}>
            Düzenle
          </div>
  
          <div className="button-signOut" onClick={this.SignOut}>
            Çıkış Yap
          </div>
        </div>
      </div>

      <style>{`
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

        #email {
          max-width: 60%;
          background: #eeeeef;
          padding: 10px 20px;
          border-radius: 30px;
          margin: auto;
        }
    
        .button-edit {
          width: 125px;
          margin: 0 8px 0;
          padding: 10px;
          color: #fff;
          background: var(--button-background);
          border-radius: 5px;
          outline: none;
          user-select: none;
          cursor: pointer;
          transition: .1s;
        }

        .button-edit:hover {
          background: var(--button-hover-background);
        }

        .button-signOut {
          width: 125px;
          margin: 0 8px 0;
          padding: 10px;
          color: #fff;
          background: #ed1c1c;
          border-radius: 5px;
          outline: none;
          user-select: none;
          cursor: pointer;
          transition: .1s;
        }

        .button-signOut:hover {
          background: #cc1818;
        }

        .logout {
          position: fixed;
          width: 36px;
          height: 36px;
          background: #2f2d33;
          padding: 12px;
          border-radius: 6px;
          display: none;
        }

        @media (max-width: 700px) {
          html {
            background: #fff;
          }

          .card {
            width: 100%;
            margin: auto;
            padding: 80px 0 30px;
            box-shadow: 0 0;
            display: block;
            text-align: center;
          }

          .card-image {
            margin: auto;
          }

          #email {
            max-width: 80%;
            margin: auto;
          }

          .logout {
            top: 10px;
            right: 10px;
          }
        }
      `}</style>
    </div>
  )}
};

export default Profile;