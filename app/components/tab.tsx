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
    <div className='flex flex-row border rounded-lg justify-between mx-auto w-[95vw]  mt-4 h-[85vh] overflow-auto shadow-xl bg-white'>
        <div className='w-1/5  flex flex-col items-center border-r'>
            {tabs.map((tab , index)=>(
                <div className='py-3 pb-4 border-b w-2/3 text-center px-3 cursor-pointer mb-3 ' key={index} onClick={()=> setActiveTab(index)}>
                    {tab.label}
                
                </div>
            ))}
        </div>
        <div className=' w-4/5 px-10 py-5'>
            {tabs[activeTab].content}
        </div>
    </div>
  )
}
export default VerticalTab;
