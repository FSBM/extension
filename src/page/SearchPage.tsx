import { BiSearchAlt2 } from "react-icons/bi"
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function SearchPage() {
    const Navigate = useNavigate();
    return (
        <>
            <div className="max-w-md bg-white rounded-lg px-10 w-[420px] h-[500px] flex flex-col  justify-between py-10 border border-black">
                <div className="relative flex border-black border-[1.5px] rounded-full px-4 py-2 justify-between
                font-SansText400">
                    <input
                        type="text"
                        placeholder="SEARCH"
                        onKeyDown={(e)=>{
                            if(e.key === "Enter"){
                                Navigate("/response")
                            }
                        }}
                        className="bg-transparent focus:outline-none text-black placeholder:text-[11px] placeholder:text-black w-[80%]
                            font-SansText400 pb-[2px] placeholder:tracking-widest
                            placeholdder-opacity-25"
                    />
                    <BiSearchAlt2 size={24} />
                </div>
                <div className="nanum-myeongjo-regular text-4xl text-center">
                    <h1>“Every bookmark is a doorway to a new journey”</h1>
                </div>
                <div className="w-[100px] mx-auto">
                    <Button text="HOME" handle={() => { console.log("search"), Navigate("/")  }} textColor="--primary-white"/>
                </div>
            </div>
        </>
    );
}