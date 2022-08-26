import React,{useState,useEffect} from 'react';
import {auth,db} from '../firebase/firebase.js';
import { onAuthStateChanged } from 'firebase/auth';
import { onSnapshot,collection,where,query, orderBy,limit, onSnapshotsInSync } from 'firebase/firestore';
import Profile from './components/Profile.js';
import Totalpoints from './components/Totalpoints.js';
import Table from './components/Table.js';

const Dashboard = () =>{

    const [userdata ,setUserdata] = useState();
    const [totalmarks, setTotalmarks] = useState();
    const [leaders, setLeaders] = useState([]);


    useEffect(() =>{
        onAuthStateChanged(auth,(user) =>{
            if(user){
                const collectionRef = query(collection(db,'users'),where('uid','==',user.uid))
                onSnapshot(collectionRef,(snapshot) =>{
                    snapshot.docs.map((doc) =>{
                        setUserdata(doc.data())
                    })
                })
            }
        }) 

        const collectionRef = query(collection(db,'users'),orderBy('total','desc'),limit(5));
        onSnapshot(collectionRef,(snapshot) =>{
            setLeaders(snapshot.docs.map((doc) => doc.data()))
        })

    },[])

    return(
        <div className='flex'>
            <div className='profileContainer'>
                <div className='mt-14 ml-16'>
                    <h1 className='dashboardFont'>Dashboard</h1>
                    <div className='flex mt-4'>
                        <div className='bg-indigo-600 rounded-lg chapterContainer p-4'>
                            <p className='text-white'>13-August-2022</p>
                            <h1 className='text-white text-2xl'>Chapter - 1</h1>
                            <p className='text-white'>Science</p>
                            <div className='mt-4 inline-flex items-center'>
                                <a href='/lessons/sc001f0' className='text-white hover:underline'>Go To Lesson</a>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mt-1 ml-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </div>
                        </div>
                        {
                            (userdata?
                                <Totalpoints userData={userdata}/> 
                                :
                                <></>    
                                
                            )
                        }
                        <div className='ml-4 pointsContainer bg-blue-600 text-white  border border-blue-500'>
                            <h1 className='mb-2 font-bold'>Favourite Subject</h1>
                            <p className='mb-3'>Science</p>
                            <a href='#' className='hover:underline text-md'>Go To Analytics Page</a>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mt-1 ml-2 inline-flex mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </div>
                    </div>
                </div>
                <Table leaderData={leaders}/>

            </div>
            {
                (userdata?
                    <Profile userData={userdata} />
                :
                <></>  
                )
            }
            
        </div>
    )
}

export default Dashboard;