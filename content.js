const blockMessage = `
  <div style="text-align: center; margin-top: 20%;">
    <h1>This website is blocked by the Blocked URLs extension.</h1>
  </div>
`;

if (window.location.href.includes(chrome.runtime.getURL("blocked.html"))) {
  console.log("Displaying block message.");
  document.body.innerHTML = blockMessage;
}