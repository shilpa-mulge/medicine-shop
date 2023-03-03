import { useContext } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import Mcontext from '../Store/Mcontext';
const CartItem = props => {
    const ctx = useContext(Mcontext)
    const onAddHandler = async () => {
        const productObj = {
            name: props.name,
            price: Number(props.price),
            description: props.description,
            amount: Number(props.amount) + 1
        }

        try {
            const response = await axios.put(`https://react-app-cd331-default-rtdb.firebaseio.com/${ctx.email}/${props.id}.json`, productObj)
            ctx.onShowCart()
        } catch (error) {
            alert(error.response.data.error.message)
        }
    }

    const onRemoveHandler = async () => {
        const productObj = {
            name: props.name,
            price: Number(props.price),
            description: props.description,
            amount: Number(props.amount - 1)
        }

        try {
            const response = await axios.put(`https://react-app-cd331-default-rtdb.firebaseio.com/${ctx.email}/${props.id}.json`, productObj)
            ctx.onShowCart()
        } catch (error) {
            alert(error.response.data.error.message)
        }
    }
    return (
        <>
            <hr />
            <Row key={props.id} className="justify-content-center align-items-center">
                <Col><p>{props.name}</p>
                </Col>
                <Col><p>{props.description}</p>
                </Col>
                <Col>
                    <h3 className="fw-bold">
                        Q{props.amount}
                        <button onClick={onAddHandler}>+</button>
                        <button onClick={props.amount > 1 ? onRemoveHandler : props.onRemove}>-</button>
                    </h3>
                </Col>
                <Col>
                    <h3 className="fw-bold">${props.price} </h3>
                    <Button onClick={props.onRemove} variant="danger">
                        Remove
                    </Button>
                </Col>
            </Row>
        </>
    )
}
export default CartItem;