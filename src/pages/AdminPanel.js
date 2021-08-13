import React from 'react';
import Nav from '../components/Nav';
import Notifications from '../components/panelComponents/Notifications';
import PostForm from '../components/panelComponents/PostForm';
import Posts from '../components/panelComponents/Posts';
import Statistics from '../components/panelComponents/Statistics';
import { database } from '../services/firebase';

class AdminPanel extends React.Component {
  constructor(props) {
    super(props);
    this.database = database.ref("users");
    this.state = {
      users: [],
      posts: [],
      notifications: [],

      logined: false,
      panelState: 0,

      viewCount: 0,
      likeCount: 0
    }

    this.goPost = this.goPost.bind(this);
  }
  
  componentDidMount() {
    const previousPosts = this.state.posts;
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


    database.ref("posts").orderByChild("date").on("child_added", snap => {
      previousPosts.push(snap.val());
      this.setState({ posts: previousPosts });

      this.getCount(snap.key);
    })

    window.addEventListener("keypress", e => {
      if (e.key == "a") this.setState({ logined: true });
    })
  }

  getCount(postID) {
    database.ref("posts/" + postID + "/likes").on("child_added", () => {
      this.setState({ likeCount: this.state.likeCount + 1 });
    })

    database.ref("posts/" + postID).on("value", snap => {
      this.setState({ viewCount: this.state.viewCount + snap.val().view });
    })
  }

  goPost() {
    this.setState({ panelState: 3 });
  }

  render() {return (
    <div>
      <Nav />

      <div className="panel-card"
        style={this.state.panelState == 3 ? {height: "100%", marginBottom: "40px"} : {}}>
          
        <button 
          onClick={e => this.setState({ panelState: 0 })}
          className="tab-button"
          style={this.state.panelState == 0 ? {background: "var(--button-background)"} : {}}
        >  İstatistikler  </button>

        <button
          onClick={e => this.setState({ panelState: 1 })}
          className="tab-button"
          style={this.state.panelState == 1 ? {background: "var(--button-background)"} : {}}
        > Bildirimler </button>

        <button
          onClick={e => this.setState({ panelState: 2 })}
          className="tab-button"
          style={this.state.panelState == 2 ? {background: "var(--button-background)"} : {}}
        > Yazılar </button>


        {this.state.logined == false ?
          <div style={{paddingTop: "20vh"}}>
            <h1 className="panel-card-h1">Panel'e Giriş Yap</h1>
  
            <form id="panel-form">
              <input type="text" className="panel-input" placeholder="Panel Şifresi" name="from_pass" autocomplete="off" required />
          
              <input type="submit" value="Giriş" className="panel-button" />
            </form>
          </div>
        :
          <div>
            {this.state.panelState == 0 ? 
              <Statistics
                viewCount={this.state.viewCount} 
                likeCount={this.state.likeCount}
              />
            : ""}

            {this.state.panelState == 1 ? 
              <Notifications
                users={this.state.users}
                notifications={this.state.notifications}
              />
            : ""}

            {this.state.panelState == 2 ? 
              <Posts
                posts={this.state.posts}
                goPost={this.goPost}
              />
            : ""}

            {this.state.panelState == 3 ? 
              <div>
                <PostForm
                  goBack={() => this.setState({ panelState: 2 })}
                />
              </div>
            : ""}
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

        .tab-button {
          margin: 10px 5px;
          padding: 8px 12px;
          font-weight: bold;
          color: #fff;
          background: var(--button-hover-background);
          border: 0;
          border-radius: 5px;
          outline: none;
          transition: .1s;
        }

        .tab-button:hover {
          background: var(--button-background);
        }

        .head {
          color: #fff;
          font-size: 18px;
          font-weight: bold;
          text-transform: uppercase;
          padding: 20px;
          background: rgb(0 211 128);
          user-select: none;
        }

        .panel-tab {
          width: 100%;
          height: 72vh;
          background: #fff;
          border-radius: 0 0 10px 10px;
          float: right;
          overflow: hidden;
        }

        @media (max-width: 700px) {
          html {
            background: #fff;
          }

          .panel-card {
            width: 100%;
            margin: auto;
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