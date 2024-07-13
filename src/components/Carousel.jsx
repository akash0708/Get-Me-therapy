import { ChevronLeftIcon, ChevronRightIcon, MoveRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Carousel = ({ children: slides }) => {
  const navigate = useNavigate();

  function handleSkip() {
    navigate("/login");
  }
  const [curr, setCurr] = useState(0);

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
  return (
    <div className="flex justify-between items-center overflow-hidden relative bg-[#FE8C00] w-[80%] h-1/2 rounded-[48px] p-7">
      <div
        className="flex gap-16 px-6 transition-transform ease-out duration-500 w-full h-full"
        style={{ transform: `translateX(-${curr * 101}%)` }}
      >
        {slides}
      </div>
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          onClick={handleSkip}
          className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
        >
          <ChevronLeftIcon size={40} />
        </button>
        <button
          onClick={next}
          className="absolute text-white font-semibold bottom-8 right-8 flex flex-row gap-2 justify-center items-center"
        >
          Next <MoveRight color="white" strokeWidth={4} size={16} />
        </button>
      </div>

      <div className="absolute bottom-[8.5rem] right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`
              transition-all w-6 h-[6px] bg-white rounded-md
              ${curr === i ? "" : "bg-opacity-50"}
            `}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
