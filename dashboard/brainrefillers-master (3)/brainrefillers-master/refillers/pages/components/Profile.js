import React,{useState,useEffect} from 'react';
import Bar from './Bar.js';

const Profile = (props) =>{
    const [english, setEnglish] = useState();
    const [maths, setMaths] = useState();
    const [social, setSocial] = useState();
    const [science, setScience] = useState();

    console.log(english,maths,social,science);
    useEffect(() =>{
        let mark;
        for(var i=0 ;i<4;i++){
            if(props.userData.progress[i] >0 && props.userData.progress[i] <= 25){
                mark = 1;
            }else if(props.userData.progress[i] >25 && props.userData.progress[i] <= 50){
                mark = 2;
            }else if(props.userData.progress[i] >50 && props.userData.progress[i] <= 99){
                mark = 3;
            }else if(props.userData.progress === 100){
                mark = 4;
            }

           if(i == 0){
            setEnglish(mark);
           }else if(i == 1){
            setScience(mark);
           }else if(i== 2){
            setSocial(mark);
           }else{
            setMaths(mark);
           }
        }
       
    },[])
    return(
        <div className='mt-28 ml-20 '>
            <img className='rounded-full w-60 h-60' src='./logo.jpeg' alt=''/>
            <h1 className='uppercase text-md text-center mt-6 '>welcome</h1>
            <h1 className='uppercase text-2xl text-center'>{props.userData.name}</h1>
                    
           <Bar english={english} science={science} social={social} maths={maths}/>
        </div>
    )

}

export default Profile;