import { useEffect } from "react";
import Carousel from "./Carousel";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      navigate("/postlogin");
    }
  }, []);

  const slides = [
    "https://res.cloudinary.com/dybvod0l2/image/upload/v1720670544/image_39_vit75q.png",
    "https://res.cloudinary.com/dybvod0l2/image/upload/v1720670544/image_39_vit75q.png",
    "https://res.cloudinary.com/dybvod0l2/image/upload/v1720670544/image_39_vit75q.png",
  ];
  return (
    <div className="relative w-full h-full">
      <div className="w-full h-screen pb-12 flex justify-center items-end bg-[url('https://res.cloudinary.com/dybvod0l2/image/upload/v1720670544/image_39_vit75q.png')] bg-no-repeat bg-cover">
        <Carousel>
          {slides.map((slide, i) => (
            <div key={i} className="w-full h-full">
              <h1 className="font-semibold text-[32px] leading-[40px] text-white text-center">
                We serve incomparable delicacies
              </h1>
              <p className="font-normal text-[14px] leading-[20px] text-center text-white mt-6">
                All the best restaurants with their top menu waiting for you,
                they cant’t wait for your order!!
              </p>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Home;
