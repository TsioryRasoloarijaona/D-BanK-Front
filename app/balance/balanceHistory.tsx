"use client"
import React from 'react'
import { balanceInterface } from '../interface/balanceInterface'
import { useState, useEffect } from 'react'

export default function BalanceHistory({ id }: { id: string }) {

    const [balance, setBalance] = useState<balanceInterface>()
    const [balance1, setBalance1] = useState<balanceInterface>()



    useEffect(() => {
        fetch(`http://localhost:8080/account/balance/${id}`)
            .then(res => res.json())
            .then((data: balanceInterface) => {
                setBalance(data)
            })
    }, [balance])

    const getDate = (event: React.ChangeEvent<HTMLInputElement>) => {

        fetch(`http://localhost:8080/account/balance/${id}/${event.target.value}`)
            .then(res => res.json())
            .then((data: balanceInterface) => {
                setBalance1(data)
                console.log(data)
            })

    }



    return (

        <div className='w-full h-[40vh]  flex flex-row justify-evenly mx-auto'>

            <div className='w-2/5 h-full bg-white rounded-lg border border-slate-400 p-6 shadow-xl'>
                <div className='text-center opacity-0'>
                    <input type="date" className='border border-black rounded-lg bg-transparent mx-auto mb-2 px-4 py-2 text-sm outline-none' onChange={getDate} />
                </div>
                <div className=' mb-2'>
                    <p className='text-sm'>date :</p>
                    <p className='font-black'>{balance?.date}</p>
                </div>
                <div className='mb-2'>
                    <p className='text-sm'>available balance : </p>
                    <p className=' font-black'>{balance?.balance}$</p>

                </div>
                <div className='mb-2'>
                    <p className='text-sm'>total interest : </p>
                    <p className=' font-black'>{balance?.totalInterest}$</p>
                </div>
                <div>
                    <p className='text-sm'>
                        rest due :
                    </p>
                    <p className=' font-black'>{balance?.rest}$</p>
                </div>
            </div>
            <div className='w-2/5 h-full bg-transparent rounded-lg p-6 border border-slate-400 shadow-xl'>
                <div className='text-center'>
                    <input type="date" className='border border-slate-400 rounded-lg bg-transparent mx-auto mb-2 px-4 py-2 text-sm outline-none' onChange={getDate} />
                </div>
                {balance1 && balance1.id === 'your account was not created yet ' ? (<p className='text-sm text-red-500 flex justify-center items-center h-full'>{balance1?.id}</p>) :
                    (
                        <>
                            <div className=' mb-2'>
                                <p className='text-sm'>date :</p>
                                <p className='font-black'>{balance1?.date}</p>
                            </div>
                            <div className='mb-2'>
                                <p className='text-sm'>available balance : </p>
                                <p className=' font-black'>{balance1?.balance}$</p>

                            </div>
                            <div className='mb-2'>
                                <p className='text-sm'>total interest : </p>
                                <p className=' font-black'>{balance1?.totalInterest}$</p>
                            </div>
                            <div>
                                <p className='text-sm'>
                                    rest due :
                                </p>
                                <p className=' font-black'>{balance1?.rest}$</p>
                            </div>
                        </>

                    )}
            </div>
        </div>
    )
}
