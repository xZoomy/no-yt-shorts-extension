const globalDelay = 1000;
const shortsConfig = {
    hideNavLink: true,
    hideSubFeed: true,
    hideHomePage: true,
    replaceShortUrl: true,
    hideSearch: true,
}

/**
 * Hides element
 * @param {HTMLElement} selector
 */
function HideElement(selector) {
    if (selector && selector.style.display === '') {
        // console.log('Hiding', selector);
        selector.style.display = 'none';
    }
}

/**
 * Removes Shorts tab on left sidebar
 * @param {HTMLElement} selector
 */
function HideShortsNavLink() {
    const selector = document.querySelector('#endpoint[title="Shorts"]');
    HideElement(selector);
}

/**
 * Hides shorts in subscriptions feed
 */
function HideShortsSubFeed() {
    if (location.href.includes('https://www.youtube.com/feed/subscriptions')) {
        const selectors = document.querySelectorAll("a#video-title[href*='/shorts/']");
        selectors.forEach((el, i) => {
            if (el.closest('ytd-grid-video-renderer')) { // GRID VIEW
                HideElement(el.closest('ytd-grid-video-renderer'));
            } else { // LIST VIEW
                if (i !== 0) HideElement(el.closest('ytd-item-section-renderer')); // workaround because first video section has buttons on top
            }
        });
    }
}

/**
 * Hides shorts section on home page
 */
function HideShortsHomePage() {
    if (location.href === 'https://www.youtube.com/') {
        const selector = document.querySelector('#contents > ytd-rich-section-renderer');
        HideElement(selector);
    }
}

/**
 * Replaces shorts url to classic video player
 */
function ChangeUrlShorts() {
    if (location.href.includes('https://www.youtube.com/shorts/')) {
        const shortId = location.href.slice(31);
        location.href = `https://www.youtube.com/watch?v=${shortId}`;
    }
}

function HideShortsTabChannel() {
    document.querySelector('#tabsContent > tp-yt-paper-tab:nth-child(6) > div > div.tab-title.style-scope.ytd-c4-tabbed-header-renderer').textContent == 'Shorts';
}

function HideShortsSearch() {
    if (location.href.includes('https://www.youtube.com/results?search_query=')) {
        const shortsSections = document.querySelectorAll('#contents > ytd-reel-shelf-renderer');
        shortsSections.forEach(el => {
            HideElement(el);
        });

        const videos = document.querySelectorAll('#contents > ytd-video-renderer');
        videos.forEach((el) => {
            // if (el.querySelector('#thumbnail').href.contains('/shorts/')) {
            //     HideElement(el);
            // }
        });
    }
}


/**
 * Hides all shorts depending on config
 */
function HideShorts() {
    setInterval(() => {
        if (shortsConfig.hideNavLink) HideShortsNavLink();
        if (shortsConfig.hideSubFeed) HideShortsSubFeed();
        if (shortsConfig.hideHomePage) HideShortsHomePage();
        if (shortsConfig.replaceShortUrl) ChangeUrlShorts();
        if (shortsConfig.hideSearch) HideShortsSearch();
    }, globalDelay);
}

window.addEventListener('load', () => {
    HideShorts();
});
