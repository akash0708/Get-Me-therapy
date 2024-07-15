import { Copy } from "lucide-react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const GenerateUrl = ({ time, speed }) => {
  const [url, setUrl] = useState("");

  const handleGenerateLink = () => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    const uniqueId = uuidv4();
    const queryParams = new URLSearchParams();
    queryParams.set("id", uniqueId);
    queryParams.set("hours", hours);
    queryParams.set("minutes", minutes);
    queryParams.set("seconds", seconds);
    queryParams.set("speed", speed);
    const genUrl = `${window.location.origin}/timer?${queryParams.toString()}`;
    console.log("Generated URL:", genUrl);
    setUrl(genUrl);
  };

  const handleCopyToClipboard = () => {
    // Implement copying to clipboard
    navigator.clipboard
      .writeText(url)
      .then(() => {
        console.log("URL copied to clipboard:", url);
        // Optionally, display a success message or toast
      })
      .catch((err) => {
        console.error("Failed to copy URL to clipboard:", err);
        // Handle error, show an alert, etc.
      });
  };
  return (
    <div className="w-full flex flex-col mt-6 gap-6 justify-center items-center">
      <button
        onClick={handleGenerateLink}
        className="w-[80%] px-4 py-2 rounded-full bg-[#FE8C00] hover:bg-[#fe8c00bf] transition duration-200 text-white font-semibold"
      >
        Generate URL
      </button>
      {url && (
        <div className="w-[80%] border px-1 flex rounded-lg">
          <p className="overflow-hidden text-ellipsis whitespace-nowrap py-1 text-sm font-medium text-green-500">
            {url}
          </p>
          <div
            className="border-l-2 flex justify-center items-center pl-2 pr-1 hover:bg-slate-300"
            onClick={handleCopyToClipboard}
          >
            <Copy size={16} />
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerateUrl;
