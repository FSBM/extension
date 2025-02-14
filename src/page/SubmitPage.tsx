import { useNavigate } from "react-router-dom";
import { BiSearchAlt2 } from "react-icons/bi";
import InputForm from "../components/InputForm";
import { useState } from "react";


interface FormData {
  link: string;
  title: string;
  note: string;
}

export default function SubmitPage() {

    const Navigate = useNavigate();

    





  const [formData, setFormData] = useState<FormData>({
    link: '',
    title: '',
    note: ''
  });

  const getLink = ()=>{
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      console.log(tabs[0].url);
      if(!tabs[0].url){
        setFormData({...formData,link:""})
      } else setFormData({...formData, link: tabs[0].url || ''})
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    Navigate("/success")
  };

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
      <div className="max-w-md bg-yellow-400 rounded-lg px-9 w-[420px] h-[500px] flex flex-col justify-between py-14
      border border-black">
        <div className="flex justify-between items-center mb-6 gap-2 ">
          <div className='flex flex-col justify-end pl-1 -gap-2'>
            <h1 className="text-3xl nanum-myeongjo-regular pr-2">Good Morning</h1>
            <p className="text-sm text-black font-SansText400 mt-[-5px] ml-1"> Welcome abroad</p>
          </div>
          <div className="relative flex items-center cursor-pointer  border-black border-[1.5px] rounded-full bg-yellow-400 px-2 py-2" onClick={
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
          </div>
        </div>

        <InputForm 
          handleChange={handleChange}
          handleClear={handleClear} 
          handleSubmit={handleSubmit} 
          BtnTxtClr="--primary-yellow"
          formData={formData} 
          leftBtnTxt="CLEAR"
          rightBtnTxt="SUBMIT"
        />
      </div>
    </>
  );
}