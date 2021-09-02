import React, { Component } from 'react';
import { database } from '../services/firebase';
import ms from '../services/ms';
import Nav from './../components/Nav';
import Footer from './../components/Footer';
import '../css/App.css';
import '../css/Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    const posts = this.state.posts;

    database.ref("posts").on("child_added", snap => {
      document.getElementById("loading").style.display = "none";

      if (!localStorage.getItem("homeInfo")) {
        if (window.matchMedia("(max-width: 900px)").matches == true)
          document.getElementById("homeInfo").style.display = "block";
        
        else document.getElementById("homeInfo").style.display = "inline-block";
      }

      posts.push({
        id: snap.key,
        image: snap.val().image,
        title: snap.val().title,
        content: snap.val().content,
        date: snap.val().date,
        view: snap.val().view
      })

      for (let i = posts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [posts[i], posts[j]] = [posts[j], posts[i]];
      }

      this.setState({ posts: posts });
    })

    window.matchMedia("(max-width: 900px)").addListener(() => {
      if (localStorage.getItem("homeInfo")) return;

      if (window.matchMedia("(max-width: 900px)").matches == true)
        document.getElementById("homeInfo").style.display = "block";
      else
        document.getElementById("homeInfo").style.display = "inline-block";
    })
  }

  getLikeCount(postID) {
    var likes = 0;

    database.ref("posts/" + postID + "/likes").on("child_added", () => {
      likes = likes + 1;
    })

    return likes;
  }

  getCommentCount(postID) {
    var likes = 0;

    database.ref("posts/" + postID + "/comments").on("child_added", () => {
      likes = likes + 1;
    })

    return likes;
  }

  closeHomeInfo() {
    localStorage.setItem("homeInfo", true);
    document.getElementById("homeInfo").style.display = "none";
  }

  render() {return (
    <div>
      <Nav/>

      <div className="main">

        <div className="main2">
          <div className="searchContainer">
            <h1 className="searchTitle" style={{margin: "0", marginRight: "auto"}}>Yazılar</h1>

            <button onClick={() => window.location.href = "/ara"} className="searchIt" style={{background: "none"}}>
              <img src="/images/search.png" />
            </button>
          </div>

          <div className="posts">
            <div className="post" id="homeInfo" style={{display: "none"}}>
              <div className="closeInfo" onClick={this.closeHomeInfo}>&#x2715;</div>
              
              <div className="image-div">
                <img
                  className="image info-image"
                  src="/images/whoami.jpg"
                  style={{objectFit: "contain", background: "#fff"}}
                />
              </div>
              
              <div style={{padding: "0 16px"}}>
                <h2 className="title">Ben Kimim?</h2>
                <div className="description">
                  Merhaba! Ben Ahmet Kerem, 15 yaşındayım.
                  HTML, CSS ve JavaScript kullanarak websiteler yapıyorum.
                  Discord Bot kodlama hakkında da bilgim var.
                  2 yıldan fazla zamandır yazılıma ilgim var ve kendi projelerimi kodluyorum.
                  Ekstra olarak Grafik Tasarım, Fotoğrafçılık, Tenis (Kort Tenisi) gibi hobilerim de var. 
                </div>

                <a href="/hakkinda">
                  <div className="continue">Devamı &#9658;</div>
                </a>
              </div>
            </div>

            {this.state.posts.length > 0 ? this.state.posts.map(post => {return (
              <a href={"/post/"+post.id}>
                <div className="post">
                  <div className="image-div">
                    <div className="image" style={{background: `url(${post.image}) 0 0 / cover`}}>
                      <div className="readmore">
                        Devamını Oku 
                        <div style={{fontFamily: "customFont", marginLeft: "5px"}}> {">"}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{padding: "0 16px"}}>
                    <h2 className="title">{post.title}</h2>
                    <div className="description">{post.content}</div>
              
                    <div style={{paddingTop: "10px", display: "flex", alignItems: "center"}}>
                      <div style={{width: "50%", display: "flex", overflow: "hidden"}}>
                        <div className="views">
                          <img src="/images/view.png" className="viewImage" />
                          {post.view}
                        </div>
  
                        <div className="likes">
                          <img src="/images/liked.png" className="likeImage" />
                          {this.getLikeCount(post.id)}
                        </div>
  
                        <div className="likes">
                          <img src="/images/comment.png" className="likeImage" />
                          {this.getCommentCount(post.id)}
                        </div>
                      </div>

                      <div className="date">{ms(Date.now() - post.date, {long: true}) + " önce"}</div>
                    </div>
                  </div>
                </div>
              </a>
            )}) : <img id="loadingMini" src="/images/favicon.png" style={{top: "200px"}} />}
          </div>

        </div>        
      </div>

      <div style={this.state.posts.length > 0 ? {} : {display: "none"}}>
        <Footer />
      </div>

      <style>{`
        html {
          background: #fff;
        }
        
        .main {
          background: #eeeeef;
          padding-top: 100px;
        }

        footer {
          margin: 0;
        }

        @media (max-width: 700px) {
          nav {
            width: max-content;
          }

          .main {
            padding: 0;
            padding-bottom: 10px;
          }
        }
      `}</style>
    </div>
  )}
};

export default Home;