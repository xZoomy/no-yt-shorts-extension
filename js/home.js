function RemoveShortsSectionHomePage() {
    document.querySelector("#contents > ytd-rich-section-renderer").remove();
}

document.addEventListener('DOMContentLoaded', function () {
    console.log('loaded');
    RemoveShortsSectionHomePage();
});
