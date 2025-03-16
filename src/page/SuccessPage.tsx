import { useNavigate } from "react-router-dom";
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
  };


  return (
    <>
      <div className="max-w-md bg-[var(--primary-green)] rounded-lg px-10 w-[420px] h-[500px] flex flex-col justify-center border border-black">
        <div className="flex justify-between items-center mb-8 gap-5 ">
          <div className='flex flex-col justify-end pl-1 -gap-2'>
            <h1 className="text-3xl font-NanumMyeongjo  pr-2">Successful !</h1>
            <p className="text-sm text-black font-SansText400 mt-[-5px]  pr-4"> Your entry has been saved</p>
          </div>
          {/* <div className="relative flex items-center cursor-pointer  border-black border-[1.5px] rounded-full bg-transparent px-2 py-2" onClick={
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
          </div> */}
        </div>

        <InputForm 
          handleChange={handleChange}
          handleClear={()=>Navigate("/")} 
          handleSubmit={handleSubmit} 
          formData={formData} 
          BtnTxtClr="--primary-green"
          leftBtnTxt="BACK"
          rightBtnTxt="SAVED !"
        />
      </div>
    </>
  );
}