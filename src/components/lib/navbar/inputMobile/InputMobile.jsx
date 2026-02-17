import React, { useState } from 'react'

const InputMobile = () => {
    const [open, setOpen] = useState(false)
    return (

        <>
            {open && <form className='input'>
                <input type="text" placeholder="Найти парфюм.."></input>
                <img src="/icons/navbar/navbarSearch.svg" alt="" width={24} height={24} onClick={() => setOpen(!open)} />
                <div></div>
            </form>
            }
            {!open &&
            <img src="/icons/navbar/navbarSearch.svg" alt="" width={24} height={24} onClick={() => setOpen(!open)} />
            }
        </>

    )
}

export default InputMobile
