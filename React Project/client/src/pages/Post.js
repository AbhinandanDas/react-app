import React,{useEffect,useState} from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

function Post() {
    let {id} = useParams();
    const [postObject, setPostObject] = useState({});
    const [fetchComment,setComment] = useState([]);
    const [newComment, setNewComment] = useState("");

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
                accessToken: sessionStorage.getItem("accessToken"),
            }
        }
        ).then((response) => {
            if(response.data.error){
                alert(response.data.error)
            }
            else{
                const commentToAdd = {commentBody: newComment};
                setComment([...fetchComment,commentToAdd]);
                setNewComment("");
            }
        })
    }

    return(
        <div className = "postPage">
            <div className = "leftSide">
                <div className = "post" id = "individual">
                    <div className = "title">{postObject.title}</div>
                    <div className = "description">{postObject.description}</div>
                    <div className = "username">{postObject.username}</div>
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
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Post;