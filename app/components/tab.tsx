"use client"
import React, { useState } from 'react'

interface tab {
    label : React.ReactNode,
    content : React.ReactNode
}

interface tabPops {
    tabs : tab[]
}

const VerticalTab : React.FC<tabPops> = ({tabs}) => {
    const [activeTab , setActiveTab] = useState(0)
  return (
    <div className='flex flex-row border rounded-lg justify-between mx-auto w-[98vw]  h-[90vh] overflow-hidden shadow-xl bg-white'>
        <div className='w-1/5  flex flex-col items-center border-r'>
            {tabs.map((tab , index)=>(
                <div className={`py-2 pb-2 border-b w-2/3 text-center px-3 cursor-pointer mb-3 ${activeTab === index ? ' text-red-500':''}`} key={index} onClick={()=> setActiveTab(index)}>
                    {tab.label}
                
                </div>
            ))}
        </div>
        <div className=' w-4/5 px-10 py-5 overflow-auto'>
            {tabs[activeTab].content}
        </div>
    </div>
  )
}
export default VerticalTab;
