document.addEventListener('DOMContentLoaded', () => {
  console.log("Loading about page data.");
  chrome.storage.local.get(['blockedUrls', 'blockCount'], result => {
    document.getElementById('uniqueCount').textContent = result.blockedUrls.length;
    document.getElementById('blockCount').textContent = result.blockCount;
    console.log("Unique URLs blocked:", result.blockedUrls.length);
    console.log("Total block count:", result.blockCount);
  });
});