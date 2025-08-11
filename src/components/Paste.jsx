import { Calendar, Copy, Eye, PencilLine, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { removeFromPastes } from "../redux/pasteSlice";
import { FormatDate } from "../utlis/formatDate";
import { Link } from "react-router-dom";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (id) => {
    dispatch(removeFromPastes(id));
  };

  const filteredPastes = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0 bg-black text-white">
      <div className="flex flex-col gap-y-3">
        {/* Search */}
        <div className="w-full flex gap-3 bg-gray-800 px-4 py-2 rounded border border-blue-600 mt-6">
          <input
            type="search"
            placeholder="Search paste here..."
            className="focus:outline-none w-full bg-transparent text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* All Pastes */}
        <div className="flex flex-col py-4 rounded bg-gray-800">
          <h2 className="px-4 text-4xl font-bold border-b border-blue-600 pb-4">
            Your Notes
          </h2>
          <div className="w-full px-4 pt-4 flex flex-col gap-y-5">
            {filteredPastes.length > 0 ? (
              filteredPastes.map((paste) => (
                <div
                  key={paste?._id}
                  className="w-full flex flex-col sm:flex-row p-4 rounded bg-gray-700"
                >
                  {/* Heading and Description */}
                  <div className="w-full sm:w-[50%] flex flex-col space-y-2">
                    <p className="text-3xl font-semibold">{paste?.title}</p>
                    <p className="text-sm font-normal line-clamp-3 max-w-[80%] text-gray-300">
                      {paste?.content}
                    </p>
                  </div>

                  {/* Icons */}
                  <div className="flex flex-col justify-between sm:items-end">
                    <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                      <Link
                        to={`/?pasteId=${paste?._id}`}
                        className="p-2 rounded bg-gray-600 hover:bg-gray-500 transition duration-300"
                      >
                        <PencilLine className="text-blue-400" size={20} />
                      </Link>

                      <button
                        className="p-2 rounded bg-gray-600 hover:bg-gray-500 transition duration-300"
                        onClick={() => handleDelete(paste?._id)}
                      >
                        <Trash2 className="text-pink-400" size={20} />
                      </button>

                      <Link
                        to={`/pastes/${paste?._id}`}
                      
                        rel="noopener noreferrer"
                        className="p-2 rounded bg-gray-600 hover:bg-gray-500 transition duration-300"
                      >
                        <Eye className="text-orange-400" size={20} />
                      </Link>

                      <button
                        className="p-2 rounded bg-gray-600 hover:bg-gray-500 transition duration-300"
                        onClick={() => {
                          navigator.clipboard.writeText(paste?.content);
                          toast.success("Copied to Clipboard");
                        }}
                      >
                        <Copy className="text-green-400" size={20} />
                      </button>
                    </div>

                    <div className="flex items-center mt-2 text-gray-400">
                      <Calendar size={20} />
                      <span className="ml-1">{FormatDate(paste?.createdAt)}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-2xl text-center w-full text-red-500">
                No Data Found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paste;
