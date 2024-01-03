import React, { useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom';
import post from '../post';
import {formatISO9075} from 'date-fns';
import {useSelector} from 'react-redux';

function FullPost(props) {
    const {id} = useParams();
    const[postInfo,setPostInfo] = useState(null);
    console.log(postInfo)

    const {currentUser} = useSelector((state) => state.user);


    useEffect(()=>{
        async function getPost(params) {
            try {
                const res = await fetch(`/api/user/post/${id}`);
                const data = await res.json();
                setPostInfo(data);
            } catch (error) {
                console.log(error);
            }    
        }

        getPost();
        
    },[])

    if(!postInfo) return '';

    return (
        <div  className='flex flex-col mt-7 gap-4'>
            <h1 className='text-5xl font-bold text-center'>{postInfo.title}</h1>
            <div className='flex flex-col gap-2 '>
            <time className='text-center  text-gray-400'>{formatISO9075(new Date(postInfo.createdAt))}</time>
            <span className='text-center text-sm font-bold'>{currentUser &&currentUser.username === postInfo.username ? <Link className='bg-gray-700 text-white p-1 rounded-lg font-semibold  ' to={`/edit/${postInfo._id}`}>Edit this post</Link> : `By ${postInfo.username}`}</span>
            </div>
            
            <img className='h-[400px] object-cover overflow-hidden bg-center' src={postInfo.imageUrl} alt='postImage' />
            <div className="" dangerouslySetInnerHTML={{__html:postInfo.content}} />
        </div>
    );
}

export default FullPost;