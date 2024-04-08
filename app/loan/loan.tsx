"use client"
import React, { useEffect, useState } from 'react'
import loanInterface from '../interface/loanInterface'
import { IoWarningOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import Message from '../interface/message';
import Modal from '../components/modal';


export default function Loan({id}:{id : string}) {
    const [loan , setLoan] = useState<loanInterface[]>([])
    const [repay , setRepay] = useState<repayInterface>()
    const [message , setMessage] = useState<Message>()

    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }


    useEffect(()=>{
        fetch(`http://localhost:8080/loanHistory/${id}`)
        .then(res => res.json())
        .then((data : loanInterface[])=>{
            setLoan(data)
        })
    },[loan])

    interface repayInterface {
        id : string,
        accountId : string
    }

    const repayOperation = (idLoan : string)=>{
        const repayState : repayInterface = {id : idLoan , accountId : id} 
        setRepay(repayState)
        fetch('http://localhost:8080/loan/repay',{
            method : 'POST',
            headers : {
                'Content-type': 'application/json'
            },
            body : JSON.stringify(repay)
        })
        .then(res=>res.json())
        .then((data : Message)=>{
            setMessage(data)
        })
        openModal();

    }

  return (
    <div>
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
                {el.status == "unpaid" ?(
                    <td className='flex flex-row items-center'><IoWarningOutline className='text-red-500 text-base'/>{el.status} <div onClick={()=>repayOperation(el.id)} className='text-white bg-red-500 p-1 rounded-md ml-2 cursor-pointer'>pay</div></td>

                ):( <td className='flex flex-row items-center'><FaCheck className='text-green-500 text-base'/>{el.status}</td>
                )}
            </tr>
        ))
    ) : (
        
             <div  className='absolute top-1/2 left-1/2 transform -translate-x-1/2 mt-36'>no transaction registered this month</div>
        
    )}

</tbody>
</table>
    </div>
  )
}
