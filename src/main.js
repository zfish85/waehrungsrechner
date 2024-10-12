const rates = ["officialEuro", "creditCard", "street", "transfer", "officialDollar"];
const euroRates = rates.filter(rate => rate !== "officialDollar");


// Service-Worker

window.addEventListener('load', () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/waehrungsrechner/service-worker.js', { scope: '/' })
            .then(registration => {
                console.log('Service Worker successfully registered with scope:', registration.scope);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    }
});



// Init

document.addEventListener('init', function (event) {


    if (event.target.classList.contains("page--wrapper")) {
        document.querySelector(".legal-button").onclick = () => loadPage('legal.html');
        document.querySelector('ons-tabbar').addEventListener('prechange', setRates);

    }

    if (event.target.id == "rate") {
        document.querySelector(".save-button").addEventListener("click", () => {
            saveRates();
            calculatePesosExchange();
            calculateDollarExchange();
        })



    }
    if (event.target.id === "pesos") {
        document.querySelector("#inputPesos").addEventListener("input", () => {
            calculatePesosExchange();
        });
    }

    if (event.target.id === "dollar") {
        document.querySelector("#inputDollar").addEventListener("input", (event) => {
            calculateDollarExchange();

        });
    }

    document.querySelectorAll(".integer-only").forEach((element) => {
        element.addEventListener('input', function () {
            restrictToInteger(this);
        });
    });

});

// General functions

function loadPage(page) {
    document.querySelector('#navigator').bringPageTop(page, {animation: 'fade'});
}

function restrictToInteger(inputElement) {
    inputElement.value = inputElement.value.replace(/[^0-9]/g, '');

    if (inputElement.value.length > 10) {
        inputElement.value = inputElement.value.slice(0, 10);
    }
}

// Save Rates

function saveRates() {
    rates.forEach(saveRate);
}

function saveRate(rate) {
    let value = document.getElementById(rate).value;
    if (value && value > 0) {
        localStorage.setItem(rate, value);
    } else {
        localStorage.removeItem(rate);
        document.getElementById(rate).value = "";

    }
}

function setRates() {
    rates.forEach(setRate)
}

function setRate(rate) {
    let value = localStorage.getItem(rate);
    if (value && value > 0) {
        document.getElementById(rate).value = value;
    }

}

//Pesos

function calculatePesosExchange(){
    let inputPesos = document.querySelector("#inputPesos").value;
    calculateExchanges(inputPesos, "pesos")


}


//Dollar

function calculateDollarExchange() {
    let inputDollar = document.querySelector("#inputDollar").value;

    let pesos = calculatePesos(inputDollar);
    if (pesos) {
        writeResult(pesos, "dollar", "officialDollar", "ARS", 0);
        calculateExchanges(pesos, "dollar");

    }

}

function calculatePesos(amount) {

    if (!isValidNumber(amount)) {
        amount = null;
    }

    const exchangeRate = localStorage.getItem("officialDollar");

    if (!exchangeRate) {
        writeNoRate("dollar", "officialDollar");
        euroRates.forEach(rate => {
            writeNoRate("dollar", rate);
        });
        return;
    }

    if (!amount) {
        writeBlank("dollar", "officialDollar", "ARS");
        euroRates.forEach(rate => {
            writeBlank("dollar", rate, "€");
        });
        return;
    }

    return parseInt(amount) * parseInt(exchangeRate);

}

//Calculate Exchange

function calculateExchanges(amount, page) {


    // Check if pesos is a valid number
    if (!isValidNumber(amount)) {
        amount = null;
    }

    euroRates.forEach(rate => {
        const exchangeRate = localStorage.getItem(rate);

        // Early return if no exchange rate is available
        if (!exchangeRate) {
            writeNoRate(page, rate);
            return;
        }

        // Early return if pesos input is empty or invalid
        if (!amount) {
            writeBlank(page, rate, "€");
            return;
        }

        // Calculate result and display it
        let result = calculateExchange(parseInt(amount), parseInt(exchangeRate));
        writeResult(result, page, rate, "€", 2);
    });
}

function getElement(page, rate) {
    return document.querySelector(`.output.${page}.${rate}`);

}

function writeResult(result, page, rate, currency, decimal) {
    const element = getElement(page, rate);
    const output = result.toFixed(decimal).replace(".", ",");
    element.innerHTML = `${output} ${currency}`;
}

function writeBlank(page, rate, currency) {
    const element = getElement(page, rate);
    if (currency === "ARS") {
        element.innerHTML = `---- ${currency}`;
        return;
    }
    element.innerHTML = `-.-- ${currency}`;
}

function writeNoRate(page, rate) {
    const element = getElement(page, rate);
    element.innerHTML = "Kein Kurs";
    element.classList.add("no-rate");
}

function calculateExchange(amount, rate) {
    return amount / rate;
}

function isValidNumber(value) {
    if (typeof value === "string") {
        return !isNaN(value) && value.trim() !== '';
    } else if (typeof value === "number") {
        return isFinite(value);
    }
    return false;
}



