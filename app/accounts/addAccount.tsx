"use clinet"
import React, { useState } from 'react'
import { IoAddCircleOutline } from "react-icons/io5";
import { useForm } from "react-hook-form"
import { Account } from '../interface/account';
import Message from '../interface/message';
import Modal from '../components/modal';

export default function AddAccount() {
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
        reset
    } = useForm<Account>();

    const onSubmit = (data: Account): Message | undefined => {

        fetch("http://localhost:8080/accounts/save", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(back => { setMessage(back) })

        openModal();
        if (message?.error == null) {
            reset()
        }

        return message;

    }

    console.log(message)

    return (

        <form className="p-6 border-collapse rounded-lg shadow bg-white" onSubmit={handleSubmit(onSubmit)} >

            <h1 className="mb-7 text-2xl">register a new account</h1>
            {message?.error ? (
                <Modal isOpen={isModalOpen} onClose={closeModal} children={message.error} color='text-red-500' tittle='Failed' />
            ) : (
                <Modal isOpen={isModalOpen} onClose={closeModal} children={message?.success} color='' tittle='Success' />
            )}


            <label className="input input-bordered  bg-transparent  flex items-center mb-2">
                <input type="text" className="focus:outline-none" placeholder="Search" />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
            </label>
            {errors.firstName?.type === "required" && (
                <p role="alert" className='mb-1 text-red-600'>First name is required !</p>
            )}
            <label className="input input-bordered bg-transparent flex items-center mb-3">

                <input type="text" className="grow" placeholder="first name* "
                    {...register("firstName", { required: true })}
                    aria-invalid={errors.firstName ? "true" : "false"} />
            </label>

            {errors.lastName?.type === "required" && (
                <p role="alert" className='mb-1 text-red-600'>last name is required !</p>
            )}
            <label className="input input-bordered  bg-transparent  flex items-center mb-3">

                <input type="text" className="grow" placeholder="last name* "
                    {...register("lastName", { required: true })}
                    aria-invalid={errors.lastName ? "true" : "false"} />
            </label>
            {errors.birthdate?.type === "required" && (
                <p role="alert" className='mb-1 text-red-600'>birthdate is required !</p>
            )}
            <label className="input input-bordered  bg-transparent  flex items-center mb-3">
                <input type="date" className="grow"
                    {...register("birthdate", { required: true })}
                    aria-invalid={errors.birthdate ? "true" : "false"} />

            </label>
            {errors.monthlyPay?.type === "required" && (
                <p role="alert" className='mb-1 text-red-600'>monthly Pay is required !</p>
            )}
            <label className="input input-bordered  bg-transparent  flex items-center mb-3">

                <input type="number" className="grow" placeholder="monthly pay"
                    {...register("monthlyPay", { required: true })}
                    aria-invalid={errors.monthlyPay ? "true" : "false"} />
            </label>

            <button type="submit" className="w-full flex items-center justify-center mt-12 bg-red-500 rounded-lg py-3 text-white">
                <p className="flex items-center">
                    add
                    <IoAddCircleOutline className="ml-2 text-xl" />
                </p>
            </button>
        </form>
    )
}
