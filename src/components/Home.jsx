import { Copy, PlusCircle } from "lucide-react";  
import { useEffect, useState } from "react";  
import toast from "react-hot-toast";  
import { useDispatch, useSelector } from "react-redux";  
import { addToPastes, updatePastes } from "../redux/pasteSlice";  
import { useSearchParams } from "react-router-dom";  

const Home = () => {  
  const [value, setValue] = useState("");  
  const [title, setTitle] = useState("");  
  const [searchParams, setSearchParams] = useSearchParams();  
  const pasteId = searchParams.get("pasteId");  
  const pastes = useSelector((state) => state.paste.pastes);  
  const dispatch = useDispatch();  

  const createPaste = () => {  
    const paste = {  
      title: title,  
      content: value,  
      _id: pasteId || Date.now().toString(36) + Math.random().toString(36).substring(2),  
      createdAt: new Date().toISOString(),  
    };  

    if (pasteId) {  
      dispatch(updatePastes(paste));  
    } else {  
      dispatch(addToPastes(paste));  
    }  

    setTitle("");  
    setValue("");  
    setSearchParams({});  
  };  

  const resetPaste = () => {  
    setTitle("");  
    setValue("");  
    setSearchParams({});  
  };  

  useEffect(() => {  
    if (pasteId) {  
      const paste = pastes.find((p) => p._id === pasteId);  
      if (paste) {  
        setTitle(paste.title);  
        setValue(paste.content);  
      }  
    }  
  }, [pasteId, pastes]);  

  return (  
    <div className="w-full h-screen bg-black flex flex-col items-center justify-center">  
      <div className="w-full max-w-[1200px] px-5 lg:px-0 flex flex-col gap-y-6">  
        <div className="w-full flex flex-row items-center">  
          <input  
            type="text"  
            placeholder="Title"  
            value={title}  
            onChange={(e) => setTitle(e.target.value)}  
            className={`${  
              pasteId ? "w-[70%]" : "w-[80%]"  
            } text-white bg-gray-900 border border-blue-500 rounded-lg p-4 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out`}  
          />  
           <button
    className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-400 font-medium rounded-lg text-sm px-5 py-3 transition duration-300 ease-in-out shadow-md hover:shadow-lg hover:scale-105 ml-2 flex-grow"
    onClick={createPaste}
  >
    {pasteId ? "Update Note" : "Create Note"}
  </button>  

          {pasteId && (  
            <button  
              className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-3 transition duration-300 ease-in-out shadow-md ml-2"  
              onClick={resetPaste}  
            >  
              <PlusCircle size={20} />  
            </button>  
          )}  
        </div>  

        <div className="w-full flex flex-col items-start relative bg-gray-900 rounded-lg border border-blue-500 shadow-xl transition duration-300 ease-in-out hover:shadow-2xl">  
          <div className="w-full flex items-center justify-between p-4 border-b border-blue-500">  
            <div className="flex gap-x-1 items-center select-none">  
              <div className="w-2 h-2 rounded-full bg-red-500" />  
              <div className="w-2 h-2 rounded-full bg-yellow-500" />  
              <div className="w-2 h-2 rounded-full bg-green-500" />  
            </div>  
            <button  
              className="flex items-center justify-center transition-all duration-300 ease-in-out"  
              onClick={() => {  
                navigator.clipboard.writeText(value);  
                toast.success("Copied to Clipboard", {  
                  position: "top-right",  
                });  
              }}  
            >  
              <Copy className="text-gray-300 hover:text-blue-300" size={20} />  
            </button>  
          </div>  

          <textarea  
            value={value}  
            onChange={(e) => setValue(e.target.value)}  
            placeholder="Write Your Content Here...."  
            className="w-full p-4 h-64 bg-gray-900 text-white border-none outline-none resize-none rounded-b-lg"  
            style={{ caretColor: "#00ffcc" }}  
            rows={10}  
          />  
        </div>  
      </div>  

      <style jsx>{`  
        input:focus {  
          background: rgba(0, 51, 204, 0.2);  
          border-color: #00ffcc;  
        }  

        textarea:focus {  
          background: rgba(0, 51, 204, 0.2);  
        }  

        /* Glowing effect on hover for buttons */  
        button:hover {  
          box-shadow: 0 0 20px rgba(0, 255, 204, 0.5), 0 0 30px rgba(0, 255, 204, 0.6);  
        }  
      `}</style>  
    </div>  
  );  
};  

export default Home;