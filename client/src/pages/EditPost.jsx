import React, { useEffect, useState } from 'react';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import {app} from "../Firebase.js";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function EditPost(props) {
    const {currentUser} = useSelector((state) => state.user);

    const [createPostData, setCreatePostData] = useState({
        title: '',
        summary: '',
        imageUrl: '',
        content: '',
        username:currentUser.username
    });

    const[file,setfile] = useState(undefined);
    const[uploading,setuploading] = useState(false);
    const navigate = useNavigate();
    const[loading,setloading] = useState(false);  
    const {id} = useParams();
    console.log(createPostData)

    function handleChange1(e) {
        
        setCreatePostData(prevData => ({
            ...prevData,
            [e.target.id]: e.target.value
        }));
    }
    function handleChange2(e) {
        
        setCreatePostData(prevData => ({
            ...prevData,
            [e.target.id]: e.target.value
        }));
    }

    function handleContentChange(content) {
        setCreatePostData(prevData => ({
            ...prevData,
            content: content
        }));
    }

    // function handleFileChange(e) {
    //     setCreatePostData({
    //         ...createPostData,
    //         file: e.target.files[0]
    //     });
    // }
    
    async function handleSubmit(e) {
        e.preventDefault();
       try {
        const res = await fetch(`/api/user/edit/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(createPostData)
        });
        const data = await res.json();
        navigate('/');
       } catch (error) {
        console.log(error)
       }
    }

    function handleFileUpload(file) {
        if(file){
            setuploading(true);
            const storage = getStorage(app);
            const fileName = new Date().getTime()+file.name;
            const storageRef = ref(storage,fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed',
            (snapshop)=>{
                console.log(snapshop)
            },
            (error) =>{
                console.log(error);
                setuploading(false)
            },
            (async()=>{
                await getDownloadURL(uploadTask.snapshot.ref).then((getDownloadURL)=>{
                    setCreatePostData({
                        ...createPostData,
                        imageUrl:getDownloadURL
                    });
                    setuploading(false);
                })
            })
            )
            
        }
    }

    useEffect(() => {
        async function getPost() {
            try {
                const res = await fetch(`/api/user/post/${id}`);
                const data = await res.json();
                setCreatePostData(prevData => ({
                    ...prevData,
                    title: data.title,
                    summary: data.summary,
                    imageUrl: data.imageUrl,
                    content: data.content,
                    username: data.username
                }));
            } catch (error) {
                console.log(error);
            }
        }
    
        getPost();
    }, [id]);
    
    
    return (
        <div className='mt-8'>
            <form className='flex flex-col w-full' onSubmit={handleSubmit}>
                <input defaultValue={createPostData.title} type='text' placeholder='Title' className='border p-3 rounded-lg' id='title' onChange={handleChange1}/>
                <input defaultValue={createPostData.summary} type='text' placeholder='Summary' className='border p-3 rounded-lg ' id='summary' onChange={handleChange2}/>
                <div className='flex gap-6'>
                <input type='file' className='border p-3 rounded-lg' id='file' onChange={(e) => setfile(e.target.files[0])}/>
                <button type='button' className='bg-red-800 text-white w-1/5 rounded-lg uppercase' onClick={() => handleFileUpload(file)}>{uploading ? 'Uploading...' : 'Upload'}</button>
                </div>
                
                <ReactQuill value={createPostData.content} onChange={handleContentChange} />
                <button className='p-3 bg-gray-500 rounded-lg text-white uppercase hover:opacity-95 mt-4'>{loading ? 'Updating...' : 'Update Post'}</button>
            </form>
            
        </div>
    );
}

export default EditPost;