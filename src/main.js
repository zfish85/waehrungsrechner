function loadPage(page) {
    document.querySelector('#navigator').bringPageTop(page, {animation: 'fade'});
}

function restrictToInteger(inputElement) {
    inputElement.value = inputElement.value.replace(/[^0-9]/g, '');

    if (inputElement.value.length > 10) {
        inputElement.value = inputElement.value.slice(0, 10);
    }
}

document.addEventListener('init', function () {
    document.querySelector(".legal-button").onclick = () => loadPage('legal.html');
    document.querySelectorAll(".integer-only").forEach((element) => {
        element.addEventListener('input', function () {
            restrictToInteger(this);
        });
    });

});