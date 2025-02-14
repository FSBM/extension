
import Button from "./Button"
interface Props{
   handleSubmit:any,
   handleClear:any,
   formData:FormData,
   handleChange:any 
   BtnTxtClr:string
   leftBtnTxt:string,
   rightBtnTxt:string
   showOnlyOne ?: boolean;
   Error?:string;
}
interface FormData {
    link: string;
    title: string;
    note: string;
}

export default function InputForm({handleSubmit,handleChange,handleClear,formData,BtnTxtClr,leftBtnTxt,rightBtnTxt,showOnlyOne,Error}:Props){



    return(
        <form onSubmit={handleSubmit} className="space-y-5 mt-3">
                      <div className="space-y-1">
                        <label className="block text-sm font-SansMono400">Link:</label>
                        <input
                          type="text"
                          name="link"
                          autoComplete="off"
                          value={formData.link}
                          onChange={handleChange}
                          className="w-full border-b border-black bg-transparent focus:outline-none  pb-1 placeholder-[#151515]
                          placeholder-opacity-25"
                          placeholder="Your link here"
                        />
                      </div>
            
                      <div className="space-y-1">
                        <label className="block text-sm font-SansMono400">Title:</label>
                        <input
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          className="w-full border-b border-black bg-transparent focus:outline-none pb-1 placeholder-[#151515]
                          placeholder-opacity-25"
                          placeholder="Your title here"
                        />
                      </div>
            
                      <div className="space-y-1">
                        <label className="block text-sm font-SansMono400">Note:</label>
                        <input
                          type="text"
                          name="note"
                          value={formData.note}
                          onChange={handleChange}
                          className="w-full border-b border-black bg-transparent focus:outline-none placeholder-[#151515] pb-1
                          placeholder-opacity-25"
                          placeholder="Your note here"
                        />
                      </div>
                     {Error?<div className="pb-0 mb-0 space-y-0">
                        <p className="text-red-500 font-SansMono400 text-sm text-center pb-0">{Error}</p>
                      </div>:null}
            
                      <div className={`flex justify-between ${Error?"pt-0":"pt-10"}`}>
                      <Button handle={handleClear} text={leftBtnTxt} textColor={BtnTxtClr} />
                      {showOnlyOne?null:<Button handle={handleSubmit} text={rightBtnTxt} textColor={BtnTxtClr} />}
                      </div>
                    </form>
    )
}