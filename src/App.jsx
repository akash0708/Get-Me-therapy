import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Timer from "./components/Timer";
import Home from "./components/Home";
import { register } from "swiper/element";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PostLogin from "./components/PostLogin";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import Quotes from "./components/Quotes";

register();

function App() {
  useEffect(() => {
    console.log(window.innerWidth);
    if (window.innerWidth > 560) {
      toast(
        "For best experience, open in mobile view or use dev tools to simulate mobile view `(Ctrl + Shift + I)`. Choose iPhone 12 Pro for best experience.",
        {
          position: "top-right",
          autoClose: 7000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        }
      );
    }
  }, []);
  return (
    <BrowserRouter>
      <div className="relative w-full h-screen sm:w-[24.375rem] sm:h-[54rem] mx-auto sm:py-2">
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/timer" element={<Timer />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/postlogin" element={<PostLogin />} />
          <Route path="/quotes" element={<Quotes />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

// add sound on complete
// remvoe input timer component
// conditionally render the start and pause/resume button
