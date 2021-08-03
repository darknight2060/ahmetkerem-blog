import React, {Component} from 'react';
import Comment from '../components/Comment';
import CommentForm from "../components/CommentForm";
import { database } from '../services/firebase';

class Comments extends Component {
constructor(props) {
  super(props);
  this.database = database.ref(`posts/${window.location.pathname.slice(6)}/comments`);
  this.state = {
    comments: [],
  };
}

componentWillMount() {
  const previousComments = this.state.comments;
  this.database.on('child_added', snap => {
    previousComments.push({
      id: snap.key,
      commentAuthor: snap.val().commentAuthor,
      commentContent: snap.val().commentContent,
      commentDate: snap.val().commentDate,
    })
    
    this.setState({
      comments: previousComments,
    })
  })
  this.database.on('child_removed', snap => {
    for (var i = 0; i < previousComments.length; i++) {
      if (previousComments[i].id === snap.key) {
        previousComments.splice(i, 1);
      }
    }

    this.setState({
      comments: previousComments,
    })
  })
}

render() {return (
  <div id="comments">
    <CommentForm/>

    {this.state.comments.map((comment) => {return (
      <Comment 
        commentContent={comment.commentContent}
        commentAuthor={comment.commentAuthor}
        commentDate={comment.commentDate}
        commentId={comment.id}
        key={comment.id}/>
    )}).reverse()}

    <style>{`
      #comments {
        padding: 10px 30px 35px;
      }

      .comments-title {
        font-size: 18px;
        font-weight: normal;
        margin: 10px;
        user-select: none;
      }

      @media (max-width: 700px) {
        #comments {
          padding: 10px 10px 35px;
        }
      }
    `}</style>
  </div>
)}};

export default Comments;