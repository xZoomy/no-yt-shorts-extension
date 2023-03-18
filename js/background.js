/**
 * Update youtube tabs on extension install or update
 */
chrome.runtime.onInstalled.addListener((details) => {
    console.log(details);
    if (details.reason === 'install' || details.reason == 'update') {
        chrome.tabs.query({ url: 'https://www.youtube.com/*' }, (tabs) => {
            tabs.forEach(tab => {
                chrome.tabs.reload(tab.id);
            });
        });
    }
});
