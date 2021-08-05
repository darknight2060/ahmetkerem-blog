import React from 'react';
import Nav from '../components/Nav';
import { auth } from '../services/firebase';
import Skeleton from "react-loading-skeleton";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
    }
  }
  
  componentDidMount() {
    auth.onAuthStateChanged(user => {
      this.setState({user: user})
    })
  }

  SignOut() {
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
        {this.state.user.photoURL ?
          <img src={this.state.user.photoURL || "/images/default.jpg"} alt="Profil Görseli" className="card-image" />
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
          {this.state.user.displayName ?
            this.state.user.displayName
          :
            <Skeleton width={200} style={{borderRadius: "20px", opacity: ".8"}} />
          }
        </h1>

        <div id="email">
          {this.state.user.email}
        </div>

        <div className="button-edit" onClick={() => window.location.href = "/profil/duzenle"}>
          Düzenle
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

        .button-edit:hover {
          background: var(--button-hover-background);
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

          .button-edit {
            left: 50%;
            margin-left: -85px;
            bottom: 10px;
            position: fixed;
          }

          .logout {
            top: 10px;
            right: 10px;
            display: block;
          }
        }
      `}</style>
    </div>
  )}
};

export default Profile;