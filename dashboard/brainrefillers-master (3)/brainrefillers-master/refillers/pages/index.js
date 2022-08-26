import React, { useState,useEffect } from 'react';
import {auth} from '../firebase/firebase.js';
import {signInWithEmailAndPassword} from 'firebase/auth';


const Home = () =>{

  const [email ,setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [onload, setOnload] = useState(false);
  const [invalid, setInvalid] = useState(false);

  const login = () =>{
    setOnload(true);
    if(!email || !password){
      setOnload(false);
      return;
    }

    signInWithEmailAndPassword(auth,email,password).then((data) =>{
      window.location = './dashboard';
      setOnload(false);
      setEmail('');
      setPassword('');    
      setInvalid(false);  
    }).catch((err) =>{
      console.log(err.message)
      if(err.message == 'Firebase: Error (auth/wrong-password).'){
        setInvalid(true)
        setOnload(false)
      }
    })

  }
  return(
    <div className=''>
        <div className='flex items-center justify-between py-4 px-4 shadow-lg'>
          <div className='inline-flex items-center'>
            <img  className='w-10 h-10' src='./icon.png' alt='' />
            <h1 className='text-2xl ml-4'>Brain Refillers</h1>
          </div>
          <ul className='inline-flex mt-2'>
            <li className='mr-4 hover:text-gray-600'><a href='./signup'>Create a Account</a></li>
            <li className='mr-4 hover:text-gray-600'><a href='#'>Contact Support</a></li>
            <li className='mr-4 hover:text-gray-600'><a href='#'>Developer Info</a></li>
            <li className='mr-4 hover:text-gray-600'><a href='#'>About US</a></li>
          </ul>
        </div>
        <div className='flex '>
          <div className='mt-5'>
            <img src='./banner.svg' alt='banner image' />
          </div>
          <div className='loginContainer py-32 px-4'>
            <label className='text-xl text-gray-500'>Email Address</label><br></br>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className='rounded-full shadow-lg w-full px-4 py-4 mb-10 mt-4' type='email' placeholder='Enter Your Email Address' />

            <label className='text-xl text-gray-500'>Password</label><br></br>
            <input value={password} onChange={(e) => setPassword(e.target.value)} className='rounded-full shadow-lg w-full px-4 py-4 mt-4' type='password' placeholder='Enter Your Password' />
            {
              (invalid?
                <p className='mt-5 text-xl text-red-600'>Invalid Credentials</p>
                :
                <></>  
              )
            }
            <button onClick={login} className='bg-indigo-600 hover:bg-indigo-700 mb-6 text-white rounded-lg px-8 py-2 mt-5'>
            {
              (onload?
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-flex mr-2 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                :
                <></>  
                
              )
            }
              Login
            </button><br></br>
            <a className='text-indigo-600 hover:text-indigo-700 ' href='./signup'>New To Brain Refillers?</a>
          </div>
        </div>
    </div>
  )
}

export default Home;