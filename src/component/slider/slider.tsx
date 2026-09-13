'use client'
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
export default function Slider({
    spaceBetween,
    slidesPerview,
    listOfImages,
    height
}
    :
    {spaceBetween: number;
    slidesPerview: number;
    listOfImages: string[];
    height: string}) {
  return (
    <Swiper
     modules={[Navigation, Pagination]}
     navigation
      pagination={{ clickable: true ,bulletActiveClass:'swiper-pagination-bullet-active',
        renderBullet: function (index, className) {
          return `<span class="${className} w-5! h-5! bg-white! "></span>`;
        }
      }}
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerview}
      className={height}
    >
    
    
      {listOfImages.map((image, index) => (
        <SwiperSlide key={index}>
     <div className='relative w-full h-full '>
              <img className="w-full h-full  object-cover" src={image} alt={`Slide ${index + 1}`} />
             <div className=' absolute inset-0 bg-[#16A34A]/70 z-5'>

           <div className=' absolute top-20 left-30 z-10 inset-0 '>
                <h3 className=' text-3xl font-bold text-[#FFFFFF] w-[353px]'>Fresh Products Deliveredto your Door</h3>
                <p className=' font-medium text-[#FFFFFF] my-4'>Get 20% off your first order</p>
                <div className='flex gap-5'>
                    <button className='bg-[#FFFFFF] w-32 h-11 text-[#00C950] rounded-[8px]' >Shop Now</button>
                    <button className='border border-2 border-[#FFFFFF80] rounded-[8px] bg-transparent py-2 px-6 text-[#FFFFFF]'>View Details</button>
                </div>
              </div>
             </div>
    </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}


