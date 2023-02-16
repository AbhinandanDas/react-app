import React,{useEffect, useState} from 'react'
import {useParams,useNavigate} from 'react-router-dom'
import axios from 'axios';

function Profile() {
    let { id } = useParams();
    const [username,setUserName] = useState("")
    const [listOfPosts,setListOfPosts] = useState([])
    let navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:3001/auth/basicinfo/${id}`).then((response) => {
            setUserName(response.data.username)
        })
        axios.get(`http://localhost:3001/posts/byuserId/${id}`).then((response) => {
            setListOfPosts(response.data)
        })
    },[])

    return (
        <div className="profilePageContainer"> 
            <div className="basicInfo">
                <h1> Username: {username} </h1>
            </div>
            <div className = "listOfPosts">

                {listOfPosts.map((value,key) => {
                    return(
                        <div key = {key} className = "post">
                            <div className = "title">{value.title}</div>
                            <div className = "description" onClick={()=>{navigate(`/post/${value.id}`)}}> {value.description} </div>
                            <div className="footer">
                                <div className="username"> {value.username} </div>
                                <div className="buttons">
                                    <label> {value.Likes.length}</label>
                                </div>
                            </div>
                        </div>
                    )
                })

                }
            </div>
        </div>
    )
}

export default Profile