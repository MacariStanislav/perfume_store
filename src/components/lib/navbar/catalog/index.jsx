import React, { useState } from 'react';

const Catalog = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
    <div className="catalogWrapper">
      <button
        className="navbarButton catalogNavbar"
        onClick={() => setOpen(!open)}
      >
        <img src="/icons/navbar/navbarCatalog.svg" alt="" width={24} height={24} />
        КАТАЛОГ
      </button>

      {open && (
        <div className="menuCatalog">
          <ul>
            <li>
              <button className="navbarButton menu">Мужские</button>
            </li>
            <li>
              <button className="navbarButton menu">Женские</button>
            </li>
            <li>
              <button className="navbarButton menu">Унисекс</button>
            </li>
          </ul>
        </div>
      )}
    </div>
   
    </>
  );
};

export default Catalog;
