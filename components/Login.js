import React, { useRef, useContext } from "react";
import classes from './Login.module.css';
import { Form, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Mcontext from "../Store/Mcontext";
const Login = () => {
    const ctx = useContext(Mcontext)
    const history = useNavigate()
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const LoginHandler = async (e) => {
        e.preventDefault();
        const enterdEmail = emailInputRef.current.value;
        const enterdPassword = passwordInputRef.current.value;
        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB2IbR8h8-w-hfsXzEWYgYExp3fG4R8PQ8', {
                email: enterdEmail, password: enterdPassword, returnSecureToken: true
            })
            const nameId = response.data.email.split('@')[0];
            ctx.login(response.data.idToken, nameId)
            history('/home')
        }
        catch (error) {
            alert(error.response.data.error.message)
        }
    }

    return (
        <>
            <div className={classes.container}>
                <Form className={classes.form} onSubmit={LoginHandler}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" ref={emailInputRef} />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" ref={passwordInputRef} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
            </div>
        </>
    )
}
export default Login;