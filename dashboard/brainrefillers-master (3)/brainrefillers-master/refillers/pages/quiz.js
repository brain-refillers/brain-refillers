import React,{useState,useEffect} from 'react';
import Question from './components/Question.js';
import {db,auth} from '../firebase/firebase.js';
import { onSnapshot,collection } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
const quiz = () =>{
    const [uid, setUid] = useState();
    const [datas, setDatas] = useState([]);
    

    useEffect(() =>{
        onAuthStateChanged(auth,(user) =>{
            setUid(user.uid);
        })

        const collectionRef = collection(db,'quiz')
        onSnapshot(collectionRef,(snapshot) =>{
            setDatas(snapshot.docs.map((doc) =>doc.data()))
        })

    },[])


    return(
        <div className=''>
            <div className='flex items-center justify-between py-4 px-4 shadow-lg'>
            <div className='inline-flex items-center'>
                <img  className='w-10 h-10' src='./icon.png' alt='' />
                <h1 className='text-2xl ml-4'>Brain Refillers</h1>
            </div>
            <ul className='inline-flex mt-2'>
                <li className='mr-4 hover:text-gray-600'><a href='../lessons/sc001f1'>Go Back To Lesson</a></li>
                <li className='mr-4 hover:text-gray-600'><a href='#'>Contact Support</a></li>
                <li className='mr-4 hover:text-gray-600'><a href='#'>Developer Info</a></li>
                <li className='mr-4 hover:text-gray-600'><a href='#'>About US</a></li>
            </ul>
            </div>
            <div className=''>
                {
                    datas.map((data,index) =>(
                        <Question index={index} data={data} uid={uid} />
                    ))
                }
                
            </div>
            <div className='flex justify-end'>
                <div className='my-4 mx-4'>
                    <a className='ml-auto hover:text-gray-500' href="../dashboard">
                        Go To Dashborad
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-flex items-center ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    )
}


export default quiz;