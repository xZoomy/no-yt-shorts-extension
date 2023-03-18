function RemoveShorts() {
    console.log("Deleting shorts");
    document.querySelectorAll("#overlays > ytd-thumbnail-overlay-time-status-renderer > yt-icon > svg").forEach(el => {
        el.closest("ytd-grid-video-renderer").remove();
    });
}

function ListenDom() {
    const targetNode = document.querySelector("#contents.style-scope.ytd-section-list-renderer");
    const callback = (mutationList) => {
        for (const mutation of mutationList) {
            if (mutation.type === "childList") {
                RemoveShorts();
            }
        }
    };
    const observer = new MutationObserver(callback);
    observer.observe(targetNode, { childList: true });
}

document.addEventListener('DOMContentLoaded', function () {
    console.log('loaded');
    RemoveShorts();
    ListenDom();
});
