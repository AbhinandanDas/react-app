import React from "react";
import {Formik,Form,Field,ErrorMessage} from "formik";
import * as Yup from "yup";

function CreatePost() {
    const initialValues = {
        title:"",
        description:"",
        username:"",
    };

    const onSubmit = (data) => {
        console.log(data);
    }
    
    const validationSchema = Yup.object().shape({
        title: Yup.string().required(),
        description: Yup.string().required(),
        username: Yup.string().min(3).max(15).required(),
    });

    return (
        <div className="createPostPage">
            <Formik initialValues={initialValues} onSubmit = {onSubmit} validationSchema = {validationSchema}>
                <Form className="formContainer">
                    <label>Title: </label>
                    <ErrorMessage name="title" component="span"/>
                    <Field autocomplete="off" id="inputCreatePost" name="title" placeholder="Lorem Ipsum Title"/>
                    <label>Description: </label>
                    <ErrorMessage name="description" component = "span"/>
                    <Field autocomplete="off" id="inputCreatePost" name="description" placeholder="Lorem Ipsum"/> 
                    <label>Username: </label>
                    <ErrorMessage name="username" component = "span"/>
                    <Field autocomplete="off" id="inputCreatePost" name="username" placeholder="Lorem Ipsum Username"/>
                    <button type="submit">Create Post</button>
                </Form>
            </Formik>
        </div>
    )
}

export default CreatePost;