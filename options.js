(function () {
  function buildPageUrl(page, baseUrl) {
    const root = (baseUrl || '').replace(/\/+$/, '');
    return page && page !== 'home' ? root + '/' + page.replace(/^\/+/, '') : root;
  }

  function updateNewTabOptionsVisibility() {
    document.getElementById('new-tab-options').style.display = document.getElementById('replace-new-tab').checked ? 'block' : 'none';
  }

  function saveOptions() {
    const replaceNewTab = document.getElementById('replace-new-tab').checked;
    const newTabPage = document.getElementById('new-tab-page').value || 'home';
    const newTabOpenSearch = document.getElementById('new-tab-open-search').checked;

    chrome.storage.local.get({ dashwiseBaseUrl: '' }, (auth) => {
      chrome.storage.sync.set({
        replaceNewTab,
        newTabPage,
        newTabOpenSearch,
        newTabUrl: buildPageUrl(newTabPage, auth.dashwiseBaseUrl),
      }, () => {
        const status = document.getElementById('status');
        status.textContent = 'Settings saved.';
        setTimeout(() => { status.textContent = ''; }, 2000);
      });
    });
  }

  function restoreOptions() {
    chrome.storage.sync.get({ replaceNewTab: true, newTabPage: 'home', newTabOpenSearch: false }, (items) => {
      document.getElementById('replace-new-tab').checked = !!items.replaceNewTab;
      document.getElementById('new-tab-page').value = items.newTabPage || 'home';
      document.getElementById('new-tab-open-search').checked = !!items.newTabOpenSearch;
      updateNewTabOptionsVisibility();
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
    document.getElementById('replace-new-tab').addEventListener('change', updateNewTabOptionsVisibility);
    document.getElementById('save').addEventListener('click', saveOptions);
    document.getElementById('logout-btn').addEventListener('click', handleLogout);
  });
})();
