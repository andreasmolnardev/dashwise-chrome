// Function to load the custom URL in an iframe to keep focus in the tab, not the address bar
const loadCustomUrl = () => {
    chrome.storage.sync.get(
        { newTabUrl: 'https://www.google.com' }, // Default URL
        (items) => {
            let url = items.newTabUrl;
            console.log('Loaded URL from storage:', url);
            if (url) {
                // Ensure URL starts with http/https
                if (!url.startsWith('http')) {
                    url = `https://${url}`;
                }

                // Navigate the top-level page to the URL so the site runs as a normal page
                // (loading in an iframe can break sites that expect to be top-level)
                try {
                    window.location.replace(url);
                } catch (e) {
                    // Fallback to iframe if navigation is blocked for some reason
                    const iframe = document.getElementById('content-frame');
                    if (iframe) {
                        iframe.src = url;
                        iframe.onload = () => {
                            document.body.classList.add('loaded');
                            iframe.focus();
                        };
                    }
                }
            }
        }
    );
};

// Start loading the URL
loadCustomUrl();

