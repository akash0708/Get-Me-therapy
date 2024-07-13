import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Timer from "./components/Timer";
import Home from "./components/Home";
import { register } from "swiper/element";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PostLogin from "./components/PostLogin";
import Carcomp from "./components/Carcomp";

register();

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/timer" element={<Timer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/postlogin" element={<PostLogin />} />
        <Route path="/test" element={<Carcomp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// add sound on complete
// remvoe input timer component
// conditionally render the start and pause/resume button
