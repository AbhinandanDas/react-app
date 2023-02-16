import React from 'react' // use command "rfce " to add the boilerplate code.
import {Formik,Form,Field,ErrorMessage} from "formik";
import * as Yup from "yup";
import axios from "axios";
// import {useNavigate} from "react-router-dom";

function Signup() {
    const initialValues = {
        username:"",
        password:"",
    };
    
    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required("username required!"),
        password: Yup.string().min(5).max(15).required("Please enter the password"),
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/auth",data).then(() => { //  API request is sent to this URL.
            console.log("User Created")
        })
    }

    return (
        <div>
            <Formik initialValues={initialValues} onSubmit = {onSubmit} validationSchema = {validationSchema}>
                <Form className="formContainer"> 
                    <label>Username: </label>
                    <ErrorMessage name="username" component = "span"/>
                    <Field autoComplete="off" id="inputCreatePost" name="username" placeholder="eg: abhi123"/>
                    <label>Password: </label>
                    <ErrorMessage name="password" component = "span"/>
                    <Field type="password" autoComplete="off" id="inputCreatePost" name="password" placeholder="enter password.."/>
                    <button type="submit">Sign Up</button>
                </Form>
            </Formik>
        </div>
    )
}

export default Signup