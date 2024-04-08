"use client"
import {  useEffect, useState } from "react"
import { Account } from "../interface/account"
import Link from "next/link";
import { MdCheckCircle } from "react-icons/md";
import { PiWarningCircleFill } from "react-icons/pi";
import AddAccount from "./addAccount";
import React from "react";
const ListAccounts = () => {
    const [account, setAccount] = useState<Account[]>([]);
    useEffect(() => {
            fetch("http://localhost:8080/accounts")
            .then(res => res.json())
            .then((data : Account[])=>{
                 setAccount(data)
            })
        
    }, [account])


            
    
    return (
       
            
            <div className="flex flex-row justify-between mt-6 px-10 h-[80vh] overflow-y-auto" >
                <AddAccount/>
                <div className="w-3/4 overflow-y-auto">
                {account.map((element, index) => (
                <div className="flex flex-row justify-between p-6 border-collapse rounded-lg shadow bg-white w-full mb-2" key={index}>
                    <div>
                        <p>{element.firstName} {element.lastName}</p>
                        <p>{element.accountRef}</p>
                    </div>
                    <div>
                        <p>{element.monthlyPay} MGA / month</p>
                    </div>
                    <div>
                        {element.loanAuthorization ? (
                            <span className="flex flex-row items-center gap-2"> loan authorization <MdCheckCircle className="text-green-600 text-xl" /></span>
                        ) : (
                            <span className="flex flex-row items-center gap-2"> loan authorization<PiWarningCircleFill className="text-red-600 text-xl" /></span>
                        )}


                        <Link href= {`/accounts/details/${element.id}`} className="text-xs text-blue-600 cursor-pointer underline">Details</Link>
                    </div>

                </div>
            ))}  
                </div>
            </div>
        )
    
    }
export default ListAccounts;