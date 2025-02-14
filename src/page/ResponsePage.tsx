import { useNavigate } from "react-router-dom";
import InputForm from "../components/InputForm";
import { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import '../index.css'

interface FormData {
  link: string;
  title: string;
  note: string;
}

export default function ResponsePage() {
    
    const [title,setTitle] = useState("Title");
    const [subTxt,setSubTxt] = useState("Subtitle");
    const[leftBtnTxt,setLftBtnTxt] = useState("CLEAR");
    const [BtnTxtClr,setBtnTxtClr] = useState("--primary-yellow");
    const[rightBtnTxt,setRtBtnTxt] = useState("SUBMIT");
    const [notSubmitted, setnotSubmitted] = useState(true);
    const [bgClr, setbgClr] = useState("--primary-yellow");
    const [isError,setisError] = useState('');

    const Navigate = useNavigate();



  const [formData, setFormData] = useState<FormData>({
    link: '',
    title: '',
    note: ''
  });
  const getLink = ()=>{
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      console.log(tabs[0].url);
      setFormData({...formData, link: tabs[0].url || ''})
    })
  }
  getLink();



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const handleResponse = (e: React.FormEvent) => {
      e.preventDefault();

      if(formData.link=="" || formData.title==""){
        setnotSubmitted(true);
        setisError("Please fill the title and link feild ")
        return
      }
      else{}
      setisError('')

      let response = Math.random() > 0.5?true:false;

      if(response){
        setbgClr("--primary-green")
        setTitle("Success")
        setSubTxt("Your entry has been saved.")
        setLftBtnTxt("BACK")
        setBtnTxtClr("--primary-green")
        setRtBtnTxt("HOME")
      }else{
        setbgClr("--primary-orange")
        setTitle("Error")
        setSubTxt("Something went wrong")
        setLftBtnTxt("BACK")
        setBtnTxtClr("--primary-orange")
        setRtBtnTxt("RETRY :)")
      }


  }

  const handleClear = () => {
    setFormData({
      link: '',
      title: '',
      note: ''
    });
    Navigate("/intro")
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
          {notSubmitted?<div className="relative flex items-center cursor-pointer  border-black border-[1.5px] rounded-full bg-transparent px-2 py-2" onClick={
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
          </div>:null}
        </div>

        <InputForm 
          handleChange={handleChange}
          handleClear={handleClear} 
          handleSubmit={ handleResponse} 
          formData={formData} 
          BtnTxtClr={BtnTxtClr}
          leftBtnTxt={leftBtnTxt}
          rightBtnTxt={rightBtnTxt}
          Error={isError}
        />
      </div>
    </>
  );
}