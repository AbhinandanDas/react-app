import React from "react";
import axios from "axios";
import {useEffect,useState} from "react";
import {useNavigate} from "react-router-dom"

function Home() {
    const [listOfPosts,setListofPosts] = useState([]);

    let navigate = useNavigate();

    useEffect(() => {
      axios.get("http://localhost:3001/posts").then((response) => {
        setListofPosts(response.data);
      });
    },[]);

    return (
        <div className="App">
        {listOfPosts.map((value,key) => {
          return (
            <div className="post" onClick={() => navigate(`/post/${value.id}`)}>
              <div className="title"> {value.title} </div> 
              <div className="description"> {value.description} </div>
              <div className="username"> {value.username} </div>
            </div>
          )
        })
         }
        </div>
      );
}

export default Home;