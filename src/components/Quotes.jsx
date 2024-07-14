import { useEffect, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Quotes = () => {
  const category = "history";
  const apiKey = import.meta.env.VITE_API_NINJA_KEY;
  const intervalRef = useRef(null); // Use ref to store interval id

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await axios.get(
          `https://api.api-ninjas.com/v1/quotes?category=${category}`,
          {
            headers: {
              "X-Api-Key": apiKey,
            },
          }
        );
        if (response.data.length > 0) {
          const quote = response.data[0];
          toast.dismiss(); // Clear all previous toasts
          toast(`${quote.quote}`, {
            position: "bottom-right",
            autoClose: 4500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnFocusLoss: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      } catch (error) {
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
        toast.dismiss(); // Clear all previous toasts
        toast.error("Failed to fetch quotes");
      }
    };

    fetchQuotes(); // Initial fetch

    // Set the interval and store the id in a ref
    intervalRef.current = setInterval(fetchQuotes, 5000);

    // Cleanup interval on component unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [category, apiKey]);

  return (
    <>
      <ToastContainer />
    </>
  );
};

export default Quotes;
