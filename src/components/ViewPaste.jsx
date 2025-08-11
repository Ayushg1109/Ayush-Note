import { Copy } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ViewPaste = () => {
  const { id } = useParams();
  const pastes = useSelector((state) => state.paste.pastes);

  const paste = pastes.find((p) => p._id === id);

  if (!paste) {
    return (
      <div className="w-full h-full flex items-center justify-center text-red-500">
        Paste not found
      </div>
    );
  }

  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0 bg-[#0b1120] text-white">
      <div className="flex flex-col gap-y-5 items-start">
        {/* Title Input */}
        <input
          type="text"
          placeholder="Title"
          value={paste.title}
          disabled
          className="w-full bg-[#0f172a] text-gray-200 border border-blue-600 rounded-md p-3 focus:outline-none"
        />

        {/* Content Box */}
        <div className="w-full flex flex-col items-start relative rounded border border-blue-600 bg-[#0f172a]">
          {/* Top Bar */}
          <div className="w-full rounded-t flex items-center justify-between gap-x-4 px-4 py-2 border-b border-blue-600">
            {/* Traffic Lights */}
            <div className="flex gap-x-[6px] items-center select-none">
              <div className="w-[13px] h-[13px] rounded-full bg-[rgb(255,95,87)]" />
              <div className="w-[13px] h-[13px] rounded-full bg-[rgb(254,188,46)]" />
              <div className="w-[13px] h-[13px] rounded-full bg-[rgb(45,200,66)]" />
            </div>

            {/* Copy Button */}
            <div className="flex items-center">
              <button
                className="p-2 hover:bg-gray-700 rounded transition-all duration-300"
                onClick={() => {
                  navigator.clipboard.writeText(paste.content);
                  toast.success("Copied to Clipboard");
                }}
              >
                <Copy className="text-gray-300 hover:text-green-400" size={20} />
              </button>
            </div>
          </div>

          {/* Text Area */}
          <textarea
            value={paste.content}
            disabled
            placeholder="Write Your Content Here...."
            className="w-full p-3 text-gray-200 bg-transparent focus:outline-none resize-none"
            style={{
              caretColor: "#fff",
            }}
            rows={20}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;
