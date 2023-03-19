const globalDelay = 1000;
const shortsConfig = {
    hideNavLink: true,
    hideSubFeed: true,
    hideHomePage: false,
    replaceShortUrl: true,
}

/**
 * Hides element
 * @param {HTMLElement} selector
 */
function HideElement(selector) {
    if (selector && selector.style.display === '') {
        console.log('Hiding', selector);
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
    if (location.href === 'https://www.youtube.com/feed/subscriptions') {
        const selectors = document.querySelectorAll("#overlays > ytd-thumbnail-overlay-time-status-renderer > yt-icon > svg");
        selectors.forEach((el) => {
            HideElement(el.closest('ytd-grid-video-renderer'));
        });
    }
    // TODO: list view
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


/**
 * Hides all shorts depending on config
 */
function HideShorts() {
    setInterval(() => {
        if (shortsConfig.hideNavLink) HideShortsNavLink();
        if (shortsConfig.hideSubFeed) HideShortsSubFeed();
        if (shortsConfig.hideHomePage) HideShortsHomePage();
        if (shortsConfig.replaceShortUrl) ChangeUrlShorts();
    }, globalDelay);
}

window.addEventListener('load', () => {
    HideShorts();
});
