import React from 'react';
import {Link} from 'react-router-dom';

function post({post}) {

  var date = new Date(post.createdAt)
  const datetoshow =date.toLocaleString('en-GB', {day:'numeric', month: 'long', year:'numeric'})
    return (
      <div className="sm:flex gap-32 my-16 ">

      <Link className='w-1/3' to ={`/post/${post._id}`}>
      <img className=" h-full rounded-lg hover:transform hover:scale-105 hover:shadow-lg hover:cursor-pointer"  src={post.imageUrl} alt="post image" />
      </Link>      
    
      
      <div className=" w-2/3 flex flex-col gap-4">
      <Link to={`/post/${post._id}`}>
      <h2 className="text-2xl font-semibold cursor-pointer hover:text-blue-700">{post.title}</h2>
      </Link>
      <div className="flex gap-4 text-gray-500">
        @{post.username}
        <time>{datetoshow}</time>
      </div> 
      <p className="text-gray-500 line-clamp-5">{post.summary}</p>
      </div>
    </div>
    );
}

export default post;