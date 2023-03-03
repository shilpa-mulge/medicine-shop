import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import Mcontext from "./Mcontext";
const McontextProvider = (props) => {
    const [totalAmount, setTotalAmount] = useState(0);
   const [store,setStore]=useState([]);

    //Storing token, email to localStorage
    const item = localStorage.getItem('token');
    let intialToken = JSON.parse(item);
    const now = new Date();
    if (intialToken !== null && now.getTime() > intialToken.expiry) {
        localStorage.removeItem('token')
        intialToken.idToken = null;
        intialToken.emailId = null

    }

    const [token, setToken] = useState(intialToken ? intialToken.idToken : '');
    const [email, setEmail] = useState(intialToken ? intialToken.emailId : '')
    const [cart, setCart] = useState([]);
    const userLoggedIn = !!token;

    const OnRemoveHandler = async (id) => {
        const updatedCart = cart.filter(product => product.id !== id);
        const productindex = cart.findIndex(item => item.id === id)
        const product = cart[productindex]
        setCart(updatedCart);
        setTotalAmount(preAmount => preAmount - product.price * product.amount)
        try {
            const response = await axios.delete(`https://react-app-cd331-default-rtdb.firebaseio.com/${email}/${id}.json`)
        } catch (error) {
            alert(error.message)
        }
    }



    const loginHandler = (token, email) => {
        const item = {
            emailId: email,
            idToken: token,
            expiry: new Date().getTime() + 10 * 60000
        }
        setEmail(email)
        setToken(token)
        localStorage.setItem('token', JSON.stringify(item))
    }

    const logoutHandler = () => {
        setToken(null)
        localStorage.removeItem('token')
    }

    const onShowCart = useCallback(async () => {
        try {
            const response = await axios.get(`https://react-app-cd331-default-rtdb.firebaseio.com/${email}.json`)
            const loadArr = [];
            for (const key in response.data) {
                loadArr.push({
                    id: key,
                    name: response.data[key].name,
                    description: response.data[key].description,
                    price: response.data[key].price,
                    amount: response.data[key].amount
                })
            }
            setCart(loadArr)
            const updatedAmount = loadArr.reduce((currentValue, product) => {
                return currentValue += product.price * product.amount;
            }, 0)
            setTotalAmount(updatedAmount)

        }
        catch (error) {
            alert(error.response.data.error.message)
        }
    }, [email])

    useEffect(() => {
        onShowCart()
    }, [onShowCart]);

const onShowStoreHandler=useCallback(async () => {
    try {
        const response = await axios.get(`https://react-app-cd331-default-rtdb.firebaseio.com/store.json`)
        const loadArr = [];
        for (const key in response.data) {
            loadArr.push({
                id: key,
                name: response.data[key].name,
                description: response.data[key].description,
                price: response.data[key].price,
            })
        }
        setStore(loadArr)

    }
    catch (error) {
        alert(error.response.data.error.message)
    }
}, [])

useEffect(()=>{
    onShowStoreHandler();
},[onShowStoreHandler])


    const eContext = {
        totalAmount: totalAmount,
        onRemoveProd: OnRemoveHandler,
        cart: cart,
        store:store,
        onShowStore:onShowStoreHandler,
        onShowCart: onShowCart,
        email: email,
        token: token,
        isLogedin: userLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
    }
    return (
        < Mcontext.Provider value={eContext}>{props.children}</Mcontext.Provider>
    )

}
export default McontextProvider;