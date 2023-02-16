import React,{useEffect,useState,useContext} from "react";
import { useParams,useNavigate} from "react-router-dom";
import axios from 'axios';
import { AuthContext } from "../helpers/AuthContext"; 

function Post() {
    let {id} = useParams()
    const [postObject, setPostObject] = useState({});
    const [fetchComment,setComment] = useState([]);
    const [newComment, setNewComment] = useState("");
    const { authState  } = useContext(AuthContext)
    let navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
            setPostObject(response.data);
        });
        axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
            setComment(response.data);
        });
    },[]);

    const addComment = () => {
        axios.post("http://localhost:3001/comments",{
            commentBody: newComment,
            PostId: id,
        },
        {
            headers : {
                accessToken: localStorage.getItem("accessToken"),
            }
        }
        ).then((response) => {
            if(response.data.error){
                alert(response.data.error)
            }
            else{
                const commentToAdd = {commentBody: newComment,
                                      username: response.data.username,
                                      id: response.data.id,}; // optimistic rendering.
                setComment([...fetchComment,commentToAdd]);
                setNewComment("");
            }
        })
    }

    const deleteComment = (id) => { // frontend API call to delete the comment.
        axios.delete(`http://localhost:3001/comments/${id}`,{
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }).then(() => {
            setComment(fetchComment.filter( (val) => {
                return val.id!==id
            }))
        })
    }

    const deletePost = (id) => {
        axios.delete(`http://localhost:3001/posts/${id}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }).then(() => {
            navigate("/")
        })
    }

    // frontend function to make API call for updating title or description of post.
    const editPost = (option) => {
        if(option === "title"){
            let newTitle = prompt("Enter new title")
            axios.put("http://localhost:3001/posts/title", {
                newTitle : newTitle,
                id: id
            }, {
                headers: { accessToken: localStorage.getItem("accessToken")}
            })
        }else {
            let newDescription = prompt("Enter new description")
            axios.put("http://localhost:3001/posts/description", {
                newDescription : newDescription,
                id:id
            }, {
                headers: {
                    accessToken: localStorage.getItem("accessToken")
                }
            })
        }
    }

    return(
        <div className = "postPage">
            <div className = "leftSide">
                <div className = "post" id = "individual">
                    <div className = "title" onClick={()=> { if(authState.username === postObject.username) {editPost("title")}}} >{postObject.title}</div>
                    <div className = "description" onClick = {() => { if(authState.username === postObject.username) {editPost("description")}}} >{postObject.description}</div>
                    <div className = "footer">
                        {postObject.username}
                        {authState.username === postObject.username && (
                        <button onClick={() => { deletePost(postObject.id)}}> DELETE </button>
                        )}
                    </div>
                </div>    
            </div>
            <div className = "rightSide">
                <div className = "addCommentContainer">
                    <input type = "text" placeholder = "Comment..." autoComplete = "off" value = {newComment} onChange = {(event) => {
                        setNewComment(event.target.value);
                    }} />
                    <button onClick={addComment}> Add Comment</button>
                </div>
                <div className = "listOfComments">
                    {fetchComment.map((comment,key) => {
                        return (
                            <div key = {key} className = "comment">
                                {comment.commentBody}
                                <label>Username: {comment.username}</label>
                                
                                {authState.username === comment.username && (
                                    <button onClick={() => { deleteComment(comment.id)}}> X </button>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Post;