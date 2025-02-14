import Button from "../components/Button";
import Logo from '../assets/Logo.svg'
import '../index.css'
import { useNavigate } from 'react-router-dom';


const Intro = () => {
    const Navigate = useNavigate();
  return (
    <div className="h-[500px] w-[420px] relative border border-black">
      <div className="absolute inset-0 flex">
        <div className="w-1/4 bg-[var(--primary-orange)]" />
        <div className="w-1/4 bg-[var(--primary-green)]" />
        <div className="w-1/4 bg-[var(--primary-yellow)]" />
        <div className="w-1/4 bg-[var(--primary-blue)]" />
      </div>

      {/* Content */}
      <div className="relative h-[500px] w-[450px]  flex my-auto justify-center">
        <div className="flex flex-col items-center text-center space-y-8 p-8">

          <div className="flex items-center mb-16">
           <img src={Logo} alt="" className="pl-6"/>
          </div>
          
          <p className="text-4xl nyr max-w-md">
            "Every bookmark is a doorway to a new journey"
          </p>
          
          {/* Button */}
          <Button handle={()=>{console.log("DONe!"), Navigate("/")}} text="GET STARTED" textColor="--primary-white"/>
        </div>
      </div>
    </div>
  );
};

export default Intro;