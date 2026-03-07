// script.js
document.addEventListener('DOMContentLoaded', function () {
    // Add event listeners
    document.getElementById('generateBtn').addEventListener('click', generateCheque);
    document.getElementById('printBtn').addEventListener('click', printCheque);
    // Add clear button listener
    document.getElementById('clearBtn').addEventListener('click', clearData);
    var creatorBtn = document.getElementById('creatorBtn');
    if (creatorBtn) creatorBtn.addEventListener('click', openModal);
    document.getElementById('closeModal').addEventListener('click', closeModal);

    // Amount in words below buttons (like PO voucher, with paisa)
    var amountEl = document.getElementById('amount');
    var amountWordsEl = document.getElementById('amount-in-words');
    function updateAmountWordsHint() {
        var w = amountToWords(amountEl.value);
        amountWordsEl.textContent = w ? ('Amount in words: ' + w) : '';
    }
    amountEl.addEventListener('input', updateAmountWordsHint);
    updateAmountWordsHint();

    // Close modal when clicking outside
    window.addEventListener('click', function (event) {
        if (event.target === document.getElementById('creatorModal')) {
            closeModal();
        }
    });

});

function openModal() {
    document.getElementById('creatorModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('creatorModal').style.display = 'none';
}

function generateCheque() {
    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const amount = document.getElementById('amount').value;

    if (!name || !date || !amount) {
        alert('Please fill all fields');
        return;
    }

//Title Case function
String.prototype.toTitleCase = function () {
    return this.replace(/\b\w/g, function (c) {
        return c.toUpperCase();
    });
};


    const formattedDate = formatDate(date);

    document.getElementById('cheque-name').innerText = name.toTitleCase();
    document.getElementById('cheque-date').innerText = formattedDate;
    document.getElementById('cheque-amount').innerText = "=" + parseFloat(amount).toFixed(2);
    document.getElementById('not-over-tk').innerText = 'NOT OVER TK. '+ parseFloat(amount).toFixed(2);

    const amountInWords = amountToWords(amount);
    document.getElementById('cheque-words').innerText = amountInWords;

    // adjustAmountPosition();
}

// function adjustAmountPosition() {
//     const wordsElement = document.getElementById('cheque-words');
//     const amountElement = document.getElementById('cheque-amount');

// wordsElement.style.right = '150px';
// amountElement.style.right = '170px';

// const wordsHeight = wordsElement.offsetHeight;
// const wordsTop = parseInt(wordsElement.style.right);

// if (wordsHeight > 24) {
//     amountElement.style.top = (wordsTop + wordsHeight - 24) + 'px';
// }
// }

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    
    // Convert each digit to individual characters with spaces
    const daySpaced = day.split('').join(' ');
    const monthSpaced = month.split('').join(' ');
    const yearSpaced = year.split('').join(' ');
    
    return `${daySpaced} ${monthSpaced} ${yearSpaced}`;
}

function printCheque() {
    if (!document.getElementById('cheque-name').innerText) {
        alert('Please generate a cheque first');
        return;
    }

    // Create a print-specific stylesheet
    // const printStyle = document.createElement('style');
    // printStyle.innerHTML = `
    //     @page {
    //       size: 19cm 8.5cm;
    //       margin: 0;
    //     }
    //     body {
    //       width: 19cm;
    //       height: 8.5cm;
    //     }
    //     #cheque {
    //       width: 19cm;
    //       height: 8.5cm;
    //     }
    //   `;
    // document.head.appendChild(printStyle);

    window.print();

    // Remove the print styles after printing
    setTimeout(() => {
        document.head.removeChild(printStyle);
    }, 1000);
}

// Amount in words with paisa (like PO voucher)
function numberToWordsBDInt(n) {
    var ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    var tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

    function twoDigits(num) {
        if (num === 0) return "";
        if (num < 20) return ones[num];
        var t = Math.floor(num / 10);
        var o = num % 10;
        return tens[t] + (o ? " " + ones[o] : "");
    }

    function threeDigits(num) {
        var h = Math.floor(num / 100);
        var r = num % 100;
        var out = "";
        if (h) out += ones[h] + " Hundred";
        var tail = twoDigits(r);
        if (tail) out += (out ? " " : "") + tail;
        return out;
    }

    if (n === 0) return "Zero";
    var out = [];
    var crore = Math.floor(n / 10000000);
    n = n % 10000000;
    var lakh = Math.floor(n / 100000);
    n = n % 100000;
    var thousand = Math.floor(n / 1000);
    n = n % 1000;
    var rest = n;

    if (crore) out.push(threeDigits(crore) + " Crore");
    if (lakh) out.push(threeDigits(lakh) + " Lac");
    if (thousand) out.push(threeDigits(thousand) + " Thousand");
    if (rest) out.push(threeDigits(rest));

    return out.join(" ").replace(/\s+/g, " ").trim();
}

function amountToWords(amount) {
    if (amount === "" || amount == null) return "";
    var num = Number(amount);
    if (!Number.isFinite(num) || num < 0) return "";
    var taka = Math.floor(num + 1e-9);
    var paisa = Math.round((num - taka) * 100);
    var words = numberToWordsBDInt(taka) + " Taka";
    if (paisa) words += " and " + numberToWordsBDInt(paisa) + " Paisa";
    return words + " Only";
}

function numberToWords(num) {
    if (!num || isNaN(num)) return "";
    num = parseFloat(num);
    if (num == 0) return "Zero";

    const a = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven',
        'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    if (num < 20) return a[Math.floor(num)];

    let str = '';
    if (num < 100) {
        str = b[Math.floor(num / 10)];
        if (num % 10 !== 0) str += ' ' + a[Math.floor(num % 10)];
        return str;
    }

    if (num < 1000) {
        str = a[Math.floor(num / 100)] + ' Hundred';
        if (num % 100 !== 0) str += ' ' + numberToWords(num % 100);
        return str;
    }

    if (num < 100000) {
        str = numberToWords(Math.floor(num / 1000)) + ' Thousand';
        if (num % 1000 !== 0) str += ' ' + numberToWords(num % 1000);
        return str;
    }

    if (num < 10000000) {
        str = numberToWords(Math.floor(num / 100000)) + ' Lac';
        if (num % 100000 !== 0) str += ' ' + numberToWords(num % 100000);
        return str;
    }

    str = numberToWords(Math.floor(num / 10000000)) + ' Crore';
    if (num % 10000000 !== 0) str += ' ' + numberToWords(num % 10000000);
    return str;
}



function clearData() {
    // Clear input fields
    document.getElementById('name').value = '';
    document.getElementById('date').value = '';
    document.getElementById('amount').value = '';

    // Clear cheque preview
    document.getElementById('cheque-name').innerText = '';
    document.getElementById('cheque-date').innerText = '';
    document.getElementById('cheque-words').innerText = '';
    document.getElementById('cheque-amount').innerText = '';
    document.getElementById('not-over-tk').innerText = '';
    document.getElementById('amount-in-words').textContent = '';
}


