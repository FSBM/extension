import { RiArrowRightUpLine } from "react-icons/ri";

interface CardProps {
    title: string;
    description: string;
    bgColor: string;
    onClick: () => void;
    isSelected: boolean;
}



export default function Cards({ title, description, bgColor,onClick,isSelected }: CardProps) {
    return (
        <>
          <div
            className={`${bgColor} rounded-lg p-4 mb-4 relative cursor-pointer flex flex-col justify-between
            ${
              isSelected
                ? 'scale-100 h-[415px] w-[100%]  overflow-hidden'
                : 'scale-100 h-[130px] hover:scale-[1.02]'
            } transition-all duration-500 ease-in-out will-change-transform`}
            onClick={onClick}
            style={{ backgroundColor: `var(${bgColor})` }}
          >
            <div className="flex justify-between items-start ">
              <div className={`pr-8 w-[90%] ${isSelected ? 'p-16 pt-28' : ''}`}>
                {isSelected ? (
                  <p className="nyr text-[16px]">30 January 2025</p>
                ) : null}
                <h2 className="text-[22px] nyr mb-2 leading-tight">
                  {isSelected
                    ? title
                    : title.split(' ').splice(0, 3).join(' ') + '..'}
                </h2>
                <p className="font-SansMono400 text-sm leading-snug opacity-90">
                  {description}
                </p>
              </div>
              <div className="w-[10%] flex justify-end ">
                <RiArrowRightUpLine size={24} className="cursor-pointer"/>
              </div>
            </div>
          </div>
        </>
      );
      
      
}