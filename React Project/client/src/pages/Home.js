import React from "react";
import axios from "axios";
import {useEffect,useState,useContext} from "react";
import {useNavigate} from "react-router-dom"
import { AuthContext } from "../helpers/AuthContext";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

function Home() {
    const [listOfPosts,setListofPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);
    const { authState } = useContext(AuthContext)

    let navigate = useNavigate();

    useEffect(() => {
      if(!localStorage.getItem("accessToken")) {
        navigate("/login")
      }
      else{
        axios.get("http://localhost:3001/posts", {
          headers: {
            accessToken: localStorage.getItem("accessToken")
          }
        }).then((response) => {
          setListofPosts(response.data.listOfPosts);
          setLikedPosts(response.data.likedPosts.map((like) => {
            return like.PostId; // storing id(only) of the post inside likedPosts.
          }))
        });
    } 
    },[]);

    const likePost = (postId) => {
      axios.post("http://localhost:3001/like", {postId : postId}, {
        headers: {
            accessToken: localStorage.getItem("accessToken")
        }
      }).then((response) => {
          setListofPosts(listOfPosts.map((post) => {
            if(post.id === postId) {
              if(response.data.liked) {
                return  {...post , Likes : [...post.Likes,0]}
              }
              else {
                const likesArray = post.Likes
                likesArray.pop()
                return {...post, Likes: likesArray}
              }
            }
            else
              return post
          }))
          if(likedPosts.includes(postId)) {
            setLikedPosts(likedPosts.filter((id) => { 
              return id!==postId; // if the post is not liked, then return all the posts to the liked list except for the one that is liked.
            }))
          }
          else {
            setLikedPosts([...likedPosts, postId]) //  if the post is liked then add it to the list of liked posts.
          }
      })
    }

    return (
        <div className="App">
        {listOfPosts.map((value,key) => {
          return (
            <div key = {key} className="post">
              <div className="title"> {value.title} </div> 
              <div className="description" onClick={() => navigate(`/post/${value.id}`)}> {value.description} </div>
              <div className = "footer">
                <div className="username"> {value.username}</div>
                  <div className = "buttons">
                    <ThumbUpAltIcon onClick={() => likePost(value.id)} className = {likedPosts.includes(value.id) ? "unlikeButton" : "likeButton"}/> 
                    <label> {value.Likes.length} </label>
                  </div>
              </div>    
            </div>

          )
        })
         }
        </div>
      );
}

export default Home;