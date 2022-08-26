import React,{useState,useEffect} from 'react';
import {db} from '../../firebase/firebase.js';
import {collection,query,where,limit,orderBy, onSnapshot} from 'firebase/firestore';

const Table = (props) =>{
    return(
        <div className='pl-16 mt-6'>
                    <table className='w-full text-sm text-left text-gray-500 border border-gray-800'>
                        <thead className='text-xs text-gray-700 uppercase bg-gray-800'>
                            <tr className='text-white'>
                                <th className='px-6 py-3'>Rank</th>
                                <th className='px-6 py-3'>Name</th>
                                <th className='px-6 py-3'>Points</th>
                            </tr>
                        </thead>
                        <tbody> 
                            {
                                
                                props.leaderData.map((data,index) =>(
                                    <tr className='bg-white border border-gray-800 font-bold'>
                                    <td className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap'>{index+1}</td>
                                    <td className='capitalize'>{data.name}</td>
                                    <td>{data.total}</td>
                                </tr>
                                ))
                            }
                        </tbody>

                    </table>
                </div>
    )
}


export default Table;