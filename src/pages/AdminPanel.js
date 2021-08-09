import React from 'react';
import Nav from '../components/Nav';
import { database, auth } from '../services/firebase';
import ms from '../services/ms';

class AdminPanel extends React.Component {
  constructor(props) {
    super(props);
    this.database = database.ref("users");
    this.state = {
      users: [],

      logined: false,
      notifications: []
    }
  }
  
  componentDidMount() {
    const previousUsers = this.state.users;

    this.database.on('child_added', snap => {
      previousUsers.push({
        id: snap.key,
        name: snap.val().userName,
        image: snap.val().userImage
      })
      
      this.setState({
        users: previousUsers,
      })
    })

    this.database.on('child_removed', snap => {
      for (var i = 0; i < previousUsers.length; i++) {
        if (previousUsers[i].id === snap.key) {
          previousUsers.splice(i, 1);
        }
      }

      this.setState({
        users: previousUsers,
      })
    })


    const panelForm = document.getElementById("panel-form");

    if (panelForm) panelForm.addEventListener('submit', event => {
      event.preventDefault();
      
      const input = event.target[0];

      database.ref("panel").on("child_added", snap => {
        if (snap.val() == input.value) this.setState({ logined: true });
      })

    });


    const previousNotifications = this.state.notifications;

    database.ref("statistics/notifications").orderByChild("date").on("child_added", snap => {
      previousNotifications.push(snap.val());

      this.setState({ notifications: previousNotifications })
    })
  }

  categorizeNotf(notf) {
    var member = "";

    if (notf.member == "Misafir") return "Misafir";

    this.state.users.forEach(p => {
      if (p.id !== notf.member) return;
      else member = p.name;
    })

    if (notf.type == "like") return `${member} bir yazı beğendi.`;
    if (notf.type == "comment") return `${member} bir yorum yaptı.`;
  }

  render() {return (
    <div>
      <Nav />

      <div className="panel-card">
        {this.state.logined == false ?
          <div style={{paddingTop: "20vh"}}>
            <h1 className="panel-card-h1">Panel'e Giriş Yap</h1>
  
            <form id="panel-form">
              <input type="text" className="panel-input" placeholder="Panel Şifresi" name="from_pass" autocomplete="off" required />
          
              <input type="submit" value="Giriş" className="panel-button" />
            </form>
          </div>
        :
          <div style={{display: "flex"}}>
            <div className="panel-mid">
  
            </div>
  
            <div className="panel-notfs">
              <div className="head">Bildirimler</div>
              <div className="panel-notfs-overlay">
                {this.state.notifications.map(notf => {return (
                  <div className="panel-notf">
                    <div className="img" />
                
                    <div style={{textAlign: "left"}}>
                      <div className="notf-date">{ms(Date.now() - notf.date, {long: true}) + " önce"}</div>
                      <div className="notf-content">{this.categorizeNotf(notf)}</div>
                    </div>
                  </div>
                )}).reverse()}
              </div>
            </div>
          </div>
        }
      </div>

      <style>{`
        .panel-card {
          color: #000;
          border-radius: 10px;
          background: #fff;
          box-shadow: 0px 10px 16px rgb(0 0 0 / 24%);
          width: 100%;
          max-width: 1000px;
          height: 75vh;
          margin: 120px auto 0;
          text-align: center;
        }

        .panel-card-h1 {
          margin: 0 auto 25px;
          font-weight: normal;
          user-select: none;
        }

        .panel-input {
          width: 300px;
          border: 0;
          margin: 0 auto 20px;
          padding: 12px;
          border-radius: 5px;
          background: rgba(0, 0, 0, .06);
          resize: none;
          outline: none;
          font-size: 16px;
          transition: .1s;
          display: block;
        }

        .panel-input:focus {
          background: rgb(0 0 0 / 10%);
          transform: scale(1.05);
        }

        .panel-button {
          width: 120px;
          background: var(--button-background);
          border: none;
          border-radius: 5px;
          margin: 20px auto 0;
          padding: 10px;
          color: #fff;
          font-size: 16px;
          outline: none;
          transition: .1s;
        }

        .panel-button:hover {
          background: var(--button-hover-background);
          cursor: pointer;
        }

        .panel-button:active {
          transform: scale(.95);
        }


        .panel-mid {
          width: 700px;
          height: 75vh;
          background: #fff;
          border-radius: 10px;
        }

        .panel-notfs {
          width: 300px;
          height: 75vh;
          background: #fff;
          border-left: 2px solid #ccc;
          border-radius: 0 10px 10px 0;
          float: right;
          overflow: hidden;
        }

        .panel-notfs-overlay {
          height: calc(100% - 65px);
          overflow: hidden auto;
        }
        
        .panel-notfs-overlay::-webkit-scrollbar {
          width: 8px;
        }

        .panel-notfs-overlay::-webkit-scrollbar-thumb {
          background: #ddd;
        }

        .panel-notfs-overlay::-webkit-scrollbar-thumb:hover {
          background: #bbb;
        }

        .panel-notfs .head {
          color: #fff;
          font-size: 18px;
          font-weight: bold;
          text-transform: uppercase;
          padding: 20px;
          background: rgb(0 211 128);
          user-select: none;
        }
        
        .panel-notf {
          padding: 15px 20px;
          border-bottom: 1px solid #e2e2e2;
          display: flex;
          user-select: none;
          transition: .1s;
        }

        .panel-notf:hover {
          background: #ececec;
        }

        .panel-notf .img {
          width: 22px;
          height: 22px;
          margin: auto 15px auto 0;
          background: #000;
          border-radius: 50px;
          background: url(https://cdn2.iconfinder.com/data/icons/racket-sports-1/24/badminton_Copy-512.png);
          background-size: contain;
          background-repeat: no-repeat;
        }

        .panel-notf .notf-date {
          color: #8e8e8e;
          font-size: 12px;
          font-style: italic;
          text-transform: uppercase;
        }

        .panel-notf .notf-content {
          
        }

        @media (max-width: 700px) {
          html {
            background: #fff;
          }

          .panel-card {
            width: 100%;
            margin: auto;
            padding: 80px 0 30px;
            box-shadow: 0 0;
            display: block;
            text-align: center;
          }

          .panel-input {
            width: 80%;
          }
        }
      `}</style>
    </div>
  )}
};

export default AdminPanel;