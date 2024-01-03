import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


function RegisterPage(props) {
    const[formdata ,setformdata] = useState({});
    const [loading,setLoading] = useState(false);
    const[error,seterror] = useState(false);
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
            setLoading(true)
            seterror(false)
            const res = await fetch('/api/auth/register' , {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(formdata)
            })
            const data = await res.json();
            if(data.success === false){
                setLoading(false);
                seterror(data.message);
                return;
            }
            setLoading(false);
            navigate('/login');
            
        } catch (error) {
            seterror(error)
            setLoading(false)
            
        }
    }
    
    return (
        <div className='flex flex-col justify-start gap-20 uppercase my-10 items-center h-screen '>
            <h1 className='text-2xl font-semibold'>Register</h1>
            <form className='flex flex-col gap-3'  onSubmit={handleSubmit}>
                <input   className='border p-3 rounded-lg border-black' type='text' id='username' placeholder='username'  onChange={handleChange} required/>
                <input  className='border p-3 rounded-lg border-black' type='text' id='email' placeholder='email'  onChange={handleChange} required/>
                <input  className='border p-3 rounded-lg border-black' type='text' id='password' placeholder='password'  onChange={handleChange} required/>
                <button className='bg-gray-500 p-3 text-center uppercase rounded-lg text-white hover:opacity-90' >{loading ? 'Loading...' : 'Register'}</button>
                <div className='flex gap-3 text-sm '>
                <p>Have an account ?</p>
                <Link className='text-blue-600 hover:underline' to={'/login'}>Login here</Link>
                </div>
            </form>
            <div>
                <p>
                    {error && <p className='text-red-500'>{error}</p>}
                </p>
            </div>
        </div>
        
    );
}

export default RegisterPage;