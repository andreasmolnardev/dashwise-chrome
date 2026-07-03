let dashwiseUrl = 'https://www.google.com';
let searchMode = false;

function normalizeUrl(url) {
  if (!url) return dashwiseUrl;
  return url.startsWith('http://') || url.startsWith('https://') ? url : 'https://' + url;
}

function setSearchMode(url, enabled) {
  const parsed = new URL(url);
  if (enabled) {
    parsed.searchParams.set('search', '1');
  } else {
    parsed.searchParams.delete('search');
  }
  return parsed.toString();
}

function loadFrame(url) {
  const iframe = document.getElementById('content-frame');
  let loaded = false;

  document.body.classList.remove('loaded', 'frame-failed');
  iframe.onload = () => {
    loaded = true;
    document.body.classList.add('loaded');
  };
  iframe.src = url;

  setTimeout(() => {
    if (!loaded) document.body.classList.add('frame-failed');
  }, 5000);
}

function toggleSearchMode() {
  searchMode = !searchMode;
  document.getElementById('search-toggle').textContent = searchMode ? 'Exit search mode' : 'Search mode';
  loadFrame(setSearchMode(dashwiseUrl, searchMode));
}

function loadDashwise() {
  chrome.storage.sync.get({ newTabUrl: 'https://www.google.com' }, (items) => {
    dashwiseUrl = normalizeUrl(items.newTabUrl);
    loadFrame(setSearchMode(dashwiseUrl, searchMode));
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('search-toggle').addEventListener('click', toggleSearchMode);
  loadDashwise();
});
