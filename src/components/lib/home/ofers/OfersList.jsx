import React from 'react'
import ofersImages from './ofersImages'

const OfersList = () => {
    return (
        <ul className="ofersList">
            {ofersImages.map((item, index) => (
                <li key={index} className="ofersElement">
                    <img
                        src={item.imgURL}
                        className="ofersImage"
                    />

                    <span className="ofersTopText">{item.topTxt}</span>

                    <div className="ofersBottom">
                        <p className="ofersBottomText">{item.bottomTxt}</p>
                        <button className="ofersButton"><span>В КОРЗИНУ </span></button>
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default OfersList
