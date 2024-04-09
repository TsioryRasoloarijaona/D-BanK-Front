"use client"
import { useState, useEffect } from 'react'
import React from 'react'
import { Account } from '../interface/account'

interface account {
    firstName : string,
    lastName : string,
    ref : string
}

export default function Transfer({ id }: { id: string }) {

    const [choice, setChoice] = useState(true)
    const [account , setAccount] = useState<Account[]>()
    const [accountRef , setAccountRef] = useState('');
    const [lastName , setLastName] = useState('');
    const [firstName , setFirstName] = useState('');


    useEffect(() => {
        console.log(choice);
    }, [choice]);

    const makeChoiceTrue = () => {
        setChoice(true)


    }

    const makeChoiceFalse = () => {
        setChoice(false)

    }

    useEffect(()=>{
        fetch("http://localhost:8080/accounts")
        .then(res => res.json())
        .then((data : Account[])=>{
            setAccount(data)
        })
    },[account])

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRef = event.target.value
    const acc = account?.find(acc => acc.accountRef === selectedRef)
        if(acc != null){
            setAccountRef(acc.accountRef)
            setFirstName(acc.firstName)
            setLastName(acc.lastName)
        }
        
      };
      
    

    return (
        <div>
            <div className='flex flex-row gap-6 text-sm'>
                <button onClick={makeChoiceTrue} className={`py-2 px-4 rounded-3xl border border-red-500 ${choice ? 'bg-red-500 text-white' : ''}`}>local transfer</button>
                <button onClick={makeChoiceFalse} className={`py-2 px-4 rounded-3xl border border-red-500 ${!choice ? 'bg-red-500 text-white' : ''}`}>foreign transfer</button>
            </div>

            <form action="" className='mt-6 text-sm  w-3/4 '>
                <div className='flex flex-row justify-between'>

                    <div>
                        <p className='mb-1 font-bold'>account ref</p>
                        <select name="" id="" className='border border-black rounded-lg px-3 py-2 bg-white' onChange={handleChange}>
                            <option>account ref</option>
                            {account?.map((acc,index)=>(
                                
                                <option key={index} value={acc.accountRef} className='font-sans h-10'>{acc.accountRef}</option>

                            ))}
                            
                            
                        </select>

                    </div>
                    <div>
                        <label htmlFor="" className='flex flex-col mb-2'>
                            <p className='mb-1 font-bold'>First name</p>
                            <input type="text" value={firstName} className='border border-black rounded-lg px-1 py-2 outline-none' />
                        </label>
                        <label htmlFor="" className='flex flex-col'>
                            <p className='mb-1 font-bold'>Last name</p>
                            <input type="text" value={lastName} className='border border-black rounded-lg px-1 py-2 outline-none' />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="" className='flex flex-col mb-2'>
                            <p className='mb-1 font-bold'>amount$</p>
                            <input type="number" className='border border-black rounded-lg px-1 py-2 outline-none' />
                        </label>
                        <label htmlFor="" className='flex flex-col'>
                            <p className='mb-1 font-bold'>effective date</p>
                            <input type="date" className='border border-black rounded-lg px-1 py-2 outline-none' />
                        </label>
                    </div>
                </div>
                <div className='flex justify-end mt-7'>

                    <button className='py-2 px-4 rounded-3xl border bg-red-500 text-white mr-2'>transfer</button>
                    <button className='py-2 px-4 rounded-3xl border bg-red-500 text-white'>add</button>
                </div>
            </form>

        </div>
    )
}
