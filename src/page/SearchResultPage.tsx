import React, { useEffect, useRef, useState } from 'react';
import Cards from '../components/Cards';
import Button from '../components/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import '../index.css';

interface ProcessedResult {
  title: string;
  url: string;
  content: string;
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
  }
  
  const [Card, setCards] = useState<CardType[]>([]);
  const allBookmarks: string[] = [];

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
          console.log("No documents found matching query");
          return;
        }
        console.log("this is the response data after searching :" + responseData);
        const newCards = responseData.map((item: any, index: number) => ({
          key: Card.length + index + 1,
          title: item.title,
          fullDescription: (item.content===""?"No Description":item.content),
          bgColor: getNextColor(),
          RedirectUrl: item.url
        }));
        setCards(newCards);
      }

    };

    getAllBookmarks();
  }, allBookmarks);


  const Navigate = useNavigate();

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);



  return (
    <div

    style={{backgroundColor: responseData.length === 0 ? 'var(--primary-red)' : 'var(--primary-white)'}}

    className={`relative max-w-md  rounded-lg w-[420px] h-[500px] flex flex-col justify-center border border-black py-0 overflow-hidden`}>
      {responseData.length === 0 ? (
        <p className='text-center text-3xl black mb-3 pb-7 nyr-semibold'>Oops ! No results found</p>
      ):(<div className={` 
        
        ${selectedIndex === null
          ? 'overflow-y-scroll py-3 pb-24 px-3 '
          : 'overflow-y-scroll py-0 px-0 cursor-default'}
        [&::-webkit-scrollbar]:hidden w-[100%] h-[100%]`}>
        {selectedIndex === null
          ? Card.map((card, index) => (
            <Cards
              key={index}
              title={card.title}
              description={card.fullDescription.slice(0, 15) + "..."}
              bgColor={card.bgColor}
              onClick={() => setSelectedIndex(index)}
              isSelected={false}
              RedirectUrl={card.RedirectUrl}
            />
          ))
          : (
            <Cards
              title={Card[selectedIndex].title}
              description={Card[selectedIndex].fullDescription}
              bgColor={Card[selectedIndex].bgColor}
              onClick={() => null}
              isSelected={true}
              RedirectUrl={Card[selectedIndex].RedirectUrl}
            />
          )}
      </div>)}

      <div className="absolute bottom-0 rounded-b-lg w-full min-h-[90px] flex items-center justify-between px-10 bg-white border-t border-black">
        <Button
          text='BACK'
          handle={() => {
            if (selectedIndex === null) Navigate("/search");
            else setSelectedIndex(null);
          }}
          textColor='--primary-white'
        />
        <Button
          text='HOME'
          handle={() => Navigate("/")}
          textColor='--primary-white'
        />
      </div>
    </div>
  );
};

export default SearchResponse;