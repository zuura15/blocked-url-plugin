chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed.");
  chrome.storage.local.set({ blockedUrls: [], blockCount: 0, blockStats: {} });
});

chrome.webNavigation.onBeforeNavigate.addListener(details => {
  console.log("Navigating to:", details.url);
  chrome.storage.local.get(["blockedUrls", "blockCount", "blockStats"], result => {
    const blockedUrls = result.blockedUrls;
    const blockCount = result.blockCount;
    const blockStats = result.blockStats;

    const url = new URL(details.url);
    if (blockedUrls.includes(url.hostname)) {
      console.log("Blocking URL:", url.hostname);
      chrome.tabs.update(details.tabId, { url: chrome.runtime.getURL("blocked.html") });
      chrome.storage.local.set({ blockCount: blockCount + 1 });

      blockStats[url.hostname] = (blockStats[url.hostname] || 0) + 1;
      chrome.storage.local.set({ blockStats });
    }
  });
}, { url: [{ urlMatches: 'http://*/*' }, { urlMatches: 'https://*/*' }] });
