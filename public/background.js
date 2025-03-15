chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.insertCSS({
    target: { tabId: tab.id },
    files: ["content.css"]
  });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content.js"]
  });
});






chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "searchAll") {
      console.log("Showing all bookmarks")
      fetch(`https://hippocampus-backend.onrender.com/links/get`, {
        method: 'GET',
        headers: { 'access_token': message.cookies },
        'access_token': message.cookies,
        'user_id': chrome.cookies.get({ url: 'https://hippocampus-backend.onrender.com', name: 'user_id' }),
        'user_name': chrome.cookies.get({ url: 'https://hippocampus-backend.onrender.com', name: 'user_name' }),
        'user_profile': chrome.cookies.get({ url: 'https://hippocampus-backend.onrender.com', name: 'user_profile' })
      })
      .then(response => response.json())
      .then(data => sendResponse({ success: true, data }))
      .catch(error => sendResponse({ success: false, error: error.message }));
      return true; 
    }

  
    if (message.action === "search") {
      fetch(`https://hippocampus-backend.onrender.com/links/search?query=${message.query}`, {
        method: 'GET',
        headers: { 'access_token': message.cookies },
        'access_token': message.cookies,
        'user_id': chrome.cookies.get({ url: 'https://hippocampus-backend.onrender.com', name: 'user_id' }),
        'user_name': chrome.cookies.get({ url: 'https://hippocampus-backend.onrender.com', name: 'user_name' }),
        'user_profile': chrome.cookies.get({ url: 'https://hippocampus-backend.onrender.com', name: 'user_profile' })
      })
      .then(response => response.json())
      .then(data => sendResponse({ success: true, data }))
      .catch(error => sendResponse({ success: false, error: error.message }));
      return true; 
    }

    else if (message.action === "submit") {
      fetch('https://hippocampus-backend.onrender.com/links/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'access_token': message.cookies,
          'user_id': chrome.cookies.get({ url: 'https://hippocampus-backend.onrender.com', name: 'user_id' }),
          'user_name': chrome.cookies.get({ url: 'https://hippocampus-backend.onrender.com', name: 'user_name' }),
          'user_profile': chrome.cookies.get({ url: 'https://hippocampus-backend.onrender.com', name: 'user_profile' })

        },
        body: JSON.stringify(message.data)
      })
      .then(response => response.json())
      .then(data => {
        sendResponse({ success: true, data });
      })
      .catch(error => {
        console.error("Submission error:", error);
        sendResponse({ success: false, error: error.message });
      });
      return true;
    }

    else if (message.action === "getQuotes") {
      fetch('https://hippocampus-backend.onrender.com/quotes', {
        method: 'GET',
        headers: { 'access_token': message.cookies }
      })
      .then(response => response.json())
      .then(data => sendResponse({ success: true, data }))
      .catch(error => sendResponse({ success: false, error: error.message }));
      return true;
    }
    else if(message.action === "delete"){
      fetch(`https://hippocampus-backend.onrender.com/links/delete?doc_id=${message.query}`, {
        method: 'DELETE',
        headers: { 'access_token': message.cookies }
      })
      .then(response => response.json())
      .then(data => sendResponse({ success: true, data }))
      .catch(error => sendResponse({ success: false, error: error.message }));
      return true;
    }
    
    else {
      null
    }
    
  });