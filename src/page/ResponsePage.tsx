import { useNavigate } from "react-router-dom";
import InputForm from "../components/InputForm";
import {  useEffect, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import '../index.css';
interface FormData {
  link: string;
  title: string;
  note: string;
}

export default function ResponsePage() {

  const [title, setTitle] = useState("Good Morning");
  const [subTxt, setSubTxt] = useState("User");
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

  function isValidURL(url:string) {
   const simplePattern = /^(https?:\/\/)?[\w.-]+\.[a-z]{2,6}$/i;
    return simplePattern.test(url);
  }


  useEffect(() => {
    if(new Date().getHours()<5){
      setTitle("Go & Sleep,");
    }
    else if( new Date().getHours() < 12){
      setTitle("Good Morning,")
    }else if(new Date().getHours() < 17){
      setTitle("Good Afternoon,")
    }else if( new Date().getHours() < 20){
      setTitle("Good Evening,")
    }else{
      setTitle("Good Night,")
    } 
  }, []);

  useEffect(() => {
       chrome.cookies.get({url:'https://hippocampus-backend.onrender.com',name:'user_name'},(cookie)=>{
        if(cookie){
          setSubTxt(cookie.value.replace(/"/g, "").split(" ")[0]);
      }
    });
  }, []);




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


    if (formData.link === "" || isValidURL(formData.link) || formData.title === "") {
      setnotSubmitted(true);
      if(isValidURL(formData.link)){
        setisError("Enter a valid link!")
      }
      setisError("Link or Title missing!")
      return
    }
    else {
      setIsLoading(true);
      setisError('')
      setnotSubmitted(false);

      chrome.runtime.sendMessage({ action: "submit", data: formData, cookies: localStorage.getItem("access_token") }, (response) => {
        if (response) {
          setIsLoading(false);
          setbgClr("--primary-green")
          setTitle("Successful !")
          setSubTxt("Your entry has been saved.")
          setLftBtnTxt("CLOSE")
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
    if (showOnlyOne && leftBtnTxt == "CLOSE") {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tabId = tabs[0].id;
        if(tabId){
          chrome.tabs.sendMessage(tabId, { 
            action: "closeExtension",
            target: "content"
          }, () => {
          });
        }
      });
    }
    else{
      setFormData({
        link: '',
        title: '',
        note: ''
      });
      setbgClr("--primary-yellow")
      setLftBtnTxt("CLEAR")
      setBtnTxtClr("--primary-yellow")
      setRtBtnTxt("SUBMIT")
      setnotSubmitted(true);
      setisError('')
      setShowOnlyOne(false);
    }

    
  };

  return (
    <>

      <div className={`max-w-md bg-[var(${bgClr})] rounded-lg px-9 w-[420px] h-[500px] flex flex-col justify-between py-14
      border border-black`}>


        <div className="flex justify-between items-center mb-6 gap-2 ">
          <div className='flex flex-col justify-end pl-1 -gap-2'>
            <h1 className="text-[18px] font-NanumMyeongjo pr-2">{title}</h1>
            <p className={`${(subTxt==="Your entry has been saved." || subTxt==="Something went wrong")?'text-[24px]':'text-[30px]'} text-black font-NanumMyeongjo mt-[-8px]`}>{subTxt}</p>
          </div>
          {notSubmitted ?
            <div
              className="group relative flex items-center cursor-pointer box-border bg-transparent 
             px-2 py-2 rounded-full "
              onClick={() => Navigate("/search")}
            >
              <input
                type="text"
                placeholder="SEARCH"
                className="bg-transparent focus:outline-none text-black placeholder:text-[11px] 
              placeholder:text-black w-[70px] font-SansText400 pb-[2px] 
              placeholder:tracking-widest cursor-pointer relative z-10"
              />
              <BiSearchAlt2 size={24} className="relative z-10" />

              {/* Animated border element */}
              <div className="absolute inset-0 before:absolute before:inset-0 before:border-[1.5px] 
                before:border-black before:rounded-full before:scale-100 
                before:transition-transform before:duration-300 before:ease-in-out 
                group-hover:before:scale-105 group-hover:before:border-2">
              </div>
            </div>

            : null}
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