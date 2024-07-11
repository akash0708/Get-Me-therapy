import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { useSwiper } from "swiper/react";

const Home = () => {
  const swiper = useSwiper();
  return (
    <div className="w-full h-screen overflow-hidden flex justify-center items-center font-inter">
      <div className="absolute -z-10 overflow-hidden w-full h-full">
        <img
          src="https://res.cloudinary.com/dybvod0l2/image/upload/v1720670544/image_39_vit75q.png"
          className="w-full h-full"
          alt=""
        />
      </div>
      console.log(swiper);
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
        className="w-[80%] h-1/2 absolute bottom-10 bg-[#FE8C00] rounded-[48px] p-7"
      >
        {console.log(swiper)}
        <SwiperSlide>
          <h1 className="font-semibold text-[32px] leading-[40px] text-white text-center">
            We serve incomparable delicacies
          </h1>
          <p className="font-normal text-[14px] leading-[20px] text-center text-white mt-6">
            All the best restaurants with their top menu waiting for you, they
            cant’t wait for your order!!
          </p>
          <button
            onClick={() => console.log(swiper)}
            className="z-20 absolute bottom-5 bg-white p-2"
          >
            Slide to the next slide
          </button>
        </SwiperSlide>
        <SwiperSlide>
          <h1 className="font-semibold text-[32px] leading-[40px] text-white text-center">
            We serve incomparable delicacies
          </h1>
          <p className="font-normal font-inter text-[14px] leading-[20px] text-center text-white mt-6">
            All the best restaurants with their top menu waiting for you, they
            cant’t wait for your order!!
          </p>
        </SwiperSlide>
        <SwiperSlide>
          <h1 className="font-semibold text-[32px] leading-[40px] text-white text-center">
            We serve incomparable delicacies
          </h1>
          <p className="font-normal text-[14px] leading-[20px] text-center text-white mt-6">
            All the best restaurants with their top menu waiting for you, they
            cant’t wait for your order!!
          </p>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Home;
