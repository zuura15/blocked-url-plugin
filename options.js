document.addEventListener('DOMContentLoaded', () => {
  console.log("Loading options page data.");
  chrome.storage.local.get(['blockedUrls', 'blockCount', 'blockStats'], result => {
    const blockedUrls = result.blockedUrls || [];
    const blockStats = result.blockStats || {};
    const list = document.getElementById('blockedList');
    blockedUrls.forEach(url => {
      const li = document.createElement('li');
      const count = blockStats[url] || 0;
      li.textContent = `${url} - Blocked ${count} times`;
      list.appendChild(li);
    });
    console.log("Blocked URLs loaded:", blockedUrls);
  });
});
