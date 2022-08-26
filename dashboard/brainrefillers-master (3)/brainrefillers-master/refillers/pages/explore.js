import React from 'react';
import Subject from './components/Subject.js';

const explore = () =>{



    return(
        <div className='px-6 py-6'>
            <Subject subName={'maths'} bg={'indigo'}/>
            <Subject subName={'science'} bg={'orange'}/>
            <Subject subName={'english'} bg={'indigo'} />
            <Subject subName={'social'} bg={'orange'}/>
        </div>
    )
}

export default explore;