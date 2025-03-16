
import Button from "./Button"
import LoaderPillars from "./LoaderPillars"


interface Props {
  handleSubmit: any,
  handleClear: any,
  formData: FormData,
  handleChange: any
  BtnTxtClr: string
  leftBtnTxt: string,
  rightBtnTxt: string
  showOnlyOne?: boolean;
  Error?: string;
  isLoading?: boolean;
}
interface FormData {
  link: string;
  title: string;
  note: string;
}

export default function InputForm({ handleSubmit, handleChange, handleClear, formData, BtnTxtClr, leftBtnTxt, rightBtnTxt, showOnlyOne, Error, isLoading }: Props) {





  return (
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
          disabled={isLoading}
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
          disabled={isLoading}
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-SansMono400">Note:</label>
        <textarea
          name="note"
          rows={1.5}
          value={formData.note}
          onChange={handleChange}
          className="w-full border-b border-black bg-transparent focus:outline-none 
               placeholder-[#151515] placeholder-opacity-25
               py-3"
          placeholder="Enter a descriptive note for better search results"
          disabled={isLoading}
        />
      </div>
      {Error ? <div className="pb-0 mb-0 space-y-0">
        <p className="text-red-500 font-SansMono400 text-sm text-center pb-0">{Error}</p>
      </div> : null}

      <div className={`flex ${showOnlyOne ? 'justify-center' : 'justify-between'} mx-auto ${Error ? "pt-0" : "pt-10"}`}>
        <Button handle={handleClear} text={leftBtnTxt} textColor={BtnTxtClr} iSdisabled={isLoading ?? false} />
        {isLoading ? <LoaderPillars /> : null}
        {showOnlyOne ? null : <Button handle={handleSubmit} text={rightBtnTxt} textColor={BtnTxtClr} iSdisabled={isLoading ?? false} />}
      </div>
    </form>
  )
}