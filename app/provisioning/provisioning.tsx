"use client"
import React from 'react'
import { Category, ProvisioningPost } from '../interface/provisioningInterface'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Message from '../interface/message'
import Modal from '../components/modal'
import { Resolver } from 'dns/promises'


export default function Provisioning({ id }: { id: string }) {
  const [category, setCategory] = useState<Category[]>([])
  const [categoryId, setCategoryId] = useState<Number>();
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

  } = useForm<ProvisioningPost>();

  useEffect(() => {
    fetch("http://localhost:8080/category/credit")
      .then(res => res.json())
      .then((data: Category[]) => {
        setCategory(data)
      })

  }, [category])



  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = parseInt(event.target.value, 10);
    setCategoryId(categoryId);
    console.log(categoryId)
  };

  const onSubmit = (data: ProvisioningPost) => {
    const post : ProvisioningPost = {
      ...data,
      accountId : id
    }
    console.log(data)
    fetch(`http://localhost:8080/provising/save/${categoryId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
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
      <div className='text-red-500 text-sm flex flex-row gap-6 mb-3'>
        {errors.amount && <p>/ {errors.amount.message} /</p>}
        {errors.reason && <p>/ {errors.reason.message} /</p>}
        {errors.effectiveDate && <p>/ {errors.effectiveDate.message} /</p>}

      </div>
      <form action="" className='flex flex-row gap-6 items-center' onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="">
          <input type="number" className='focus:outline-none px-2 py-2 bg-slate-400 text-white text-sm rounded-md placeholder:text-sm placeholder:text-white ' placeholder='amount$'
            {...register("amount", {
              required: "add an amount",
              min: { value: 0, message: "amount > 0" }
            })} />
        </label>
        <label htmlFor="">
          <input type="text" className='focus:outline-none px-2 py-2 bg-slate-400 text-white text-sm rounded-md placeholder:text-sm placeholder:text-white' placeholder='reason'
            {...register("reason", {
              required: "reason is required"
            })} />
        </label>
        <label htmlFor="">
          <input type="date" className=' focus:outline-none px-2 py-2 bg-slate-400 text-white text-sm rounded-md placeholder:text-sm placeholder:text-white' placeholder='effective date'
            {...register("effectiveDate", {
              required: "specify a date"
            })} />
        </label>
        <select className='ml-3 px-2 font-sans py-2 rounded-md  bg-slate-400 text-white' id="monthSelect" onChange={handleChange}>
          <option className='' value=''>category</option>
          {category.map((cat) => (
            <option key={cat.subCategoryId} value={cat.subCategoryId} className='font-sans border-none'>{cat.subCategory}</option>
          ))}
        </select>
        <button type='submit' className='px-6 py-2 bg-red-500 rounded-md text-white text-sm'>provise</button>
      </form>
    </>
  )
}
