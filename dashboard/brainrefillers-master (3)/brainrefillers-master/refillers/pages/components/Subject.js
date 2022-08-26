import React from 'react';
import Lesson from './Lesson.js';

const Subject = (props) =>{



    return(
        <div className='mt-6'>
            <h1 className='capitalize text-2xl ml-2'>{props.subName}</h1>
            <div className='flex'>
                <Lesson  bg={props.bg}/>
                <Lesson bg={props.bg}/>
                <Lesson bg={props.bg}/>
            </div>
        </div>
    )
}

export default Subject;