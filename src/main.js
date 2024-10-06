function loadPage(page) {
    document.querySelector('#navigator').bringPageTop(page, {animation: 'fade'});
}

function restrictToInteger(inputElement) {
    inputElement.value = inputElement.value.replace(/[^0-9]/g, '');

    if (inputElement.value.length > 10) {
        inputElement.value = inputElement.value.slice(0, 10);
    }
}

const  rates = ["officialEuro", "creditCard", "street", "transfer", "officialDollar"];

function saveRates() {
    rates.forEach(saveRate);
}

function saveRate(rate) {
    let value = document.getElementById(rate).value;
    if(value && value > 0) {
        localStorage.setItem(rate,value);
    } else {
        localStorage.removeItem(rate);
        document.getElementById(rate).value = "";

    }
}

function setRates(){
    rates.forEach(setRate)
}

function setRate(rate){
    let value = localStorage.getItem(rate);
    if(value && value > 0){
        document.getElementById(rate).value = value;
    }

}





document.addEventListener('init', function (event) {
    document.querySelector(".legal-button").onclick = () => loadPage('legal.html');
    document.querySelector('ons-tabbar').addEventListener('prechange', setRates)
    document.querySelectorAll(".integer-only").forEach((element) => {
        element.addEventListener('input', function () {
            restrictToInteger(this);
        });
    });

    if(event.target.id == "rate"){
        document.querySelector(".save-button").onclick = saveRates;

    }

});







