import React, {Component} from 'react';
import Comment from '../components/Comment';
import CommentForm from "../components/CommentForm";
import { database } from '../services/firebase';
import Skeleton from "react-loading-skeleton";
import LoadingComments from './LoadingComments';

class Comments extends Component {
constructor(props) {
  super(props);
  this.database = database.ref(`posts/${window.location.pathname.slice(6)}/comments`);
  this.state = {
    comments: [],

    loaded: false
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

  database.ref("posts").on("child_added", snap => {
    this.setState({ loaded: true });
  })
}

render() {return (
  <div id="comments">
    <CommentForm />

    {this.state.comments.length > 0 ?
      this.state.comments.map((comment) => {return (
        <Comment 
          commentContent={comment.commentContent}
          commentAuthor={comment.commentAuthor}
          commentDate={comment.commentDate}
          commentId={comment.id}
          key={comment.id}/>
      )}).reverse()
    : 
      (this.state.loaded == true ?
        ""
      :
        <LoadingComments />
      )
    }

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