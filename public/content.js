(() => {
  let sidebar = document.getElementById("my-extension-sidebar");

  if (sidebar) {
    sidebar.style.animation = "slideOut 0.3s ease-in-out forwards";
    setTimeout(() => {
      sidebar.remove();
    }, 300); 
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
})();
