import React from "react";
import {Formik,Form,Field,ErrorMessage} from "formik";
import * as Yup from "yup";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function CreatePost() {
    let navigate = useNavigate();

    const initialValues = {
        title:"",
        description:"",
        username:"",
    };

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/posts",data).then((response) => {
            navigate("/");
        });
    };
    
    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Title required!"),
        description: Yup.string().required("descrption required!"),
        username: Yup.string().min(3).max(15).required("username required!"),
    });

    return (
        <div className="createPostPage">
            <Formik initialValues={initialValues} onSubmit = {onSubmit} validationSchema = {validationSchema}>
                <Form className="formContainer">
                    <label>Title: </label>
                    <ErrorMessage name="title" component="span"/>
                    <Field autoComplete="off" id="inputCreatePost" name="title" placeholder="Lorem Ipsum Title"/>
                    <label>Description: </label>
                    <ErrorMessage name="description" component = "span"/>
                    <Field autoComplete="off" id="inputCreatePost" name="description" placeholder="Lorem Ipsum"/> 
                    <label>Username: </label>
                    <ErrorMessage name="username" component = "span"/>
                    <Field autoComplete="off" id="inputCreatePost" name="username" placeholder="Lorem Ipsum Username"/>
                    <button type="submit">Create Post</button>
                </Form>
            </Formik>
        </div>
    )
}

export default CreatePost;