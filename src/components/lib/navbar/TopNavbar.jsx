import React from 'react'
import Link from 'next/link'

const TopNavbar = () => {
    const country = "Москва"
    const number = "7(937) 136 - 77 - 66"

    return (<div className='topNavbar'>
        <p><img src="/icons/navbar/navbarCursor.svg" alt="" />Ваш город: {country}</p>
        <ul>
            <li><Link href={'/bonus'}>Бонусы</Link></li>
            <li><Link href={'/document'}>Документация</Link></li>
            <li><Link href={'/about'}>О нас</Link></li>
            <li><Link href={'/'}><img src="/icons/navbar/navbarPhone.svg" alt="" />{number}</Link></li>
        </ul>
    </div>
    )
}

export default TopNavbar
