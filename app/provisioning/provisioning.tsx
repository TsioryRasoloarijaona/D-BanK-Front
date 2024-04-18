"use client"
import React from 'react'
import { Category, ProvisioningPost } from '../interface/provisioningInterface'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Message from '../interface/message'
import Modal from '../components/modal'



export default function Provisioning({ id }: { id: string }) {
  const [category, setCategory] = useState<Category[]>([])
  const [categoryId, setCategoryId] = useState<Number>();
  const [message, setMessage] = useState<Message>()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [url, setUrl] = useState('provising/save');
  const [type, setType] = useState('credit')
  const [choice, setChoice] = useState(true);

  const makeTrue = () => {
    setChoice(true)
  }
  const makeFalse = () => {
    setChoice(false)
  }

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
    !choice ? (
      setType('debit'),
      setUrl('expense')
    ) : (
      setType('credit'),
      setUrl('provising/save')
    )
  }, [choice])

  useEffect(() => {
    fetch(`http://localhost:8080/category/${type}`)
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
    const post: ProvisioningPost = {
      ...data,
      accountId: id
    }
    console.log(data)
    fetch(`http://localhost:8080/${url}/${categoryId}`, {
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
      


      <div className='w-full shadow-xl rounded-xl flex flex-row items-center justify-between h-fit py-3 px-4'>
        <div className='flex flex-col gap-6 text-sm mx-auto'>
          <button onClick={makeTrue} className={`py-2 px-4 rounded-3xl border border-red-500 ${choice ? 'bg-red-500 text-white' : ''}`}>provise</button>
          <button onClick={makeFalse} className={`py-2 px-4 rounded-3xl border border-red-500 ${!choice ? 'bg-red-500 text-white' : ''}`}>withdrawal</button>
        </div>
        <form action="" className=' w-3/4 flex flex-row items-center justify-evenly' onSubmit={handleSubmit(onSubmit)}>
          <div className='text-center space-y-5'>
            <label htmlFor="" className='block'>
              {errors.amount && <p className='text-red-500 text-sm'>{errors.amount.message}!</p>}
              <input type="number" className='focus:outline-none px-2 py-2 bg-white text-sm border-b border-black rounded-md placeholder:text-sm placeholder:text-black' placeholder='amount$'
                {...register("amount", {
                  required: "add an amount",
                  min: { value: 0, message: "amount > 0" }
                })} />
            </label>
            <label htmlFor="" className='block'>
              {errors.reason && <p className='text-red-500 text-sm'> {errors.reason.message}!</p>}
              <input type="text" className='focus:outline-none px-2 py-2 bg-white border-b border-black text-sm rounded-md placeholder:text-sm placeholder:text-black' placeholder='reason'
                {...register("reason", {
                  required: "reason is required"
                })} />
            </label>
          </div>
          <div className='text-center space-y-5'>
          {choice? (
          <label htmlFor="" className='block'>
            {errors.effectiveDate && <p className='text-red-500 text-sm'>{errors.effectiveDate.message} !</p>}
            <input type="date" className=' focus:outline-none px-2 py-2 bg-white border-b border-black  text-sm rounded-md placeholder:text-sm placeholder:text-white w-full' placeholder='effective date'
              {...register("effectiveDate", {
                required: "specify a date"
              })} />
          </label>

          ):null}
            <select className=' px-2 font-sans py-2 rounded-md  bg-white text-black  border-b border-black w-full block' id="monthSelect" onChange={handleChange}>
              <option className='' value=''>category</option>
              {category.map((cat) => (
                <option key={cat.subCategoryId} value={cat.subCategoryId} className='font-sans border-none text-sm'>{cat.subCategory}</option>
              ))}
            </select>
          </div>
          {choice ? (<button type='submit' className='px-6 py-2 bg-red-500 rounded-md text-white text-sm'>Provise</button>) :
            (<button type='submit' className='px-6 py-2 bg-red-500 rounded-md text-white text-sm'>withdrawal</button>)}
        </form>

      </div>

    </>
  )
}
