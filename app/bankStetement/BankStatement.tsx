"use client"
import React, { useEffect, useState } from 'react'
import { bankStatementInterface } from '../interface/bankStatementInterface'
import { IoMdDownload } from "react-icons/io";


export default function BankStatement({ id }: { id: string }) {
    const date: Date = new Date()
    const actualMonth: number = date.getMonth() - 1;
    const [BanK, setBank] = useState<bankStatementInterface[]>([])
    const [month, setMonth] = useState<Number>(actualMonth)
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];


    const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const monthNumber = parseInt(event.target.value, 10);
        setMonth(monthNumber);
    };

    useEffect(() => {
        fetch(`http://localhost:8080/bankStatement/${id}/${month}`)
            .then(res => res.json())
            .then((data: bankStatementInterface[]) => {
                setBank(data)
            })
    }
        , [BanK]

    )

    const download = async () => {
        try {

            const response = await fetch(`http://localhost:8080/bankStatement/download/${id}/${month}`);
            if (!response.ok) {
                throw new Error('download failed');
            }
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `bankStatement_${id}_${month}.pdf`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Erreur lors du téléchargement du fichier:', error);
        }
    };

    return (
        <>
            <div className='flex flex-row gap-4 items-center'>
                <label htmlFor="monthSelect">select a month:</label>
                <select className='ml-3 px-2 font-sans py-2 rounded-md bg-slate-200' id="monthSelect" onChange={handleMonthChange}>
                    <option className='' value=''>month</option>
                    {months.map((month, index) => (
                        <option key={index} value={index + 1} className='font-sans border-none'>{month}</option>
                    ))}
                </select>
                <div onClick={download}>
                    <IoMdDownload data-tip={'download this bank statement'} className='text-xl cursor-pointer' />
                    
                </div>
            </div>
            <div className="overflow-x-auto mt-11 h-5/6">
                <table className="table">

                    <thead>
                        <tr className='text-base'>
                            <th>date</th>
                            <th>transaction ref</th>
                            <th>operation</th>
                            <th>amount</th>
                            <th>balance</th>
                            <th>pattern</th>
                        </tr>
                    </thead>
                    <tbody>
                        {BanK.length > 0 ? (
                            BanK.map((el, index) => (
                                <tr key={index}>
                                    <td><p>{el.date}</p></td>
                                    <td>{el.transactionRef}</td>
                                    <td>{el.operation}</td>
                                    <td>{el.amount}$</td>
                                    <td>{el.balance}$</td>
                                    <td>{el.pattern}</td>
                                </tr>
                            ))
                        ) : (

                            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 mt-36'>no transaction registered this month</div>

                        )}

                    </tbody>
                </table>
            </div>

        </>
    )
}




