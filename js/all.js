/**
 * Removes Shorts tab on left sidebar
 */
function RemoveShortsTab() {
    const selector = document.querySelectorAll("#items > ytd-guide-entry-renderer:nth-child(2)")[0];
    if (selector) {
        console.log("hide shorts tab");
        selector.style.display = "none";
    } else {
        setTimeout(() => {
            RemoveShortsTab();
        }, 500);
    }
}


/**
 * Function to wait content to show
 * @param {Function} func
 * @param {HTMLElement} selector
 */
async function WaitElementsToDisplay(func, selector) {
    if (selector) {
        func.apply();
    } else {
        setTimeout(() => {
            func.apply();
        }, 500);
    }
}

window.addEventListener("load", async () => {
    WaitElementsToDisplay();
});
