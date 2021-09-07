import React from 'react';
import Nav from '../../components/Nav/Nav';
import Notifications from '../../components/PanelComponents/Notifications/Notifications';
import PostForm from '../../components/PanelComponents/PostForm/PostForm';
import Posts from '../../components/PanelComponents/Posts/Posts';
import Statistics from '../../components/PanelComponents/Statistics/Statistics';
import { database } from '../../services/firebase';
import './AdminPanel.css';

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
      likeCount: 0,
      commentCount: 0
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

    database.ref("posts/" + postID + "/comments").on("child_added", () => {
      this.setState({ commentCount: this.state.commentCount + 1 });
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
    <div className="AdminPanel">
      <Nav />

      <div className="panel-card"
        style={this.state.panelState == 3 ? {height: "100%", marginBottom: "40px"} : {}}>
          
        {this.state.logined == true ?
          <div style={{display: "flex", justifyContent: "center", boxShadow: "inset 0px -4px #eeeeef"}}>
            <button 
              onClick={e => this.setState({ panelState: 0 })}
              className="tab-button"
              style={this.state.panelState == 0 ? {borderBottom: "4px solid var(--button-background)"} : {}}
            >  İstatistikler  </button>
    
            <button
              onClick={e => this.setState({ panelState: 1 })}
              className="tab-button"
              style={this.state.panelState == 1 ? {borderBottom: "4px solid var(--button-background)"} : {}}
            > Hareketler </button>
    
            <button
              onClick={e => this.setState({ panelState: 2 })}
              className="tab-button"
              style={this.state.panelState == 2 ? {borderBottom: "4px solid var(--button-background)"} : {}}
            > Yazılar </button>
          </div>
        :
          ""
        }

        {this.state.logined == false ?
          <div className="panel-login">
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
                commentCount={this.state.commentCount}
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
        @media (max-width: 700px) {
          html {
            background: #fff;
          }
        }
      `}</style>
    </div>
  )}
};

export default AdminPanel;