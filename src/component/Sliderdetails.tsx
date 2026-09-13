'use client'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

export default function Sliderdetails({spaceBetween,slidesPerView ,listOfImages}:{spaceBetween:number,slidesPerView:number,listOfImages:string[]}) {
  return (
    <Swiper
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}


   
    >
     
      {listOfImages.map((img,index)=>{
        return (
             <SwiperSlide key={index}>
                <img className="w-full h-full  object-cover" src={img} alt={`Slide ${index + 1}`} />
             </SwiperSlide>
        )
      })}
      ...
    </Swiper>
  );
}
