import { Form, Button } from "react-bootstrap";
import React,{useContext, useRef} from "react";
import Mcontext from "../Store/Mcontext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const MedicineForm=props=>{
    const ctx=useContext(Mcontext)
    const amountRef=useRef();
    const Navigate=useNavigate()
    const onSubmitHandler=async(event)=>{
        event.preventDefault();
        if(ctx.isLogedin){
        const obj={
            name:props.name,
            description:props.description,
            price:props.price,
            amount:amountRef.current.value
        }
        try {
            await axios.post(`https://react-app-cd331-default-rtdb.firebaseio.com/${ctx.email}.json`, obj)
ctx.onShowCart()
        } catch (error) {
            alert(error.response.data.error.message)
        }
    }else{
        Navigate('/Login')
    }
    }
    
return (
<>
<Form className="form-inline" onSubmit={onSubmitHandler}>
            <Form.Control type="number" defaultValue={1} min={1} ref={amountRef} /> 
                <Button style={{fontSize:'10px'}}  type="submit">
                    Add to Cart
                </Button>
                </Form>
</>
)
}
export default MedicineForm;