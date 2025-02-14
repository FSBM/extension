import React, { useEffect, useState } from 'react';
import Cards from '../components/Cards';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const SearchResponse: React.FC = () => {
    const colors = [
        '--primary-blue', '--primary-green', '--primary-yellow', '--primary-orange',
        '--soft-blue', '--deep-blue', '--light-green', '--dark-green', '--warm-yellow',
        '--light-orange', '--dark-orange', '--soft-pink', '--bright-purple', '--muted-teal',
        '--light-gray', '--dark-gray', '--rich-burgundy', '--earthy-brown', '--pastel-purple',
        '--peach-pink', '--soft-lavender', '--ocean-blue'
      ];
    
      let randomColor = () => colors[Math.floor(Math.random() * colors.length)];

    const [Card,setCards] = useState([
        {
          key:1,  
          title: "Constructive and destructive",
          fullDescription: "Detailed explanation about wave types, bla bla bla",
          bgColor: "bg-[#ffc1c1]"
        },
        {
          key:2,
          title: "Tailwind and react",
          fullDescription: "Detailed description about React and react",
          bgColor: "bg-[#89cff0]"
        },
        {
          key:3,  
          title: "Constructive and destructive waves",
          fullDescription: "Detailed explanation about wave types",
          bgColor: "bg-[#bff566]"
        },
      ]);
      const allBookmarks: string[] = [];

      useEffect(() => {
        const getAllBookmarks = () => {
            if (!chrome.bookmarks) {
                console.error("chrome.bookmarks API is not available.");
                return;
            }

            chrome.bookmarks.getTree((bookmarkTreeNodes) => {
                const allBookmarks: string[] = [];
                
                const extractBookmarks = (nodes: chrome.bookmarks.BookmarkTreeNode[]) => {
                    for (const node of nodes) {
                        if (node.url) allBookmarks.push(node.url);
                        if (node.children) extractBookmarks(node.children);
                    }
                };

                extractBookmarks(bookmarkTreeNodes);
                
                const newCards = allBookmarks.map((url, index) => ({
                    key: Card.length + index + 1,
                    title: "No Title",
                    fullDescription: url,
                    bgColor: randomColor()
                }));

                setCards(prev => [...prev, ...newCards]);
            });
        };

        getAllBookmarks();
    }, allBookmarks); 


    const Navigate = useNavigate();

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  
  

  return (
    <div className="relative max-w-md bg-[var(--primary-white)] rounded-lg w-[420px] h-[500px] flex flex-col justify-center border border-black py-0 overflow-hidden">
      <div className={` 
        
        ${selectedIndex === null 
          ? 'overflow-y-scroll py-3 pb-24 px-3 '
          : 'overflow-y-scroll py-0 px-0 cursor-default'}
        
        [&::-webkit-scrollbar]:hidden w-[100%] h-[100%]`}>
        {selectedIndex === null 
          ? Card.map((card, index) => (
              <Cards
                key={index}
                title={card.title}
                description={card.fullDescription.split(" ").splice(0,7).join(" ")+"..."}
                bgColor={card.bgColor}
                onClick={() => setSelectedIndex(index)}
                isSelected={false}
              />
            ))
          : (
              <Cards
                title={Card[selectedIndex].title}
                description={Card[selectedIndex].fullDescription}
                bgColor={Card[selectedIndex].bgColor}
                onClick={() => null}
                isSelected={true}
              />
            )}
      </div>
      
      <div className="absolute bottom-0 rounded-b-lg w-full min-h-[90px] flex items-center justify-between px-10 bg-white border-t border-black">
        <Button 
          text='BACK' 
          handle={() => {
            if(selectedIndex === null) Navigate("/search");
            else setSelectedIndex(null);
          }} 
          textColor='--primary-white' 
        />
        <Button 
          text='HOME' 
          handle={() => Navigate("/") } 
          textColor='--primary-white' 
        />
      </div>
    </div>
  );
};

export default SearchResponse;