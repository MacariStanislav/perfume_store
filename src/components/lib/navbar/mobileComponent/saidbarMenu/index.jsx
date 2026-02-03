import React, { useState } from 'react'
import MenuBlock from './MenuBlock'
import Link from 'next/link'
const SaidbarMenu = () => {
    const [open, setOpen] = useState(true)
    let mobileBlock = (open) ? "MobileMenu" : ""
    return (<>

        <button className='mobileSaidbarButton' onClick={() => setOpen(!open)}>
            <div></div>
            <div></div>
            <div></div>
        </button>


        <nav className={"mobileSaidbarMenu " + mobileBlock}>
            <button className='mobileSaidbarClose' onClick={() => setOpen(!open)}>
                    <img src="/icons/navbar/mobile/mobileClose.svg" alt="" width={40}height={40} />

                </button>
            <div className='mobileTopSaidbarMenu'>
                
                <Link href={'/'}><img src="/logo.svg" alt=""width={50} /></Link>
            </div>
            <MenuBlock />
        </nav>

    </>
    )
}

export default SaidbarMenu
