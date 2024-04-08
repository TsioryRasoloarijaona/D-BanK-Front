"use client"
import {  useEffect, useState } from "react"
import { Account } from "../interface/account"
import Link from "next/link";
import { MdCheckCircle } from "react-icons/md";
import { PiWarningCircleFill } from "react-icons/pi";


const AllAccounts = () => {
    const [account, setAccount] = useState<Account[]>([]);


    const findAll = async (): Promise<Account[]> => {
        const res = await fetch("http://localhost:8080/accounts");
        if (!res.ok) {
            console.log("error")
        }
        const data: Account[] = await res.json()
        return data
    }

    useEffect(() => {
        findAll().then(setAccount)
    }, [])

   

    return (
        <>

            {account.map((element, index) => (
                <div className="flex flex-row justify-between p-6 border-collapse rounded-lg shadow bg-white w-full mb-2" key={index}>
                    <div>
                        <p>{element.firstName} {element.lastName}</p>
                        <p>{element.accountRef}</p>
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


        </>
    )

}

export default AllAccounts;