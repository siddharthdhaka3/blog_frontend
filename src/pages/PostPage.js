import {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {formatISO9075} from "date-fns";
import {UserContext} from "../UserContext";
import {Link} from 'react-router-dom';
import CommentItem from "../CommentItem";

export default function PostPage() {
  const [postInfo,setPostInfo] = useState(null);
  const {userInfo} = useContext(UserContext);
  const username = userInfo?.username;

  const {id} = useParams();
  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`)
      .then(response => {
        response.json().then(postInfo => {
          setPostInfo(postInfo);
        });
      });
  }, []);

  const [comms,setComms] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:4000/comment/${id}`).then(response => {
      response.json().then(comms => {
        setComms(comms);
      });
    });
  }, []);
 
  
  const [comment, setComment] = useState(null);
  async function submitComment(ev){
    ev.preventDefault();
    const response = await fetch('http://localhost:4000/comment', {
      method: 'POST',
      body: JSON.stringify({comment, id}),
      headers: {'Content-Type':'application/json'},
      credentials: 'include',
    });

    const newComment = await response.json();
    
   
    setComment("");
    setComms(prevComms => [...prevComms, newComment]);
    
    window.alert('Comment posted successfully!');
    
  }
  
  
  if (!postInfo) return '';
  
  return (
    <div className="post-page">
      
      <h1>{postInfo.title}</h1>
      <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
      <div className="author">
        <Link className="edit-btn" to={`/user/${postInfo.author.username}`}>
        by @{postInfo.author.username}
        
        </Link>
        </div>


      {userInfo.id === postInfo.author._id && (
        <div className="edit-row">
          <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            Edit this post
          </Link>
        </div>
      )}
<div style={{ display: 'flex', gap: '1px' }}>
  <a href={`https://www.facebook.com/sharer/sharer.php?u=https://dailyblogsbysid.netlify.app/post/${id}`} target="_blank" rel="noopener noreferrer">
    <img src="https://static.vecteezy.com/system/resources/previews/018/930/698/original/facebook-logo-facebook-icon-transparent-free-png.png" width="50" height="50" alt="Facebook Icon" />
  </a>
  <a href={`https://twitter.com/intent/tweet?url=https://dailyblogsbysid.netlify.app/post/${id}`} target="_blank" rel="noopener noreferrer">
    <img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/twitter-icon.png" width="50" height="50" alt="Twitter Icon" />
  </a>
</div>

      <div className="image">
        <img src={postInfo.cover} alt=""/>
      </div>
      <div className="content" dangerouslySetInnerHTML={{__html:postInfo.content}} />
      
      <div className="comment-box">
      {username? (
        <form onSubmit={submitComment}>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your comment here..."
            required
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      ) : (
        <p>Please log in to leave a comment.</p>
      )}
    </div>
      {comms.length > 0 && comms.map(comm => (
        <CommentItem _id={comm._id} comm={comm} userInfo={userInfo} comms={comms} setComms={setComms} />
      ))}
    </div>
  );
}