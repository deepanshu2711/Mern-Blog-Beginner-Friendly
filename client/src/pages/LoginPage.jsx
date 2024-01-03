import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import{loginStart,loginSuccess,loginFailure} from '../redux/user/slice.js'

function LoginPage(props) {
    
    const dispatch = useDispatch();
    const[formdata ,setformdata] = useState({});
    const {loading,error} = useSelector((state) => state.user);
    const navigate = useNavigate();
    

    function handleChange(e) {
        setformdata({
            ...formdata,
            [e.target.id] : e.target.value
        })
    }

     async function handleSubmit(e) {
        e.preventDefault();
        try {
            dispatch(loginStart());
            const res = await fetch('/api/auth/login' , {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(formdata)
            })
            const data = await res.json();
            if(data.success === false){
                dispatch(loginFailure(data.message));
                return;
            }
            dispatch(loginSuccess(data));
            navigate('/');
            
        } catch (error) {
            dispatch(loginFailure(error));
            
        }
    }
    
    return (
        <div className='flex flex-col justify-start gap-20 uppercase my-10 items-center h-screen '>
            <h1 className='text-2xl font-semibold'>Login</h1>
            <form className='flex flex-col gap-3'  onSubmit={handleSubmit}>
                <input  className='border p-3 rounded-lg border-black' type='text' id='email' placeholder='email'  onChange={handleChange} required/>
                <input  className='border p-3 rounded-lg border-black' type='text' id='password' placeholder='password'  onChange={handleChange} required/>
                <button className='bg-gray-500 p-3 text-center uppercase rounded-lg text-white hover:opacity-90' >{loading ? 'Loading...' : 'Login'}</button>
                <div className='flex gap-3 text-sm '>
                <p>Dont have an account ?</p>
                <Link className='text-blue-600 hover:underline ' to={'/register'}>Register here</Link>
                </div>
                <div>
                    <p>{error&&<p className='text-red-500 text-center mt-10'>{error}</p>}</p>
                </div>
            </form>
        </div>
        
    );
}

export default LoginPage;