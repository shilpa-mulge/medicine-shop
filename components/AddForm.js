import classes from './AddForm.module.css';
import React, { useState, useRef, useContext } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import Mcontext from '../Store/Mcontext';
import { useNavigate } from 'react-router-dom';
const AddForm = () => {
    const Navigate=useNavigate()
  const ctx=useContext(Mcontext)
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const nameInputRef = useRef();
    const desInputRef = useRef();
    const priceInputRef = useRef();
    async function DetailsSubmitHandler(event) {
        event.preventDefault();
        const name = nameInputRef.current.value;
        const description = desInputRef.current.value;
        const price = priceInputRef.current.value;
        const userObj = { name: name, description: description, price: price }

        try {
            await axios.post('https://react-app-cd331-default-rtdb.firebaseio.com/store.json', userObj)
            setShowSuccessMessage(true);
            nameInputRef.current.value = '';
            desInputRef.current.value = '';
            priceInputRef.current.value = '';
ctx.onShowStre();
Navigate('/home')
        } catch (error) {
            alert(error.response.data.error.message)
        }
    }
    return (<>
        <div className={classes.container} >
            <h1 >Add Medicine</h1>
            <Form className={classes.form} onSubmit={DetailsSubmitHandler} >
                {showSuccessMessage && (
                    <Alert variant="success">
                        Medicine added successfully!
                    </Alert>
                )}
                <Form.Group >
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="name" ref={nameInputRef} />
                </Form.Group>
                <Form.Group >
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" ref={desInputRef} />
                </Form.Group>
                <Form.Group >
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="text" ref={priceInputRef} />
                </Form.Group>
                <Button variant="secondary" type="submit">
                    Add to store
                </Button>
            </Form>
        </div>
    </>
    )
}
export default AddForm;
