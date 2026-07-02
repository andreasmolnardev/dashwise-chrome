(function () {
  function saveOptions() {
    const url = document.getElementById('new-tab-url').value;
    chrome.storage.sync.set({ newTabUrl: url }, () => {
      const status = document.getElementById('status');
      status.textContent = 'Settings saved.';
      setTimeout(() => { status.textContent = ''; }, 2000);
    });
  }

  function restoreOptions() {
    chrome.storage.sync.get({ newTabUrl: 'https://www.google.com' }, (items) => {
      document.getElementById('new-tab-url').value = items.newTabUrl;
    });
  }

  function handleLogout() {
    chrome.storage.local.remove(['dashwiseBaseUrl', 'dashwiseToken'], () => {
      const status = document.getElementById('logout-status');
      status.textContent = 'Logged out. You will need to sign in again from the popup.';
      status.style.color = '#2ecc71';
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    restoreOptions();
    document.getElementById('save').addEventListener('click', saveOptions);
    document.getElementById('logout-btn').addEventListener('click', handleLogout);
  });
})();
