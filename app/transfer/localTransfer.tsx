"use client"
import { useState, useEffect } from 'react'
import React from 'react'
import { Account } from '../interface/account'
import { transferLocal, localReceiver, transferSender } from '../interface/trannsfer'
import { useForm } from 'react-hook-form'
import Message from '../interface/message'
import Modal from '../components/modal'
import ForeignTrasfer from './foreignTrasfer'

export default function localTransfer({ id }: { id: string }) {
    
    const [account, setAccount] = useState<Account[]>()
    const [accountRef, setAccountRef] = useState('');
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [localReceivers, setlocalReceivers] = useState<localReceiver[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [message, setMessage] = useState<Message>()

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm<localReceiver>();



    

    useEffect(() => {
        fetch("http://localhost:8080/accounts")
            .then(res => res.json())
            .then((data: Account[]) => {
                setAccount(data)
            })
    }, [account])

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedRef = event.target.value
        const acc = account?.find(acc => acc.accountRef === selectedRef)
        if (acc != null) {
            setAccountRef(acc.accountRef)
            setFirstName(acc.firstName)
            setLastName(acc.lastName)
        } else {
            setAccountRef('')
            setFirstName('')
            setLastName('')
        }

    };



    const addReceiver = (data: localReceiver) => {
        const dataUpdate: localReceiver = {
            ...data,
            accountRef: accountRef,
            firstName: firstName,
            lastName: lastName
        }
        localReceivers.push(dataUpdate)
        reset()


    }

    const onSubmit = (data: localReceiver) => {
        addReceiver(data)
        const sender: transferSender = { senderAccountId: id }
        const trannsfer: transferLocal = {
            transfer: sender,
            localReceivers: localReceivers
        }

        fetch("http://localhost:8080/transfer/local", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(trannsfer)
        })
            .then(res => res.json())
            .then((data: Message) => {
                setMessage(data)
            })
        openModal()
    }
    return (
        <>
            {message?.error ? (
                <Modal isOpen={isModalOpen} onClose={closeModal} children={message.error} color='text-red-500' tittle='Failed' />
            ) : (
                <Modal isOpen={isModalOpen} onClose={closeModal} children={message?.success} color='' tittle='Success' />
            )}
            <form action="" className='mt-6 text-sm  w-3/4 ' onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-row justify-between'>

                    <div>
                        <p className='mb-1 font-bold'>account ref</p>
                        <select name="" id="" className='border border-black rounded-lg px-3 py-2 bg-white ' onChange={handleChange}>
                            <option className='font-sans font-normal'>account ref</option>
                            {account?.map((acc, index) => (

                                <option key={index} value={acc.accountRef} className='font-sans font-normal h-10'>{acc.accountRef}</option>

                            ))}


                        </select>
                        <label htmlFor="" className='flex flex-col mt-3'>
                            <p className='mb-1 font-bold'>reason</p>
                            <input type="text" className='border border-black rounded-lg px-1 py-2 outline-none'
                                {...register("reason")} />
                        </label>

                    </div>
                    <div>
                        <label htmlFor="" className='flex flex-col mb-2'>
                            <p className='mb-1 font-bold'>First name</p>
                            <input type="text" value={firstName} className='border border-black rounded-lg px-1 py-2 outline-none'
                            />
                        </label>
                        <label htmlFor="" className='flex flex-col mb-2'>
                            <p className='mb-1 font-bold'>amount$</p>
                            <input type="number" className='border border-black rounded-lg px-1 py-2 outline-none'
                                {...register("amount")} />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="" className='flex flex-col'>
                            <p className='mb-1 font-bold'>Last name</p>
                            <input type="text" value={lastName} className='border border-black rounded-lg px-1 py-2 outline-none'
                            />
                        </label>
                        <label htmlFor="" className='flex flex-col'>
                            <p className='mb-1 font-bold'>effective date</p>
                            <input type="date" className='border border-black rounded-lg px-1 py-2 outline-none'
                                {...register("effectiveDate")} />
                        </label>
                    </div>
                </div>
                <div className='flex justify-end mt-7'>

                    <button type='submit' className='py-2 px-4 rounded-3xl border bg-red-500 text-white mr-2'>transfer</button>
                    <button onClick={handleSubmit(addReceiver)} className='py-2 px-4 rounded-3xl border bg-red-500 text-white'>add</button>
                </div>
            </form>
        </>
    )
}
