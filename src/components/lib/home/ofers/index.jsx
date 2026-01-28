import React from 'react'
import '@/styles/components/ofers.css'
import OfersList from './OfersList'
const Ofers = () => {
  return (
    <div className='ofers'>
      <p className='ofersStartText'>Популярные ароматы</p>
      <OfersList/>
    </div>
  )
}

export default Ofers
