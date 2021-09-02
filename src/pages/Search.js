import React, { Component } from 'react';
import { database } from '../services/firebase';
import Fuse from 'fuse.js';
import ms from '../services/ms';
import Nav from './../components/Nav';
import Footer from './../components/Footer';
import '../css/App.css';
import '../css/Home.css';

class Search extends Component {
  constructor(props) {
    super(props);
    this.searchText = decodeURIComponent(window.location.search.slice(3));
    this.searched = window.location.search.length > 2;
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    const posts = this.state.posts;

    database.ref("posts").on("child_added", snap => {
      posts.push({
        id: snap.key,
        image: snap.val().image,
        title: snap.val().title,
        content: snap.val().content,
        date: snap.val().date,
        view: snap.val().view
      })

      const options = {
        includeScore: true,
        keys: [
          "title",
          "content"
        ]
      }

      if (window.location.search.length > 2) {
        const fuse = new Fuse(posts, options);
        const result = fuse.search( this.searchText );

        if (result.length < 1 && window.location.search.length > 2) {
          document.getElementById("errorText").style.display = "block";
          document.getElementById("errorText").innerText = "Sonuç Bulunamadı :(";
          document.getElementById("loadingMini").style.display = "none";
        } else
          document.getElementById("errorText").style.display = "none";

        this.setState({ posts: result });
      } else {
        for (let i = posts.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [posts[i], posts[j]] = [posts[j], posts[i]];
        }

        this.setState({ posts: posts });
      }
    })

    window.addEventListener("keypress", (e) => {
      if (e.keyCode == "13") document.getElementById("searchIt").click();
    })

    document.getElementById("searchInput").value = this.searchText;
  }

  getLikeCount(postID) {
    var likes = 0;

    database.ref("posts/" + postID + "/likes").on("child_added", () => {
      likes = likes + 1;
    })

    return likes;
  }

  search() {
    if (document.getElementById("searchInput").value !== "") 
      window.location.href = `/ara?q=`+document.getElementById("searchInput").value; 
  }

  render() {
    return (
      <div>
        <Nav/>

        <div className="main">

          <div className="main2">
            <div className="searchContainer">
              <h1 className="searchTitle" style={{margin: "0", marginRight: "auto"}}>Yazılarda Ara</h1>

              <input type="search" id="searchInput" placeholder="Yazılarda Ara"></input>
              <button onClick={this.search} className="searchIt" id="searchIt" >
                <img
                  style={{
                    width: "24px",
                    height: "24px",
                    padding: "0",
                    background: "none"
                  }}
                  
                  src="/images/search.png"
                />
              </button>
            </div>

            <h1 style={this.searched == true ? {opacity: ".7"} : {display: "none"}}>
              "{this.searchText}" sorgusu için arama sonuçları:
            </h1>

            <p id="errorText" style={window.location.search.length > 2 ? 
              {}
            :
              {display: "none"}}
            >
              Aranıyor...
            </p>

            <div className="posts">
              {this.state.posts.length > 0 ? this.state.posts.map(post => {return (
                <a href={"/post/" + (this.searched == true ? post.item.id : post.id)}>
                  <div className="post">
                    <div className="image-div">
                      <img className="image" src={this.searched == true ? post.item.image : post.image}/>
                    </div>
                    
                    <div style={{padding: "0 16px"}}>
                      <h2 className="title">{this.searched == true ? post.item.title : post.title}</h2>
                      <div className="description">{this.searched == true ? post.item.content : post.content}</div>
                
                      <div style={{paddingTop: "10px", display: "flex", alignItems: "center"}}>
                        <div className="views">
                          <img src="/images/view.png" className="viewImage" />
                          {this.searched == true ? post.item.view : post.view}
                        </div>

                        <div className="likes">
                          <img src="/images/liked.png" className="likeImage" />
                          {this.getLikeCount(this.searched == true ? post.item.id : post.id)}
                        </div>

                        <div className="date">{ms(Date.now() - (this.searched == true ? post.item.date : post.date), {long: true}) + " önce"}</div>
                      </div>
                    </div>
                  </div>
                </a>
              )}) : <img id="loadingMini" src="/images/favicon.png" style={{top: "300px"}} />}
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
    )
  }
};

export default Search;