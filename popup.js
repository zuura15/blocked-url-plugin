document.getElementById('block').addEventListener('click', () => {
  const url = document.getElementById('url').value;
  console.log("Blocking URL from input:", url);
  blockUrl(url);
});

document.getElementById('unblock').addEventListener('click', () => {
  const url = document.getElementById('url').value;
  console.log("Unblocking URL from input:", url);
  unblockUrl(url);
});

document.addEventListener('DOMContentLoaded', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    const url = new URL(tabs[0].url).hostname;
    document.getElementById('blockCurrent').textContent = `Block ${url} (active URL)`;
    document.getElementById('blockCurrent').addEventListener('click', () => {
      console.log("Blocking current active URL:", url);
      blockUrl(url);
    });
  });
});

function blockUrl(url) {
  chrome.storage.local.get('blockedUrls', result => {
    const blockedUrls = result.blockedUrls || [];
    if (!blockedUrls.includes(url)) {
      console.log("Adding URL to blocked list:", url);
      blockedUrls.push(url);
      chrome.storage.local.set({ blockedUrls }, () => {
        console.log("URL successfully blocked:", url);
      });
    }
  });
}

function unblockUrl(url) {
  chrome.storage.local.get('blockedUrls', result => {
    let blockedUrls = result.blockedUrls || [];
    blockedUrls = blockedUrls.filter(u => u !== url);
    console.log("Removing URL from blocked list:", url);
    chrome.storage.local.set({ blockedUrls }, () => {
      console.log("URL successfully unblocked:", url);
    });
  });
}
