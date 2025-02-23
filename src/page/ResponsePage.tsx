import { useNavigate } from "react-router-dom";
import InputForm from "../components/InputForm";
import {  useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import '../index.css';
interface FormData {
  link: string;
  title: string;
  note: string;
}

export default function ResponsePage() {

  const [title, setTitle] = useState("Good Morning");
  const [subTxt, setSubTxt] = useState("Welcome User...");
  const [leftBtnTxt, setLftBtnTxt] = useState("CLEAR");
  const [BtnTxtClr, setBtnTxtClr] = useState("--primary-yellow");
  const [rightBtnTxt, setRtBtnTxt] = useState("SUBMIT");
  const [notSubmitted, setnotSubmitted] = useState(true);
  const [bgClr, setbgClr] = useState("--primary-yellow");
  const [isError, setisError] = useState('');
  const [showOnlyOne, setShowOnlyOne] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const Navigate = useNavigate();
  const [DoneNumber, setDoneNumber] = useState(0);



  const [formData, setFormData] = useState<FormData>({
    link: '',
    title: '',
    note: ''
  });
  const getLink = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      setFormData({ ...formData, link: tabs[0].url || '', title: tabs[0].title || '' })
    })
  }
  if (formData.link == "" && DoneNumber == 0) {
    getLink();
    setDoneNumber(1);
  }



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const handleResponse = (e: React.FormEvent) => {
    e.preventDefault();
    

    if (formData.link == "" || formData.title == "") {
      setnotSubmitted(true);
      setisError("Link or Title missing!")
      return
    }
    else {
      setIsLoading(true);
      setisError('')
      setnotSubmitted(false);

      chrome.runtime.sendMessage({ action: "submit", data: formData, cookies: localStorage.getItem("access_token") }, (response) => {
        console.log(response);
        if (response) {
          setIsLoading(false);
          console.log("API Response:", response);
          setbgClr("--primary-green")
          setTitle("Successful !")
          setSubTxt("Your entry has been saved.")
          setLftBtnTxt("BACK")
          setBtnTxtClr("--primary-green")
          setRtBtnTxt("HOME")
          setShowOnlyOne(true)
        } else {
          setIsLoading(false);
          console.error("API Error:", response);
          setbgClr("--primary-orange")
          setTitle("Error !")
          setSubTxt("Something went wrong")
          setLftBtnTxt("BACK")
          setBtnTxtClr("--primary-orange")
          setRtBtnTxt("RETRY :)")
        }
      });



    }


  }

  const handleClear = () => {
    setFormData({
      link: '',
      title: '',
      note: ''
    });
    setbgClr("--primary-yellow")
    setTitle("Good Morning")
    setSubTxt("Welcome User...")
    setLftBtnTxt("CLEAR")
    setBtnTxtClr("--primary-yellow")
    setRtBtnTxt("SUBMIT")
    setnotSubmitted(true);
    setisError('')
    setShowOnlyOne(false)
  };

  return (
    <>

      <div className={`max-w-md bg-[var(${bgClr})] rounded-lg px-9 w-[420px] h-[500px] flex flex-col justify-between py-14
      border border-black`}>
       
        
        <div className="flex justify-between items-center mb-6 gap-2 ">
          <div className='flex flex-col justify-end pl-1 -gap-2'>
            <h1 className="text-3xl nanum-myeongjo-regular pr-2">{title}</h1>
            <p className="text-xs text-black font-SansText400 mt-[-5px]  pl-1">{subTxt}</p>
          </div>
          {notSubmitted ? <div className="relative flex items-center cursor-pointer  border-black border-[1.5px] rounded-full bg-transparent px-2 py-2" onClick={
            () => {
              Navigate("/search")
            }
          }>
            <input
              type="text"
              placeholder="SEARCH"
              className="bg-transparent focus:outline-none text-black placeholder:text-[11px] placeholder:text-black w-[70px]
              font-SansText400 pb-[2px] placeholder:tracking-widest cursor-pointer"
            />
            <BiSearchAlt2 size={24} />
          </div> : null}
        </div>
        
        
        <InputForm
          handleChange={handleChange}
          handleClear={handleClear}
          handleSubmit={handleResponse}
          formData={formData}
          BtnTxtClr={BtnTxtClr}
          leftBtnTxt={leftBtnTxt}
          rightBtnTxt={rightBtnTxt}
          Error={isError}
          showOnlyOne={showOnlyOne}
          isLoading={isLoading}
        />
      </div>
    </>
  );
}