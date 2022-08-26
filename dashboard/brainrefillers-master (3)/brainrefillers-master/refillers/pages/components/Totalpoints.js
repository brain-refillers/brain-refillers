import React,{useState,useEffect} from 'react';



const Totalpoints = (props) =>{

    const [totalmarks ,setTotalMarks] = useState(0);
    useEffect(() =>{
        let total = 0;
       for(var i=0;i<4;i++){
        total = total + props.userData.progress[i];
       }

       setTotalMarks(total)
    },[])


    return(
        <div className='ml-4 pointsContainer bg-orange-600 text-white  border border-orange-500'>
            <h1 className='font-bold'>Total Points</h1>
            <p>{totalmarks}</p>
            <p>Great Progress Keep Going 💝</p>
         </div>
    )
}

export default Totalpoints;