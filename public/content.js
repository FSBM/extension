
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received in content script:", message);
  if (message.action === "closeExtension" && message.target === "content") {
    const sidebar = document.getElementById("my-extension-sidebar");
    if (sidebar) {
      sidebar.style.animation = "slideOut 0.3s ease-in-out forwards";
      setTimeout(() => {
        sidebar.remove();
      }, 300);
    }
    sendResponse({success: true});
  }
  return true; 
});


(() => {
  let sidebar = document.getElementById("my-extension-sidebar");

  const closeSidebar = () => {
    sidebar.style.animation = "slideOut 0.3s ease-in-out forwards";
    setTimeout(() => {
      sidebar.remove();
      document.removeEventListener("click", handleClickOutside);
    }, 300);
  };

  const handleClickOutside = (event) => {
    if (!sidebar.contains(event.target)) {
      closeSidebar();
    }
  };

  if (sidebar) {
    closeSidebar();
    return;
  }

  sidebar = document.createElement("div");
  sidebar.id = "my-extension-sidebar";
  sidebar.style.animation = "slideIn 0.3s ease-in-out forwards";

  const iframe = document.createElement("iframe");
  iframe.src = chrome.runtime.getURL("index.html");
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "none";

  sidebar.appendChild(iframe);
  document.body.appendChild(sidebar);

  document.addEventListener("click", handleClickOutside);
  const closeExtension = async () => {
    
  }
})();