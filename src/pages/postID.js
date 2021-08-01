import React from "react";
import Footer from '../components/Footer';

const BlogPost = ({ post }) => {return (
  <div className="container">
    <div className='main'>
    <div className="card">
      <div className='card-image-c'><img src={post.image} alt="Blog Fotoğrafı" className='card-image' draggable="false"/></div>
      <h1 className="card-title">{post.title}</h1>
      <div className="card-text">{post.aciklama}</div>
      <div className="card-date">{post.date}</div>
    </div>
    </div>
   <Footer/>
    
    <style>{`
        .main {
          max-width: 762px;
          width: 100%;
          margin: 0 auto;
          margin-top: 100px;
          padding: 0;
        }

        .card {
          color: #fff;
          border-radius: 3px;
          padding: 25px;
          background: #2c2f33;
          box-shadow: 0px 0px 4px rgba(0,0,0,.8);
          width: 100%;
          text-align: center;
        }

        img {
          position: relative;
          margin: auto;
          border-radius: 5px;
          width: 100%;
          height: 300px;
          object-fit: cover;
        }

        .card-title {
          margin-top: 30px;
          margin-bottom: 50px;
          text-align: center;
          position: center;
          font-size: 48px;
        }

        .card-date {
          margin-top: 50px;
          text-align: right;
          color: #fff;
        }

        @media (max-width: 623px) {
          .main {
            width: 100%;
          }

          .card {
            margin: 0 auto;
          }

          .date {
            margin: 10px 0 0px 0;
          }
        }
    `}</style>
  </div>
)};

export default BlogPost;