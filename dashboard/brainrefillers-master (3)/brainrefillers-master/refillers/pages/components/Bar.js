import React from 'react';


const Bar = (props) =>{

    console.log(props)


    return(
        <div className='mt-6'>
            <h1 className='my-2'>English</h1>
                <div className='w-full bg-gray-300  rounded-lg'>
                    <div  className={`bg-blue-800 p-1 rounded-lg w-${props.english}/4`}></div>
                </div>
            <h1 className='my-1'>Science</h1>
                <div className='w-full bg-gray-300 rounded-lg'>
                    <div className={`bg-blue-800 p-1 rounded-lg w-${props.science}/4`}></div>
                </div>
            <h1 className='my-1'>Social</h1>
                <div className='w-full bg-gray-300  rounded-lg'>
                    <div className={`bg-blue-800 p-1 rounded-lg w-${props.social}/4`}></div>
                </div>
            <h1 className='my-1'>Maths</h1>
                <div className='w-full bg-gray-300  rounded-lg'>
                    <div className={`bg-blue-800 p-1 rounded-lg w-${props.maths}/4`}></div>
                </div>
        </div>
    )
}

export default Bar;