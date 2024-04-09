"use client"
import React, { useEffect, useState } from 'react'
import { Account } from '../interface/account'
import { MdCheckCircle } from "react-icons/md";
import { PiWarningCircleFill } from "react-icons/pi";
import Message from '../interface/message';
import Modal from '../components/modal';

export default function Info({ id }: { id: string }) {

    const [account, setAccount] = useState<Account>()
    const [isAllowed , setIsAllowed] = useState(false)
    const [message , setMessage] = useState<Message>()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isModalLoanOpen, setIsModalLoanOpen] = useState(false)

  const openModalLoan = () => {
      setIsModalOpen(true)
  }

  const closeModalLoan = () => {
      setIsModalOpen(false)
  }

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const change = () =>{
        setIsAllowed(!isAllowed)
        fetch(`http://localhost:8080/account/loan/${id}`, {
            method : 'PUT',
            headers : {
                'Content-type': 'application/json'
            }
        })
        .then(res => res.json())
        .then((data : Message)=>{
            setMessage(data)
        })
        openModal()
    }

    useEffect(() => {
        fetch(`http://localhost:8080/account/${id}`)
            .then(res => res.json())
            .then((data: Account) => {
                setAccount(data)
            })
    }, [account])


    return (
        <div>
            {message?.error ? (
                <Modal isOpen={isModalOpen} onClose={closeModal} children={message.error} color='text-red-500' tittle='Failed' />
            ) : (
                <Modal isOpen={isModalOpen} onClose={closeModal} children={message?.success} color='' tittle='Success' />
            )}
            <div className='mb-5 mt-5'> reference : <p className='text-xl font-bold'>{account?.accountRef}</p></div>
            <div className='mb-5'>
                <p>first name :</p>
                <p className='text-xl font-bold'>{account?.firstName}</p>
            </div>
            <div className='mb-5'>
                <p>last name :</p>
                <p className='text-xl font-bold'>{account?.lastName}</p>
            </div>
            <div className='mb-5'>
                <p>birth data :</p>
                <p className='text-xl font-bold'>{account?.birthdate}</p>
            </div>
            <div className='mb-5'>
                <p>monthlyPay :</p>
                <p className='text-xl font-bold'>{account?.monthlyPay} $</p>
            </div>
            <div className='mb-5'>
                {account?.loanAuthorization ? (
                    <span className="flex flex-row items-center gap-2">
                        loan authorization <MdCheckCircle className="text-green-600 text-2xl" /> :
                        <p className='text-green-500'>allowed</p>
                    </span>

                ) : (
                    <span className="flex flex-row items-center gap-2">
                        loan authorization<PiWarningCircleFill className="text-red-600 text-2xl" /> :
                        <p className='text-red-500'>denied / </p>
                        <div className="form-control">
                            <label className="label cursor-pointer">
                                <span className="label-text mr-2">allow</span>
                                <input type="checkbox" className="checkbox" 
                                checked={isAllowed}
                                onChange={change}/>
                            </label>
                        </div>
                    </span>
                )}
            </div>

        </div>
    )
}
