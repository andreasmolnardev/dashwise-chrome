let dashwiseUrl = 'https://www.google.com';

function normalizeUrl(url) {
  if (!url) return dashwiseUrl;
  return url.startsWith('http://') || url.startsWith('https://') ? url : 'https://' + url;
}

function loadDashwise() {
  chrome.storage.sync.get({ newTabUrl: 'https://www.google.com' }, (items) => {
    dashwiseUrl = normalizeUrl(items.newTabUrl);
    window.location.replace(dashwiseUrl);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadDashwise();
});
