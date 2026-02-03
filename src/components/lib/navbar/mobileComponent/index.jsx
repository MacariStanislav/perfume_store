import React from 'react'
import SaidbarMenu from './saidbarMenu'
import Input from '../input'
import Link from 'next/link'
const MobileNavbar = () => {
    return (
        <div className='mobileNavbar'>
            <SaidbarMenu />
            <Input />
              <Link href={'/'}><img src="/logo.svg" alt="" /></Link>
            <ul>
                <li>
                    <Link href={'/'}><img src="icons/navbar/navbarProfile.svg" alt="" width={40} height={40} /></Link>
                </li>
                <li>
                    <Link href={'/catalog'}><img src="icons/navbar/navbarBasket.svg" alt="" width={40} height={40} /></Link>
                </li>
            </ul>

        </div>
    )
}

export default MobileNavbar
