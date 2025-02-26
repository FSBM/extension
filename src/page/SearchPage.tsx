import { BiSearchAlt2 } from "react-icons/bi"
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import ColorChangingSpinner from "../components/Loader";


interface Props {
    Quote: string;
}



export default function SearchPage({ Quote }: Props) {
    const Navigate = useNavigate();
    const [query, setQuery] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
      }, []);

    const handleSearch = () => {
        setIsLoading(true);
        chrome.runtime.sendMessage({ action: "search", query: query, cookies: localStorage.getItem("access_token") },
            (response) => {
                console.log(response);
                if (response) {
                    console.log("API Response of query:", JSON.stringify(response.data));
                    if(response.data.detail==="Search failed: No documents found matching query"){
                        console.log("No documents found matching query");
                        Navigate("/response", { state: { data: [] } });
                        return;
                        setIsLoading(false);
                    }else{
                    const responseArray = response.data.map((item: any) => ({
                        title: item.metadata.title,
                        url: item.metadata.source_url,
                        content: item.metadata.note,
                        date: item.metadata.date
                    }));
                    console.log("Response Array this given as: ", responseArray);
                    Navigate("/response", { state: { data: responseArray } });
                }

                    
                } else {
                    setIsLoading(false);
                    console.error("API Error:", response.error);
                }
            }
        )

    };




    console.log(Quote);
    return (
        <>
            <div className="max-w-md bg-white rounded-lg px-10 w-[420px] h-[500px] flex flex-col  justify-between py-10 border border-black">
                <div className="relative flex border-black border-[1.5px] rounded-full px-2 py-2 justify-between min-h-[43px]
                font-SansText400">
                    <input
                        ref = {inputRef}
                        type="text"
                        placeholder="SEARCH"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSearch();
                            }
                        }}
                        className="bg-transparent focus:outline-none text-black placeholder:text-[11px] placeholder:text-black w-[80%]
                            font-SansText400 pb-[2px] placeholder:tracking-widest
                            placeholdder-opacity-25"
                    />

                    {isLoading ? (
                        <ColorChangingSpinner />
                    
                    ) :
                    <BiSearchAlt2 size={24} opacity={(query.length > 0) ? 1 : 0.4} onClick={(query.length > 0) ? handleSearch : undefined } />}
                </div>
                <div className="nanum-myeongjo-regular text-4xl text-center">
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5 }}
                        className="text-center"
                    >"{Quote}"</motion.h1>
                </div>
                <div className="w-[95%] mx-auto flex justify-between items-center">
                    <Button text="HOME" handle={() => Navigate("/submit")} textColor="--primary-white" />
                    <Button text="SHOW ALL" handle={()=> Navigate("/response")} textColor="--primary-white" />  
                </div>
            </div>
        </>
    );
}