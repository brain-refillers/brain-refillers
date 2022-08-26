import React,{useState,useEffect} from 'react';
import List from '../components/List.js';
import {db,auth} from '../../firebase/firebase.js';
import {collection,query,where, onSnapshot, setDoc,doc} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { setuid } from 'process';


const Workspace = (props) =>{

    const [videostate, setVideostate] = useState(false);
    const [buttonstate, setButtonstate] = useState(true);
    const [datapoints, setDatapoints] = useState([]);
    const [videoid, setVideoid] = useState();
    const [answer, setAnswer] = useState();
    const [question, setQuestion] = useState();
    const [invalid, setInvalid] = useState(false);
    const [input ,setInput] = useState('');
    const [submit, setSubmit] = useState(false);
    const [nextframe, setNextframe] = useState();
    const [points, setPoints] = useState()
    const [uid, setUid] = useState();
    const [docid, setDocid] = useState();
    const [total, setTotal] = useState();
    const [font, setFont] = useState('mainFont');
    

    const [quiz, setQuiz] = useState(true);

    const updatePoints = () =>{
        const collectionRef = query(collection(db,'users'),where('uid','==',uid));
        onSnapshot(collectionRef,(snapshot)  =>{
            snapshot.docs.map((docid) =>{
                setDoc(doc(db,'users',docid.id),{
                    progress:points,
                    total:total+20,
                },{merge:true})
            })
        })
        
    }

    const videoStateToggler = () =>{
        if(videostate){
            setVideostate(false);
        }else{
            setVideostate(true);
        }
    }

    const checkAnswer = () =>{
        const ans = input.toLowerCase();
        console.log(ans,answer)
        setSubmit(true)
        if(ans != answer){
           setInvalid(false)
        }else{
            setInvalid(true)
            setButtonstate(false)
            points[1] = points[1]+20;
            updatePoints(points)

        }
        setInput('')
    }
    
    const changeFont = () =>{
        if(font == 'mainFont'){
            setFont('mainFont2')
        }else{
            setFont('mainFont')
        }
    }



    useEffect(() =>{
        const collectionRef = query(collection(db,'lessons'),where('lessonID','==',props.pid));

        onSnapshot(collectionRef,(snapshot) =>{
            snapshot.docs.map((doc) =>{
                setDatapoints(doc.data().points)
                setVideoid(doc.data().videoID)
                setAnswer(doc.data().answer)
                setNextframe(doc.data().nextID)
                setQuestion(doc.data().question)
                setQuiz(doc.data().last)
            })
        })
    },[])

    useEffect(() =>{
        onAuthStateChanged(auth,(user) =>{
            
            if(user){
                setUid(user.uid)
                const collectionRef = query(collection(db,'users'),where('uid','==',user.uid));
                onSnapshot(collectionRef,(snapshot) =>{
                    snapshot.docs.map((doc) =>{
                        setPoints(doc.data().progress)
                        setTotal(doc.data().total)
                    })
                })

            }
        })
    },[])
    return(
        <div>
            <div className='flex justify-end mt-2 mr-8'>
                <button onClick={changeFont} className='bg-sky-700 text-white px-4 py-2 rounded-lg'>Change Font</button>
            </div>
            <div className={`flex justify-center ${font}`}>
            
            {
                (videostate?
                    <iframe width="660" height="320" src={`https://www.youtube.com/embed/${videoid}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    :
                    <div className='px-10 mt-10'>
                        <ol className='list-decimal'>
                            {
                                datapoints.map((point) =>(
                                    <List data={point} />
                                ))
                            }
                        </ol>
                    </div>   
                )
            }
        </div>
        <div className='mt-6 flex justify-center'>
            <button onClick={videoStateToggler} className='bg-sky-700 hover:bg-sky-800 text-white px-4 py-4 rounded-lg mx-2'>
                {`Switch To ${(videostate?'Text':'Video')}`}  
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-flex ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            </button>
        </div>
        <div className='flex flex-col items-center mt-5'>
            <h1 className='font-bold'>{question}</h1>
            <div className='mt-4'>
                <input disabled={!buttonstate} value={input} onChange={(e) => setInput(e.target.value)} className='shadow-lg px-4 py-2 rounded-lg border border-gray-500' placeholder="Enter Your Answer Here"/>
                <button disabled={!buttonstate} onClick={checkAnswer} className='px-4 ml-2 py-2  rounded-lg bg-sky-700 text-white'>Submit Answer</button>
            </div>
        </div>
        {
            (submit?
                <div className='flex justify-center items-center'>
            {
                (invalid?
                <div className='flex items-center'> 
                    <div className='mt-2 text-green-500 border border-green-400 px-4 py-2 rounded'>
                        <h1>
                            Correct Answer
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-flex mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                           Well Done
                        </h1>
                    </div>
                    <div className='mt-2'>
                        <a className='bg-sky-700 text-white px-4 py-2  rounded-lg ml-4 ' href={`../lessons/${nextframe}`}>
                        Go To Next Frame
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 items-center inline-flex ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                        </a>
                        {
                            (quiz?
                                    <a href="../quiz" className='bg-sky-700 text-white px-4 py-2 rounded-lg ml-2'>
                                        Go To Quiz
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6  h-6 inline-flex items-center ml-2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                        </svg>
                                    </a> 
                                :
                                <></>
                                
                            )
                        }
                    </div>
                </div>
                :
                <div className=''>
                    <div className='mt-2 text-red-500 border border-red-400 px-4 py-2 rounded'>
                        <h1>
                            Wrong Answer
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-flex mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                            </svg>
                           Better Luck Next Time
                        </h1>
                    </div>
                </div>   
                    
                )
            }
        </div>
                
            :
            <></>    
            )
        }
     </div>
 
    )
}

export default Workspace;