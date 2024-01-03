import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {logout} from './redux/user/slice.js'
import { useDispatch } from 'react-redux';

function Header(props) {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  async function handleLogout(e) {
    e.preventDefault();
    try {
      const res = await fetch('/api/user/logout');
      const data = await res.json();
      
       dispatch(logout());
    } catch (error) {
      console.log(error);
    }
    
  }

    return (
    <header className="flex justify-between items-center">
      <Link className ="font-bold text-2xl" to={'/'}>MY BLOG</Link>
      <nav className="flex">
      {!currentUser? (
        <div className='flex gap-4'>
        <Link className='text-gray-500 hover:underline hover:font-semibold' to={'/login'}>Login</Link>
        <Link className='text-gray-500 hover:underline hover:font-semibold' to={'/register'} >Register</Link>
        </div>
      ) :
      <div className='flex gap-4'>
      <Link className='text-gray-500 hover:underline hover:font-semibold' to={'/create'}>Create a new post</Link>
      <span className='text-gray-500 hover:underline cursor-pointer hover:font-semibold' onClick={handleLogout}>Logout</span>
      </div>
      }
        

      </nav>
    </header>
    );
}

export default Header;