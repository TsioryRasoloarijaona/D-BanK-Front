"use client"
import { useEffect, useState } from "react"
import { Account } from "../interface/account"
import Link from "next/link";
import { MdCheckCircle } from "react-icons/md";
import { PiWarningCircleFill } from "react-icons/pi";
import AddAccount from "./addAccount";
import React from "react";
const ListAccounts = () => {
    const [account, setAccount] = useState<Account[]>([]);
    const [Search, setSearch] = useState<string>("");
    useEffect(() => {
        fetch("http://localhost:8080/accounts")
            .then(res => res.json())
            .then((data: Account[]) => {
                setAccount(data)
            })

    }, [account])


    const filteredAccounts = account.filter(acc =>
        acc.firstName.toLowerCase().includes(Search.toLowerCase()) || acc.lastName.toLowerCase().includes(Search.toLowerCase())
    );

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };




    return (
        <>

            <div className="flex flex-row justify-between mt-6 px-10 h-[80vh] overflow-y-auto" >
                <AddAccount />
                <div className="w-3/4 overflow-y-auto text-sm">
                    <label className="input   bg-white flex items-center mb-2 outline-none w-fit justify-end">
                        <input type="text" className="focus:outline-none" placeholder="Search" onChange={handleSearchChange} />
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                    </label>
                    {
                        filteredAccounts.map((element, index) => (
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


                                    <Link href={`/accounts/details/${element.id}`} className="text-xs text-blue-600 cursor-pointer underline">Details</Link>
                                </div>

                            </div>
                        ))


                    }

                </div>
            </div>
        </>
    )

}
export default ListAccounts;