import React,{useEffect,useState} from 'react';
import {auth,db} from '../firebase/firebase.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {collection,addDoc} from 'firebase/firestore';



const signup = () =>{

    const [invalid, setInvalid] = useState(false);
    const [onload, setOnload] = useState(false);
    
    //input states
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [repassword, setRepassword] = useState();



    const createAccount = (event) =>{
        event.preventDefault();
        setOnload(true);
        if(password != repassword){
            setOnload(false);
            setInvalid(true);
            return;
        }

        createUserWithEmailAndPassword(auth,email,password).then((userdata) =>{
            const collectionRef = collection(db,'users');
            const data = {
                name:name,
                email:email,
                password:password,
                uid:userdata.user.uid,
                progress:[0,0,0,0],
                total:0,
            }
            addDoc(collectionRef,data).then(() =>{
                window.location = './';
                setOnload(false);
                setName('');
                setEmail('');
                setPassword('');
                setRepassword('');
            })
            
            
        })


    }
    useEffect(() =>{
        document.body.style.backgroundColor='#e3e3e3';
    },[])


    return(
        <div className='signupMainContainer'>
            <div className='flex items-center justify-between py-4 px-4 shadow-lg bg-white'>
            <div className='inline-flex items-center'>
                <img  className='w-10 h-10' src='./icon.png' alt='' />
                <h1 className='text-2xl ml-4'>Brain Refillers</h1>
            </div>
            <ul className='inline-flex mt-2'>
                <li className='mr-4 hover:text-gray-600'><a href='./'>Go To Login</a></li>
                <li className='mr-4 hover:text-gray-600'><a href='#'>Contact Support</a></li>
                <li className='mr-4 hover:text-gray-600'><a href='#'>Developer Info</a></li>
                <li className='mr-4 hover:text-gray-600'><a href='#'>About US</a></li>
            </ul>
            </div>
            <div className='flex justify-center '>
                <form className='mt-6 shadow-lg px-10 rounded-lg bg-white py-6 signupInput'>
                    <label>User Name</label><br></br>
                    <input  onChange={(e) => setName(e.target.value)} className='w-full shadow-lg py-2 px-4 rounded-full mb-10' placeholder='Enter Your Name' type='text'/><br></br>

                    <label>Email Address</label><br></br>
                    <input  onChange={(e) => setEmail(e.target.value)}className='w-full shadow-lg py-2 px-4 rounded-full mb-10' placeholder='Enter Your Email Address' type='email'/><br></br>

                    <label>Password</label><br></br>
                    <input  onChange={(e) => setPassword(e.target.value)} className='w-full shadow-lg py-2 px-4 rounded-full mb-10' placeholder='Enter Your Password' type='password'/><br></br>

                    <label>Re-Enter Your Password</label><br></br>
                    <input  onChange={(e) => setRepassword(e.target.value)} className='w-full shadow-lg py-2 px-4 rounded-full mb-5' placeholder='Re-Enter Your Name' type='password'/><br></br>
                    {
                        (invalid?
                            <p className='text-red-500 mb-5'>Password Doesn't Match</p>    
                            :
                            <></>
                        )
                    }
                    <button onClick={createAccount} className='bg-indigo-700 text-white rounded-lg px-4 py-2'>
                        {
                            (onload?
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-flex mr-2 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                :
                                <></>    
                            )
                        }
                        Create a Account
                    </button>
                </form>
            </div>
        </div>
    )
}

export default signup;