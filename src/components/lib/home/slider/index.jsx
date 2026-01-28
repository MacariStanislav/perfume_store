import React from 'react'
import images from './slideImges'
import CustomSlider from './CustomSlider'
const Slider = () => {
  return (
    <div>
       <CustomSlider>
        {images.map((image, index) => {
          return <img key={index} src={image.imgURL} />;
        })}
      </CustomSlider>
    </div>
  )
}

export default Slider
