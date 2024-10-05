function loadPage(page) {
    document.querySelector('#navigator').bringPageTop(page, {animation: 'fade'});
}

function restrictToInteger(event) {
    // List of allowed keys (control characters), e.g., Backspace, arrow keys, etc."
    const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Tab"];

    // Check if the key is a number (0-9) or an allowed control key.
    if (
        !allowedKeys.includes(event.key) && // Allowed control key
        !(event.key >= "0" && event.key <= "9") // Numbers 0-9
    ) {
        event.preventDefault(); // Block not allowed input
    }
}

document.addEventListener('init', function () {
    document.querySelector(".legal-button").onclick = () => loadPage('legal.html');
    document.querySelectorAll(".integer-only").forEach((element) => {
        element.addEventListener('keydown', restrictToInteger);
    });

});