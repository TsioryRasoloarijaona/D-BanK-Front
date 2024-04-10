"use client"
import { useState, useEffect } from 'react'
import React from 'react'
import ForeignTrasfer from './foreignTrasfer'
import LocalTransfer from './localTransfer'

export default function Transfer({ id }: { id: string }) {

    const [choice, setChoice] = useState(true)
    useEffect(() => {
        console.log(choice);
    }, [choice]);

    const makeChoiceTrue = () => {
        setChoice(true)


    }

    const makeChoiceFalse = () => {
        setChoice(false)

    }

    return (
        <>

            <div>
                <div className='flex flex-row gap-6 text-sm'>
                    <button onClick={makeChoiceTrue} className={`py-2 px-4 rounded-3xl border border-red-500 ${choice ? 'bg-red-500 text-white' : ''}`}>local transfer</button>
                    <button onClick={makeChoiceFalse} className={`py-2 px-4 rounded-3xl border border-red-500 ${!choice ? 'bg-red-500 text-white' : ''}`}>foreign transfer</button>
                </div>

                {choice ? (<LocalTransfer id={id} />) : <ForeignTrasfer id={id} />}

            </div>

        </>
    )
}
