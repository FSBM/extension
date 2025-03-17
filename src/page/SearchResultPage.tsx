import React, { useEffect, useRef, useState } from 'react';
import Cards from '../components/Cards';
import Button from '../components/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import '../index.css';
import LoaderPillars from '../components/LoaderPillars';

interface ProcessedResult {
  title: string;
  url: string;
  content: string;
  date: string;
  ID: string;
}

const SearchResponse: React.FC = () => {
  const location = useLocation();
  const responseData = location.state?.data as ProcessedResult[] || [];
  const colors = [
    'bg-custom-orange',
    'bg-custom-light-violet',
    'bg-custom-lime',
    'bg-custom-hot-pink',
    
    'bg-custom-electric-blue',
    'bg-custom-marigold',
    'bg-custom-bright-purple',
    'bg-custom-neon-green',
    
    'bg-custom-bright-orange',
    'bg-custom-vivid-blue',
    'bg-custom-lime-yellow',
    'bg-custom-violet',
    
    'bg-custom-chartreuse',
    'bg-custom-light-pink',
    'bg-custom-electric-lime',
    'bg-custom-blue',
    
    'bg-custom-brownish-orange',
    'bg-custom-green',
    'bg-custom-bright-yellow',
    'bg-custom-yellow'
  ];

  const currentIndex = useRef(0);
  const getNextColor = () => {
    const color = colors[currentIndex.current];
    currentIndex.current = (currentIndex.current + 1) % colors.length;
    return color;
  };

  interface CardType {
    key: number;
    title: string;
    fullDescription: string;
    bgColor: string;
    RedirectUrl: string;
    date: string;
    ID: string;
  }
  
  const [Card, setCards] = useState<CardType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [DeleteClicked, setDeleteClicked] = useState<boolean>(false);
  const [confirmDelete , setConfirmDelete] = useState<boolean>(false);
  const [DeleteSuccess, setDeleteSuccess] = useState<boolean>(true);
  const [DeletedBookmarks, setDeletedBookmarks] = useState(new Set());
  const allBookmarks: string[] = [];
  useEffect(() => {
    if(localStorage.getItem("deletedBookmarks")){
      setDeletedBookmarks(new Set(JSON.parse(localStorage.getItem("deletedBookmarks") || "[]")));
    }
  },[]);

  useEffect(() => {
    const getAllBookmarks = () => {
      if (!chrome.bookmarks) {
        console.error("chrome.bookmarks API is not available.");
        return;
      }

      // chrome.bookmarks.getTree((bookmarkTreeNodes) => {
      //     const allBookmarks: Array<{ url: string, title: string }> = [];

      //     const extractBookmarks = (nodes: chrome.bookmarks.BookmarkTreeNode[]) => {
      //         for (const node of nodes) {
      //             if (node.url) {
      //                 const url = node.url;
      //                 allBookmarks.push({
      //                     url: node.url,
      //                     title: node.title || url.split("/").pop() || url 
      //                 });
      //             }
      //             if (node.children) extractBookmarks(node.children);
      //         }
      //     };

      //     extractBookmarks(bookmarkTreeNodes);

      //     const newCards = allBookmarks.map((item, index) => ({
      //         key: Card.length + index + 1,
      //         title: item.title, 
      //         fullDescription: item.url,
      //         bgColor: randomColor()
      //     }));

      //     setCards(prev => [...prev, ...newCards]);


      // });

      if (responseData) {
        if(responseData.length===0){
          return;
        }
        const newCards = responseData.map((item: any, index: number) => ({
          key: Card.length + index + 1,
          title: item.title,
          fullDescription: (item.content===""?"No Description":item.content),
          bgColor: getNextColor(),
          RedirectUrl: item.url,
          date: item.date ? 
            new Date(item.date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })
          
          : "No Date",
          ID: item.ID


        }

      ));
        setCards(newCards);
      }

    };

    getAllBookmarks();
  }, allBookmarks);

  const handleDelete = () => {
    setIsLoading(true);
    if (selectedIndex !== null) {
    } else {
    }
    chrome.runtime.sendMessage({ action: "delete", query:(selectedIndex !== null ? Card[selectedIndex].ID : ""), cookies: localStorage.getItem("access_token") },
    
    (response) => {
        if (response) {
            if(response.detail==="Failed to delete document"){
              setDeleteSuccess(false);
              setIsLoading(false);
            }else{
              setCards(prevCards => prevCards.filter((_, index) => index !== selectedIndex));

              if (selectedIndex !== null && Card[selectedIndex]) {
                const idToDelete = Card[selectedIndex].ID;
                setDeletedBookmarks(prevSet => {
                  const newSet = new Set(prevSet);
                  newSet.add(idToDelete);
                  localStorage.setItem("deletedBookmarks", JSON.stringify(Array.from(newSet)));
                  return newSet;
                });
              }

             
              if (selectedIndex !== null) {
                console.log("Now deleted the bookmark :", Card[selectedIndex]);
              }
              console.log("Deleted Bookmarks: ", DeletedBookmarks);
              setDeleteSuccess(true);
              setIsLoading(false);
            }
        } else {
          console.error("API Error:", response.error);
          setDeleteSuccess(false);
              setIsLoading(false);
        } 
  })
  }



  const Navigate = useNavigate();

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);



  return (
    <div

    style={{backgroundColor: responseData.length === 0 ? 'var(--primary-red)' : 'var(--primary-white)'}}

    className={`relative max-w-md  rounded-lg w-[420px] h-[500px] flex flex-col justify-center border border-black py-0 overflow-hidden`}>
      {responseData.length === 0 || Card.filter(card => !DeletedBookmarks.has(card.ID)).length === 0 ? (
        <p className='text-center text-2xl black mb-3 pb-7 nyr-semibold'>Oops ! No Bookmarks found</p>
      ):(<div className={` 
        
        ${selectedIndex === null
          ? 'overflow-y-scroll py-3 pb-24 px-3 '
          : 'overflow-y-scroll py-0 px-0 cursor-default'}
        [&::-webkit-scrollbar]:hidden w-[100%] h-[100%]`}>
        {selectedIndex === null
          ? Card.map((card, index) => {
            const isDeleted = DeletedBookmarks.has(card.ID);
            
            return isDeleted ? 
              null : 
              <Cards
                key={index}
                title={card.title}
                description={(card.fullDescription.length > 10) ? 
                  card.fullDescription.slice(0, 66) + "..." : 
                  card.fullDescription}
                bgColor={card.bgColor}
                onClick={() => setSelectedIndex(index)}
                isSelected={false}
                RedirectUrl={card.RedirectUrl}
                date={card.date}
                confirmDelete={confirmDelete}
                setDeleteClicked={setDeleteClicked}

              />
          })
          : (
            
            
            
            DeleteClicked?
              <p className='nyr flex justify-center items-center bg-[var(--primary-red)] text-2xl text-center text-black
              w-[100%] h-[90%]'>Are you sure you want to delete this bookmark ?</p>
            :
            confirmDelete?
            isLoading?
              <div className='flex justify-center items-center w-full h-[90%] bg-[var(--primary-red)]'>
                <LoaderPillars />
              </div>
            :
            DeleteSuccess?
            <p className='nyr flex justify-center items-center bg-[var(--primary-green)] text-2xl text-center text-black
            w-[100%] h-[90%]'>Bookmark Deleted Successfully !</p>:
            <p className='nyr flex justify-center items-center bg-[var(--primary-red)] text-2xl text-center text-black  
            w-[100%] h-[90%]'>Failed to delete Bookmark !</p>
            :
              
              <Cards
            title={Card[selectedIndex].title}
            description={Card[selectedIndex].fullDescription}
            bgColor={Card[selectedIndex].bgColor}
            onClick={() => null}
            isSelected={true}
            RedirectUrl={Card[selectedIndex].RedirectUrl}
            date={Card[selectedIndex].date}
            confirmDelete={confirmDelete}
            setDeleteClicked={setDeleteClicked}
          />
          
          
          
          )}
      </div>)}

      <div className="absolute bottom-0 rounded-b-lg w-full min-h-[90px] flex items-center justify-between px-10 bg-white border-t border-black">
        <Button
          text={DeleteClicked?"NO":'BACK'}
          handle={() => {
            if(DeleteClicked){
              setDeleteClicked(false);
            }else{

              if (selectedIndex === null) Navigate("/search");
              else setSelectedIndex(null);
              setConfirmDelete(false);
              setDeleteSuccess(false);
            }
          }}
          textColor='--primary-white'
        />
        <Button
          text={DeleteClicked?"YES":'HOME'}
          handle={() => {
            if (DeleteClicked) {
              handleDelete();
              setDeleteClicked(false);
              setConfirmDelete(true);
            } else {
              Navigate("/");
            }
          }}
          textColor='--primary-white'
        />
      </div>
    </div>
  );
};

export default SearchResponse;