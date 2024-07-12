import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    console.log(email, password);
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        config
      );

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/postlogin");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  return (
    <div className="w-full h-screen flex flex-col gap-4 font-inter px-6 py-16">
      <h1 className="text-4xl leading-10 font-semibold">
        Login to your account.
      </h1>
      <p className="text-base font-medium text-[#878787] leading-5">
        Please sign in to your account
      </p>

      <div className="w-full h-fit flex flex-col mt-10 gap-4 relative">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-[#101010] font-medium">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter Email"
            className="w-full border py-4 px-2 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-[#101010] font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className="w-full border py-4 px-2 rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <a
          href="#"
          className="text-[#FE8C00] absolute right-0 -bottom-12 font-medium text-lg"
        >
          Forgot password?
        </a>
      </div>
      <button
        className="bg-[#FE8C00] py-4 rounded-full relative top-[7%] text-white text-center font-semibold"
        onClick={handleLogin}
      >
        Sign in
      </button>
      <div className="w-full h-full relative flex flex-col gap-2 justify-center items-center">
        <hr className="h-[1px] relative border-0 bg-[#878787] w-full" />
        <p className="text-[#878787] relative -top-5 bg-white px-6 font-medium">
          Or sign in with
        </p>
        <button className="w-12 h-12 rounded-full border border-[#D6D6D6] p-2">
          <img src="https://img.icons8.com/color/48/000000/google-logo.png" />
        </button>
        <p className="text-[#101010] font-medium relative mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#FE8C00]">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
