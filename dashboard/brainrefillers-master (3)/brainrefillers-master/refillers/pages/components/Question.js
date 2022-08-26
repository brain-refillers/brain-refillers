import React,{useState,useEffect} from 'react';
import {db} from '../../firebase/firebase.js';
import {collection,query,where,onSnapshot,addDoc,doc, setDoc} from 'firebase/firestore';


const Question = (props) =>{

    const [invalid, setInvalid] = useState(false);
    const [form, setForm] = useState(true);
    const [input, setInput] = useState();
    const [submit, setSubmit] = useState(false);
    const [userdocid, setUserdocid] = useState();
    const [points, setPoints] = useState();



    useEffect(() =>{
        const collectionRef = query(collection(db,'users'),where('uid','==',props.uid));
        onSnapshot(collectionRef,(snapshot) =>{
            snapshot.docs.map((doc) =>{
                setUserdocid(doc.id)
                setPoints(doc.data().total)
            })
        })
    },[])

    const updatePoints = () =>{
        const docRef = doc(db,'users',userdocid);
        setDoc(docRef,{
            total:points+10,
        },{merge:true})
    }

    const checkAnswer = () =>{
        if(input == props.data.answer){
            setForm(false);
            setSubmit(true);
            updatePoints();
        }else{
            setInvalid(true);
            setSubmit(true);
            setForm(false)
        }
    }

    return(
        <div className='my-16'>
            <div className='flex flex-col items-center'>
                <h1 className='mt-2'>{`${props.index+1}) ${props.data.question}`}</h1>
                <div className='mt-2'>
                    <input onChange={(e) => setInput(e.target.value)} disabled={!form} className='shadow-lg px-4 py-2 rounded-lg  mt-2 border border-gray-500' type='text' placeholder="Enter Your answer "/>
                    <button onClick={checkAnswer} disabled={!form} className='bg-sky-700 text-white px-4 py-2 ml-2 rounded-lg'>Check Answer</button>
                </div>
               {
                (submit?
                    <div className='my-4'>
                    {
                        (invalid && submit?
                            <div className='text-red-500 border border-red-500 px-4 py-2 rounded-lg '>Wrong Answer!! Better Luck Next Time</div>    
                            :
                            <div className='text-green-500 border border-green-500 px-4 py-2 rounded-lg '>Excellent Work + 10 points</div>
                        )
                    }
                    </div> 
                    :
                    <></>   
                    
                )
               }
            </div>
            
        </div>
    )
}

export default Question;