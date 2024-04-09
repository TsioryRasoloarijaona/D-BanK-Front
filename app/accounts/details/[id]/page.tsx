import React from 'react'
import VerticalTab from '@/app/components/tab';
import { FaCircleInfo } from "react-icons/fa6";
import { FaExchangeAlt } from "react-icons/fa";
import { FaArrowsRotate } from "react-icons/fa6";
import { RiHandCoinFill } from "react-icons/ri";
import { PiBankFill } from "react-icons/pi";
import { CiInboxOut } from "react-icons/ci";
import { FaDownLeftAndUpRightToCenter } from "react-icons/fa6";
import { BiSolidDollarCircle } from "react-icons/bi";
import BankStatement from '@/app/bankStetement/BankStatement';
import Info from '@/app/info/info';
import Loan from '@/app/loan/loan';
import Provisioning from '@/app/provisioning/provisioning';
import Transfer from '@/app/transfer/transfer';


export default function page({params}: {params : {id : String}}) {
  const tab = [
    {label : <p><FaCircleInfo className='text-2xl mx-auto mt-3' />Info</p> , content : <Info id= {`${params.id}`}/>},
    {label : <p><BiSolidDollarCircle className='text-2xl mx-auto' />Balance</p> , content : <p>my name is detail</p>},
    {label : <p><FaExchangeAlt className='text-2xl mx-auto' />Transfer</p> , content : <Transfer id= {`${params.id}`}/>},
    {label : <p><FaArrowsRotate className='text-2xl mx-auto' />Transaction</p> , content : <p>my name is detail</p>},
    {label : <p><RiHandCoinFill className='text-2xl mx-auto' />Loan money</p> , content : <Loan id={`${params.id}`}/>},
    {label : <p><PiBankFill className='text-2xl mx-auto' />Bank Statement</p> , content : <BankStatement id= {`${params.id}`}/>},
    {label : <p><FaDownLeftAndUpRightToCenter className='text-2xl mx-auto' />provisioning</p> , content : <Provisioning id= {`${params.id}`}/>},
    {label : <p><CiInboxOut className='text-2xl mx-auto' />withdrawal</p> , content : <p>provisioning</p>}
]
return (
<div className='mt-0'>
  <VerticalTab tabs={tab}/>
</div>
)
}
