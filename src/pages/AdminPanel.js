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

      currentPost: "",

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
      previousPosts.push({
        id: snap.key,
        image: snap.val().image,
        title: snap.val().title,
        content: snap.val().content,
        date: snap.val().date
      });

      this.setState({ posts: previousPosts });
      this.getCount(snap.key);
    })
  }

  getCount(postID) {
    database.ref("posts/" + postID + "/likes").on("child_added", () => {
      this.setState({ likeCount: this.state.likeCount + 1 });
    })

    database.ref("posts/" + postID).on("value", snap => {
      database.ref("posts/" + snap.key).get().then(snap => {
        if (snap.exists())
          this.setState({ viewCount: this.state.viewCount + snap.val().view });
      })
    })
  }

  goPost(id) {
    this.setState({ currentPost: id })
    this.setState({ panelState: 3 });
  }

  render() {return (
    <div>
      <Nav />

      <div className="panel-card"
        style={this.state.panelState == 3 ? {height: "100%", marginBottom: "40px"} : {}}>
          
        {this.state.logined == true ?
          <div style={{borderBottom: "5px solid var(--button-background)"}}>
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
          </div>
        :
          ""
        }

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
                goPost={id => this.goPost(id)}
              />
            : ""}

            {this.state.panelState == 3 ? 
              <div>
                <PostForm
                  goBack={() => this.setState({ panelState: 2 })}
                  postID={this.state.currentPost}
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
          box-shadow: 0px 10px 16px rgb(0 0 0 / 10%);
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

        @media (max-width: 700px) {
          html {
            background: #fff;
          }

          .panel-card {
            width: 100%;
            margin: auto;
            padding-top: 65px;
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