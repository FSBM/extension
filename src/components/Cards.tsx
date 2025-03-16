import { RiArrowRightUpLine } from "react-icons/ri";
import { MdDelete } from "react-icons/md";

interface CardProps {
    title: string;
    description: string;
    bgColor: string;
    onClick: () => void;
    isSelected: boolean;
    RedirectUrl?:string;
    date:string
    confirmDelete:boolean;
    setDeleteClicked:(vale: boolean) => void;
}



export default function Cards({ title, description, bgColor,onClick,isSelected,RedirectUrl,date,confirmDelete,setDeleteClicked }: CardProps) {
    return (
        <>
          <div
            className={`${bgColor} rounded-lg p-4 mb-4 relative cursor-pointer flex flex-col justify-between
            ${
              isSelected
                ? `scale-100 ${(description.length>316?'h-full':'h-[415px]')} w-[100%]  overflow-x-hidden`
                : 'scale-100 h-[130px] hover:scale-[1.02]'
            } transition-all duration-500 ease-in-out will-change-transform`}
            onClick={onClick}
            style={{ backgroundColor: `var(${bgColor})` }}
          >
            <div className="flex justify-between items-start ">
           {isSelected ? 
           
           <button 
                   disabled={confirmDelete}
                   className='p-0'>
                     <MdDelete
                     onClick={()=>setDeleteClicked(true)}
                     size={24} className="self-start"/>
              </button>

           
           :null}
              <div className={`pr-8 w-[90%] ${isSelected ? 'p-14 pt-28' : ''}`}>
                {isSelected ? (
                  <p className="nyr text-[16px]">{date}</p>
                ) : null}
                <h2 className="text-[22px] nyr mb-[0.8rem] leading-tight">
                  {isSelected
                    ? title
                    : title.split(' ').splice(0, 3).join(' ') + '..'}
                </h2>
                <p className="font-SansMono400 text-sm pb-[45px] max-w-[290px] leading-snug opacity-9 ">
                  {description}
                </p>
              </div>
             <div className="w-[10%] flex flex-col justify-ece ">
             <div className="w-[100%] flex justify-end ">
                <RiArrowRightUpLine size={28} className="cursor-pointer" onClick={()=>{isSelected?window.open(RedirectUrl):null}}/>
              </div>
              <div className="w-[100%] flex justify-end ">
              {isSelected ? (
                    <p className="font-SansMono400 text-[10px] mt-1">{RedirectUrl?.split("//")[1].slice(0, 10)+"..."}</p>
                  ) : (
                    null
                  )
                  }
              </div>
             </div>
            </div>
          </div>
        </>
      );
      
      
}