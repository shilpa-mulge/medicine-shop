import React, { useContext } from 'react';
import { Navbar, Nav, Badge } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Mcontext from '../Store/Mcontext';


function WelCome() {
    const ctx = useContext(Mcontext);
    let totalQuantity = ctx.cart.reduce((currentValue, product) => {
        return currentValue +=Number(product.amount);
    }, 0)

    const logoutHandler = () => {
        ctx.logout();
    }
    const ShowCartItemsHandler = () => {
        ctx.onShowCart()
    }

    return (
        <Navbar fixed="top" bg="dark" variant="dark"> 
            <Nav className="me-auto">
                <Nav.Item>
                    <Nav.Link as={NavLink} to="/home">Home</Nav.Link>
                </Nav.Item>
                {!ctx.isLogedin && <Nav.Item>
                    <Nav.Link as={NavLink} to='/Login' >Login</Nav.Link>
                </Nav.Item>}
                {!ctx.isLogedin && <Nav.Item>
                    <Nav.Link as={NavLink} to='/Signup' >Signup</Nav.Link>
                </Nav.Item>}
                {ctx.isLogedin && <Nav.Item>
                    <Nav.Link as={NavLink} to='/' onClick={logoutHandler} >Logout</Nav.Link>
                </Nav.Item>}
               {ctx.isLogedin&& <Nav.Item>
                    <Nav.Link as={NavLink} to="/AddMed">Add Medicine</Nav.Link>
                </Nav.Item>}
            </Nav>
            <Nav className='ms-auto'>
                {ctx.isLogedin && <Nav.Item>
                    <Nav.Link as={NavLink} to={`/Login/Cart/${ctx.token}`} onClick={ShowCartItemsHandler}>
                        Cart
                        <Badge bg="light" style={{
                     color: '#56CCF2',
                            fontSize: '10px'
                        }}>{totalQuantity}</Badge>

                    </Nav.Link>
                </Nav.Item>}
            </Nav>
        </Navbar>
    );
}

export default WelCome;
