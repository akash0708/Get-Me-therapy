// eslint-disable-next-line no-unused-vars
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import { Eye, EyeOff } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      navigate("/postlogin");
    }
  }, []);

  async function handleSignup() {
    if (!email || !name || !password) {
      toast.error("Please fill in all the fields");
      return;
    }
    if (!isChecked) {
      toast.error("Please agree to the terms and conditions");
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/signup`,
        { email, name, password },
        config
      );

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/postlogin");
    } catch (error) {
      toast.error(error.response.data.error);
      console.log(error.response.data.error);
      setLoading(false);
    }
  }

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
      );

      // create a user in the database by extracting the email and username from the userInfo
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const { data } = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/glogin`,
          { email: userInfo.data.email, name: userInfo.data.name },
          config
        );

        localStorage.setItem("userInfo", JSON.stringify(data));
        navigate("/postlogin");
      } catch (error) {
        console.log(error);
      }

      // then save the user in the local storage from the response returned from the server
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <div className="w-full h-full flex flex-col gap-4 font-inter px-6 py-16 border-0 sm:border">
      <h1 className="text-4xl leading-10 font-semibold">
        Create your new account
      </h1>
      <p className="text-base font-medium text-[#878787] leading-5">
        Create an account to start looking for the food you like
      </p>

      <div className="w-full h-fit flex flex-col gap-4 relative">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-[#101010] font-medium">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter Email"
            className="w-full border py-4 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FE8C00] focus:border-transparent"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="text-[#101010] font-medium">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter Username"
            className="w-full border py-4 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FE8C00] focus:border-transparent"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="relative flex flex-col gap-2">
          <label htmlFor="password" className="text-[#101010] font-medium">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Password"
            className="w-full border py-4 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FE8C00] focus:border-transparent"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {showPassword ? (
            <Eye
              className="absolute right-2 top-[50px]"
              size={24}
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <EyeOff
              className="absolute right-2 top-[50px]"
              size={24}
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
        </div>

        <div>
          <input
            type="checkbox"
            id="terms"
            name="terms"
            className="custom-checkbox mr-1 w-[15px] h-[15px]"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />
          <label htmlFor="terms" className="text-[#101010] font-medium">
            I Agree with{" "}
            <span className="text-[#FE8C00]">Terms of Service</span> and{" "}
            <span className="text-[#FE8C00]">Privacy Policy</span>
          </label>
        </div>
      </div>
      <button
        className="bg-[#FE8C00] hover:bg-[#fe8c00bf] transition duration-200 py-4 rounded-full relative text-white text-center font-semibold z-10"
        onClick={handleSignup}
        disabled={loading}
      >
        {loading ? <Spinner /> : "Register"}
      </button>
      <div className="w-full h-full relative top-2 flex flex-col gap-2 justify-center items-center">
        <hr className="h-[1px] relative border-0 bg-[#878787] w-full" />
        <p className="text-[#878787] relative -top-5 bg-white px-6 font-medium">
          Or register with
        </p>
        <button
          className="w-12 h-12 rounded-full border border-[#D6D6D6] p-2"
          onClick={googleLogin}
        >
          <img src="https://img.icons8.com/color/48/000000/google-logo.png" />
        </button>
        <p className="text-[#101010] font-medium relative mt-4">
          Have an account?{" "}
          <Link to="/login" className="text-[#FE8C00]">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
