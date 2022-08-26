import React,{useState,useEffect} from 'react';
import {useRouter} from 'next/router';
import List from '../components/List.js';
import Workspace from '../components/Workspace.js';
import {auth,db} from '../../firebase/firebase.js';
import {collection,onSnapshot,query,where} from 'firebase/firestore'; 
import { onAuthStateChanged } from 'firebase/auth';


const lesson = () =>{

    const router = new useRouter();
    const [userdata, setuserData] = useState();
    const [uid, setUid] = useState();
    
    useEffect(() =>{
        onAuthStateChanged(auth,(user) =>{
            if(user){
                setUid(user.uid)
                const collectionRef = query(collection(db,'users'),where('uid','==',user.uid))
                onSnapshot(collectionRef,(snapshot) =>{
                    snapshot.docs.map((doc) =>{
                        setuserData(doc.data())
                    })
                })
                
            }
        })
    },[])
    
   

    return(
        <div className='flex'>
            {
                (userdata?
                <div className='sidebarWidth px-4 py-2 bg-gray-800 text-white'>
                    <h1 className='text-2xl capitailze'>Science</h1>
                    <h1 className='text-xl'>Chapter : 1</h1>
                    <h1 className='text-xl'>Genetics</h1>
                    <div className='mt-10'>
                        <h1 className='text-2xl'>Chapter Description</h1>
                        <p className='mt-2 mb-8 capitalize'>Heredity is transmission of characters,
                        from one generation to the next generation,
                        while variation refers to the differences shown
                        by the individuals of the same species and also
                        by the offspring of the same parents. All these
                        can happen only due to chromosomes. Now
                        let’s see what chromosomes are and how they
                        are composed with DNA, that form the genetic
                        material. </p>
                    </div>
                    <a target="blank" href={`https://firebasestorage.googleapis.com/v0/b/brain-refillers.appspot.com/o/Kaleeswaran%20Std10_Science_EM_www.tntextbooks.in.pdf?alt=media&token=a02bee53-1074-4432-b08a-eec16a58e299`} className='bg-sky-700 border-sky-700 text-white px-4 py-4 rounded-lg'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-flex items-center mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download Lesson Notes
                    </a>
                    <div className='mt-10'>
                        <h1 className='text-2xl'>Total Points : {userdata.total}</h1>
                        <h1 className='text-2xl mt-4'>Points In Science : {userdata.progress[1]}</h1>
                        
                    </div>
                    </div>
                :
                <></>
                    
                )
            }
            
            
            <div className='w-full'>
                <div className="bg-gray-800  text-white py-2 w-full border border-white  flex justify-between items-center">
                    <h1 className='text-2xl ml-2'>Brain Refillers</h1>
                    <ul className='inline-flex'>
                        <li className='mr-4'><a href='../dashboard'>Dashboard</a></li>
                        <li className='mr-4'><a href='#'>Explore</a></li>
                        <li className='mr-4'><a href='#'>Analytics</a></li>
                        <li className='mr-4'><a href='#'>Support</a></li>
                    </ul>
                </div>
                {
                    (router.query.lessonId?
                        <Workspace pid={router.query.lessonId} />
                        :
                        <></>    
                        
                    )
                }
               
            </div>
        </div>
    )
}

export default lesson;