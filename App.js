import { Routes, Navigate, Route } from 'react-router-dom';
import { useContext } from 'react';
import Root from './components/Root';
import MedicineList from './components/MediciList';
import Cart from './components/Cart';
import AddForm from './components/AddForm';
import Mcontext from './Store/Mcontext';
import Login from './components/Login';
import SignupForm from './components/SignUp';
import NotFound from './components/NotFound';
const App = () => {
  const ctx = useContext(Mcontext);
  return (
    <>
        <Root>
          <Routes>
            <Route path='/'
              element={<Navigate to='/home'  />}
            />
               <Route path='/home' element={
              <MedicineList/>
            } />
            <Route path='/AddMed' element={
              <AddForm/>
            } />
            {ctx.isLogedin && <Route path='/Login/Cart/:userId' element={
                <Cart />}/>}
            <Route path='/Login' element={
              <Login />
                } />
            <Route path='/Signup' element={
                <SignupForm />}
                 />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Root>
   
    </>

  );
}

export default App;
