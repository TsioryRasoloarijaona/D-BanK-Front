import React from 'react'
import BalanceHistory from './balanceHistory'

export default function Balance({id} : {id : string}) {
  return (
    <BalanceHistory id={id}/>
  )
}
