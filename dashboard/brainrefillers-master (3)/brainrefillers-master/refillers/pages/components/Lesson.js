import React from 'react';


const Lesson = (props) =>{


    return(
        <div className='mt-4 chapterContainer mx-2'>
            <div className={`bg-${props.bg}-600 text-white px-6 py-3`}>
                <h1 className='capitalize'>13-august-2022</h1>
                <h1 className='capitalize text-2xl'>chapter-1</h1>
                <h1 className='capitalize'>science</h1>
                <div className='mt-2 inline-flex items-center'>
                    <a href='' className='text-white hover:underline'>Go To Lesson</a>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mt-1 ml-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default Lesson;
