import React from 'react'
import VerticalTab from './tab'


export default function page() {
    const tab = [
        {label : "acceuil" , content : <p>welcome</p>},
        {label : "detal" , content : <p>my name is detail</p>},
        {label : "detal" , content : <p>my name is detail</p>},
        {label : "detal" , content : <p>my name is detail</p>},
        {label : "detal" , content : <p>my name is detail</p>},
        {label : "detal" , content : <p>my name is detail</p>}
    ]
  return (
    <div>
      <VerticalTab tabs={tab}/>
    </div>
  )
}
