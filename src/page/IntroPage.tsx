import Button from "../components/Button";
import Logo from '../assets/Logo.svg'
import '../index.css'
import { useNavigate } from 'react-router-dom';


const Intro = () => {
    const Navigate = useNavigate();
    const handleAuth = async () => {
      chrome.cookies.get({
          url: 'https://extension-auth.vercel.app',
          name: 'access_token',
      }, function(cookie) {
          if (cookie) {
              localStorage.setItem('access_token', cookie.value);
              Navigate("/submit");
          } else {
              window.open("https://extension-auth.vercel.app");
          }
      });
  }

  return (
    <div className="h-[500px] w-[100%] relative border border-black rounded-lg overflow-hidden">
      
      <div className="absolute inset-0 flex">
        <div className="w-1/4 bg-[var(--primary-orange)]" />
        <div className="w-1/4 bg-[var(--primary-green)]" />
        <div className="w-1/4 bg-[var(--primary-yellow)]" />
        <div className="w-1/4 bg-[var(--primary-blue)]" />
      </div>

      {/* Content */}
      <div className="relative h-[500px] w-[419px]  flex my-auto justify-center rounded-lg">
        <div className="flex flex-col items-center text-center space-y-8 p-8">

          <div className="flex items-center mb-16">
           <img src={Logo} alt="" className="pl-6"/>
          </div>
          
          <p className="text-4xl nyr max-w-md">
            "Every bookmark is a doorway to a new journey"
          </p>
          
          {/* Button */}
          <Button handle={handleAuth} text="GET STARTED" textColor="--primary-white"/>
        </div>
      </div>
    </div>
  );
};


export default Intro;