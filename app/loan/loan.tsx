"use client"
import React, { useEffect, useState } from 'react'
import loanInterface from '../interface/loanInterface'
import { IoWarningOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import Message from '../interface/message';
import Modal from '../components/modal';
import { useForm } from 'react-hook-form'

interface loanPost {
    amount: number,
    interestAboveSevenDay: number,
    accountId: string,
    interestSevenDay: number,
}

export default function Loan({ id }: { id: string }) {
    const [loan, setLoan] = useState<loanInterface[]>([])
    const [repay, setRepay] = useState<repayInterface>()
    const [message, setMessage] = useState<Message>()
    const [isModalOpen, setIsModalOpen] = useState(false)



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
        setValue
    } = useForm<loanPost>();

    useEffect(() => {
        fetch(`http://localhost:8080/loanHistory/${id}`)
            .then(res => res.json())
            .then((data: loanInterface[]) => {
                setLoan(data)
            })
    }, [loan])

    interface repayInterface {
        id: string,
        accountId: string
    }

    const repayOperation = (idLoan: string) => {
        const repayState: repayInterface = { id: idLoan, accountId: id }
        setRepay(repayState)
        fetch('http://localhost:8080/loan/repay', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(repayState)
        })
            .then(res => res.json())
            .then((data: Message) => {
                setMessage(data)
            })
        openModal();

    }

   

    const onSubmit = (data: loanPost) => {
        const laonSend : loanPost = {
            ...data ,
            accountId : id
        }
        console.log(laonSend)
        fetch("http://localhost:8080/loan",{
            method : 'POST',
            headers : {
                'Content-Type':'application/json'
            },
            body : JSON.stringify(laonSend)
        })
        .then(res=>res.json())
        .then((data : Message)=>{
            setMessage(data)
        })

        openModal()
        reset()
    }

    return (

        <div>
            <div className='mb-5'>
                <div className='text-red-500 text-sm flex flex-row gap-6 mb-3'>
                    {errors.interestAboveSevenDay &&<p>{errors.interestAboveSevenDay.message}!</p>}
                    {errors.amount && <p>{errors.amount.message}!</p>}
                    {errors.interestSevenDay && <p>{errors.interestSevenDay.message}!</p>}

                </div>
                <form action="" className='flex flex-row gap-6 items-center' onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="">
                        <input type="number" className='focus:outline-none px-2 py-2 border border-slate-400 text-black text-sm rounded-md placeholder:text-sm placeholder:text-black ' placeholder='amount$'
                            {...register("amount", {
                                required: "add an amount",
                                min: { value: 10, message: "amount>10$" }
                            })} />
                    </label>
                    <label htmlFor="">
                        <input type="number" className='focus:outline-none px-2 py-2 border border-slate-400 text-black text-sm rounded-md placeholder:text-sm placeholder:text-black' placeholder='interest -7d%'
                            {...register("interestSevenDay", {
                                required: "interest -7d empty",
                                min: { value: 0, message: "interest -7d>0" }
                            })} />
                    </label>
                    <label htmlFor="">
                        <input type="number" className=' focus:outline-none px-2 py-2 border border-slate-400 text-black text-sm rounded-md placeholder:text-sm placeholder:text-black' placeholder='interest +7d%'
                            {...register("interestAboveSevenDay", {
                                required: "interest +7d empty",
                                min: { value: 0, message: "interest +7d>0" }
                            })} />
                    </label>
                    <button type='submit' className='px-6 py-2 bg-red-500 rounded-md text-white text-sm'>loan</button>
                </form>
            </div>
            {message?.error ? (
                <Modal isOpen={isModalOpen} onClose={closeModal} children={message.error} color='text-red-500' tittle='Failed' />
            ) : (
                <Modal isOpen={isModalOpen} onClose={closeModal} children={message?.success} color='' tittle='Success' />
            )}
            <table className="table">

                <thead>
                    <tr className='text-base'>
                        <th>date</th>
                        <th>amount</th>
                        <th>interest -7d</th>
                        <th>interest +7d</th>
                        <th>status</th>
                    </tr>
                </thead>
                <tbody>
                    {loan.length > 0 ? (
                        loan.map((el, index) => (
                            <tr key={index}>
                                <td><p>{el.loanDate}</p></td>
                                <td>{el.amount}$</td>
                                <td>{el.interestSevenDay}%</td>
                                <td>{el.interestAboveSevenDay}%</td>
                                {el.status == "unpaid" ? (
                                    <td className='flex flex-row items-center'>
                                        <IoWarningOutline className='text-red-500 text-base' />{el.status}
                                        <button onClick={() => repayOperation(el.id)} className='underline rounded-md ml-5 cursor-pointer text-blue-500 text-sm'>repay</button>
                                    </td>


                                ) : (<td className='flex flex-row items-center'><FaCheck className='text-green-500 text-base' />{el.status}</td>
                                )}
                            </tr>
                        ))
                    ) : (

                        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 mt-36 z-0' >you can loan from D-banK after giving an authorization : info / loan authorization</div>

                    )}

                </tbody>
            </table>
        </div>
    )
}
