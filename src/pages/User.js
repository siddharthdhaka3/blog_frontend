import Post from "../Post";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

export default function User() {
  const [posts,setPosts] = useState([]);
  const {username} = useParams();
  useEffect(() => {
    fetch('http://localhost:4000/post').then(response => {
      response.json().then(posts => {
        setPosts(posts);
      });
    });
  }, []);
  return (
    <>
    <h1>Blogs by {username}</h1>
      {posts.length > 0 && posts
  .filter(post => post.author.username === username) // Filter posts by username
  .map(post => (
    <Post {...post} />
  ))
}
    </>
  );
}