"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import { foreignReceiver, foreignTransfer } from '../interface/trannsfer'
import { useForm } from 'react-hook-form';
import Modal from '../components/modal';
import Message from '../interface/message';

export default function foreignTrasfer({ id }: { id: string }) {
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
    } = useForm<foreignReceiver>();

    const [foreignReceivers, setForeignReceivers] = useState<foreignReceiver[]>([]);

    const add = (data: foreignReceiver) => {
        foreignReceivers.push(data)
        reset()
        console.log(foreignReceivers)
    }

    const onSubmit = (data: foreignReceiver) => {
        add(data)
        const transfer: foreignTransfer = {
            transfer: { senderAccountId: id },
            foreignReceivers: foreignReceivers
        }

        fetch("http://localhost:8080/transfer/foreign", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transfer)
        })
            .then(res => res.json())
            .then((data: Message) => {
                setMessage(data)
            })

        openModal()
        reset()
    }


    return (
        <>
            {message?.error ? (
                <Modal isOpen={isModalOpen} onClose={closeModal} children={message.error} color='text-red-500' tittle='Failed' />
            ) : (
                <Modal isOpen={isModalOpen} onClose={closeModal} children={message?.success} color='' tittle='Success' />
            )}
            <div className='flex flex-row justify-between text-red-500 mt-3 text-sm w-1/2'>
                {errors.amount && <p> {errors.amount.message} /</p>}
                {errors.receiverAccount && <p> {errors.receiverAccount.message} /</p>}
                {errors.reason && <p> {errors.reason.message} /</p>}
            </div>
            <form action="" className='mt-3 text-sm  w-1/2  ' onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-row justify-between'>
                    <div>
                        <label htmlFor="" className='flex flex-col mb-2'>
                            <p className='mb-1 font-bold'>account receiver</p>
                            <input type="text" className='border border-black rounded-lg px-1 py-2 outline-none'
                                {...register("receiverAccount", {
                                    required: "add an account"
                                })} />
                        </label>
                        <label htmlFor="" className='flex flex-col mb-2'>
                            <p className='mb-1 font-bold'>reason</p>
                            <input type="text" className='border border-black rounded-lg px-1 py-2 outline-none'
                                {...register("reason", {
                                    required: "add a reason"
                                })} />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="" className='flex flex-col mb-2'>
                            <p className='mb-1 font-bold'>amount$</p>
                            <input type="number" className='border border-black rounded-lg px-1 py-2 outline-none'
                                {...register("amount", {
                                    required: "add an amount",
                                    min: { value: 0, message: "amount < 0 !" }
                                })} />
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
                    <button onClick={handleSubmit(add)} className='py-2 px-4 rounded-3xl border bg-red-500 text-white'>add</button>
                </div>
            </form>
        </>
    )
}
