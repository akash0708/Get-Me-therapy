// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PostLogin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) {
      navigate("/login");
    }
  }, []);

  function handleClick() {
    navigate("/timer");
  }

  function handleLogout() {
    localStorage.removeItem("userInfo");
    navigate("/login");
  }

  return (
    <main className="w-full h-full border-0 sm:border flex flex-col-reverse bg-[url('https://res.cloudinary.com/dybvod0l2/image/upload/v1720670544/image_39_vit75q.png')] bg-no-repeat bg-cover overflow-hidden">
      <AnimatePresence>
        <motion.div
          key="modal"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ duration: 0.75 }}
          className="bg-white w-full h-1/2 px-8 flex flex-col justify-center items-center gap-8 rounded-tr-3xl rounded-tl-3xl"
        >
          <div className="w-1/2 h-fit">
            <img
              src="https://res.cloudinary.com/dybvod0l2/image/upload/v1720752198/Illustration_Success_z8hqi2.png"
              className="w-full h-full object-contain"
              alt=""
            />
          </div>
          <h1 className="text-[#101010] font-semibold font-inter text-2xl leading-8">
            Login Successful
          </h1>
          <button
            className="bg-[#FE8C00] hover:bg-[#fe8c00bf] transition duration-200 w-full font-inter py-4 rounded-full relative text-white text-sm text-center font-semibold"
            onClick={handleClick}
          >
            Go to Tracking Screen
          </button>
          <p
            className="font-medium text-sm text-[#878787] hover:text-[#FE8C00] cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </p>
        </motion.div>
      </AnimatePresence>
    </main>
  );
};

export default PostLogin;

// Can integrate vaul dialog box
