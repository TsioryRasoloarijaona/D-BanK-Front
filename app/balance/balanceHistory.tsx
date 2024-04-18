"use client"
import React from 'react'
import { balanceInterface } from '../interface/balanceInterface'
import { useState, useEffect } from 'react'
import { BiSolidDollarCircle } from "react-icons/bi";
import { RiHandCoinFill } from "react-icons/ri";


export default function BalanceHistory({ id }: { id: string }) {

    const [balance, setBalance] = useState<balanceInterface>()
    const [balance1, setBalance1] = useState<balanceInterface>()
    const [date, setDate] = useState('')


    useEffect(() => {
        fetch(`http://localhost:8080/account/balance/${id}`)
            .then(res => res.json())
            .then((data: balanceInterface) => {
                setBalance(data)
            })
    }, [balance])

    const getDate = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(date)
        setDate(event.target.value)
        fetch(`http://localhost:8080/account/balance/${id}/${event.target.value}`)
            .then(res => res.json())
            .then((data: balanceInterface) => {
                setBalance1(data)
                console.log(data)
            })

    }



    return (
        <>

            <div className="stats shadow-xl flex justify-center mb-6 bg-white ">

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <BiSolidDollarCircle className='text-5xl text-red-500' />
                    </div>
                    <div className="stat-title">balance</div>
                    <div className="stat-value">{balance?.balance}$</div>
                    <div className="stat-desc">{balance?.date}</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <RiHandCoinFill className='text-5xl text-red-500' />
                    </div>
                    <div className="stat-title">total interest</div>
                    <div className="stat-value">{balance?.totalInterest}</div>
                    <div className="stat-desc"></div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current text-red-500"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
                    </div>
                    <div className="stat-title">total due</div>
                    <div className="stat-value">{balance?.rest}</div>
                    <div className="stat-desc"></div>
                </div>

            </div>

            {balance1?.id === 'your account was not created yet ' ? (
                <p className='text-red-500 text-sm'>Your account was not created yet!</p>
            ) : balance1?.id === 'invalid date' ? (
                <p className='text-red-500 text-sm'>Invalid date!</p>
            ) : null}

            <div className="stats shadow-xl flex justify-center bg-white">

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <BiSolidDollarCircle className='text-5xl text-red-500' />
                    </div>
                    <div className="stat-title">balance</div>
                    <div className="stat-value">{balance1?.balance}$</div>
                    <div className="stat-desc">
                        <div className=''>
                            <input type="date" className=' bg-transparent text-sm outline-none' onChange={getDate} />
                        </div>
                    </div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <RiHandCoinFill className='text-5xl text-red-500' />
                    </div>
                    <div className="stat-title">total interest</div>
                    <div className="stat-value">{balance1?.totalInterest}</div>
                    <div className="stat-desc"></div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current text-red-500"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
                    </div>
                    <div className="stat-title">total due</div>
                    <div className="stat-value">{balance1?.rest}</div>
                    <div className="stat-desc"></div>
                </div>

            </div>


        </>
    )
}
