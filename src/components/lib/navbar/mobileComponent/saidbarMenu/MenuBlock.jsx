
import React from 'react'
import Link from 'next/link'
const MenuBlock = () => {
    const country = "Москва"
    const number = "7(937) 136 - 77 - 66"
    return (
        <ul className='mobileNavbarBlock'>
            <li>
                <button className="mobileNavbarButton mobileCatalogMenu">Мужские</button>
            </li>
            <li>
                <button className="mobileNavbarButton mobileCatalogMenu">Женские</button>
            </li>
            <li>
                <button className="mobileNavbarButton mobileCatalogMenu">Унисекс</button>
            </li>
            <li>
                <img src="/icons/navbar/navbarCursor.svg" alt="" width={20} />  <span>Ваш город: {country}</span>
            </li>
            <li>
                <Link href={'/'} style={{"display":"flex","gap":"0.78rem"}}><img src="/icons/navbar/navbarPhone.svg" alt="" width={20} />{number}</Link>
            </li>
            <li><Link href={'/bonus'} className='mobileNavbarBlockMenuText'>Бонусы</Link></li>
            <li><Link href={'/document'} className='mobileNavbarBlockMenuText'>Документация</Link></li>
            <li><Link href={'/about'} className='mobileNavbarBlockMenuText'>О нас</Link></li>
        </ul>

    )
}

export default MenuBlock
