"use client"
import { useEffect, useState } from 'react'
import React from 'react'
import { transferHistory } from '../interface/trannsfer'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiLoader } from "react-icons/fi";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { GiCancel } from "react-icons/gi";
import formatDate from '../components/dateConversion';


export default function TransferHistory({ choice, id }: { choice: Boolean, id: string }) {
    const [transfer, setTtransfer] = useState<transferHistory[]>([])
    const [local , setLocal] = useState<transferHistory[]>([])
    const [foreign , setForeign] = useState<transferHistory[]>([])

    useEffect(() => {
        fetch(`http://localhost:8080/transferHistory/${id}`)
            .then(res => res.json())
            .then((data: transferHistory[]) => {
                setTtransfer(data)

            })
        }, [transfer])
        
        
    useEffect(() => {
        const localData = transfer.filter(el => el.foreignAccount === null);
        const foreignData = transfer.filter(el => el.foreignAccount !== null);

        setLocal(localData);
        setForeign(foreignData);
    }, [transfer]);

    const cancel = (transferId : string)=>{
        fetch(`http://localhost:8080/transfer/cancel/${transferId}`,{
            method : 'PUT'
        })
    }

    


    return (
        <div className=' h-[46vh] overflow-y-auto  '>
                    {choice ? (
                        <table className="table w-full">
                            <thead >
                                <tr className='text-sm'>
                                    <th>effective date</th>
                                    <th>transaction ref</th>
                                    <th>transfer ref</th>
                                    <th>receiver ref</th>
                                    <th>receiver name</th>
                                    <th>amount</th>
                                    <th>reason</th>
                                    <th>status</th>
                                </tr>
                            </thead>
                            <tbody className='   overflow-y-auto '>
                        {local.map((el, index) => (
                            <tr key={index}>
                                <td>{formatDate(el.effectiveDate)}</td>
                                <td>{el.transactionId}</td>
                                <td>{el.transferRef}</td>
                                <td>{el.accountReceiverRef}</td>
                                <td>{el.receiverName}</td>
                                <td>{el.amount}$</td>
                                <td>{el.label}</td>
                                {el.status == "apending" ? (<td className='flex flex-row items-center'><FiLoader className='text-blue-500 font-bold text-xl mr-2'/><button onClick={()=>cancel(el.transferId)} className='text-red-500 text-xs underline'>cancel</button></td>) :
                                 el.status == "done" ?(<td><IoCheckmarkDoneSharp  className='text-green-500 font-bold text-xl'/></td>) :
                                  (<td><GiCancel  className='text-red-500 font-bold text-xl'/></td>)}
                                

                            </tr>
                            ))}
                            </tbody>
                        </table>
                    ) : (
                        <table className="table w-full">
                            <thead >
                                <tr className='text-sm'>
                                    <th>effective date</th>
                                    <th>transaction ref</th>
                                    <th>transfer ref</th>
                                    <th>receiver ref</th>
                                    <th>amount</th>
                                    <th>reason</th>
                                    <th>status</th>
                                </tr>
                            </thead>
                            <tbody className='   overflow-y-auto '>
                        {foreign.map((el, index) => (
                            <tr key={index}>
                                <td>{formatDate(el.effectiveDate)}</td>
                                <td>{el.transactionId}</td>
                                <td>{el.transferRef}</td>
                                <td>{el.foreignAccount}</td>
                                <td>{el.amount}$</td>
                                <td>{el.label}</td>
                                {el.status == "apending" ? (<td className='flex flex-row items-center'><FiLoader className='text-blue-500 font-bold text-xl mr-1'/><button onClick={()=>cancel(el.transferId)} className='text-red-500 text-xs underline'>cancel</button></td>) :
                                 el.status == "done" ?(<td><IoCheckmarkDoneSharp  className='text-green-500 font-bold text-xl'/></td>) :
                                  (<td><GiCancel  className='text-red-500 font-bold text-xl'/></td>)}

                            </tr>
                            ))}
                            </tbody>
                        </table>


                    )}
        </div>
    )
}
