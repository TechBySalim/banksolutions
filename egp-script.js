// script.js
document.addEventListener('DOMContentLoaded', function () {
    // Add event listeners
    document.getElementById('generateBtn').addEventListener('click', generateCheque);
    document.getElementById('printBtn').addEventListener('click', printCheque);
    // Add clear button listener
    document.getElementById('clearBtn').addEventListener('click', clearData);
    const creatorBtn = document.getElementById('creatorBtn');
    if (creatorBtn) creatorBtn.addEventListener('click', openModal);
    const closeModalBtn = document.getElementById('closeModal');
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    

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

//Title Case function
String.prototype.toTitleCase = function () {
    return this.replace(/\b\w/g, function (c) {
        return c.toUpperCase();
    });
};

function generateCheque() {
    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const idNumber = document.getElementById('id').value;
    const dealNumber = document.getElementById('deal').value;
    const emNumber = document.getElementById('em').value;

    const amounts = getAllAmounts();
    if (!name || !date || amounts.length === 0) {
        alert('Please fill Payee Name, Date, and at least one Amount');
        return;
    }


    const formattedDate = formatDate(date);

    const container = document.getElementById('chequeContainer');
    const template = document.getElementById('chequeTemplate');
    container.innerHTML = '';

    for (const amount of amounts) {
        const chequeEl = template.cloneNode(true);
        chequeEl.id = '';
        chequeEl.style.display = '';

        chequeEl.querySelector('.cheque-name').innerText = name.toTitleCase();
        chequeEl.querySelector('.cheque-date').innerText = formattedDate;
        chequeEl.querySelector('.cheque-amount').innerText = "=" + parseFloat(amount).toFixed(2);
        chequeEl.querySelector('.not-over-tk').innerText = 'NOT OVER TK. ' + parseFloat(amount).toFixed(2);

        const amountInWords = numberToWords(amount) + " Taka Only.";
        chequeEl.querySelector('.cheque-words').innerText = amountInWords;

        chequeEl.querySelector('.id-number').innerText = "ID No = " + idNumber;
        chequeEl.querySelector('.deal-number').innerText = "Deal No = " + dealNumber;
        chequeEl.querySelector('.em-number').innerText = "EM No = " + emNumber;

        container.appendChild(chequeEl);
    }

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
    const container = document.getElementById('chequeContainer');
    if (!container || container.children.length === 0) {
        alert('Please generate cheque preview(s) first');
        return;
    }

    window.print();
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

// add more amount function
function addInput() {
    const div = document.createElement("div");

    const input = document.createElement("input");
    input.type = "number";
    input.placeholder = "Enter Amount (৳)";
    input.className = "extra-amount";

    const btn = document.createElement("button");
    btn.innerHTML = "❌";
    btn.onclick = function () {
      div.remove();
    };

    div.appendChild(input);
    div.appendChild(btn);

    document.getElementById('more-amount-inputand-button').appendChild(div);
  }





function clearData() {
    // Clear input fields
    document.getElementById('name').value = '';
    document.getElementById('date').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('id').value = '';
    document.getElementById('deal').value = '';
    document.getElementById('em').value = '';

    // Clear extra amount inputs
    document.getElementById('more-amount-inputand-button').innerHTML = '';

    // Clear cheque preview(s)
    const container = document.getElementById('chequeContainer');
    if (container) container.innerHTML = '';
}

function getAllAmounts() {
    const amounts = [];

    const mainAmount = document.getElementById('amount')?.value;
    if (mainAmount !== undefined && mainAmount !== null && String(mainAmount).trim() !== '') {
        const n = parseFloat(mainAmount);
        if (!Number.isNaN(n) && n > 0) amounts.push(n);
    }

    const extraInputs = document.querySelectorAll('#more-amount-inputand-button input');
    extraInputs.forEach((el) => {
        const v = el.value;
        if (v === undefined || v === null || String(v).trim() === '') return;
        const n = parseFloat(v);
        if (!Number.isNaN(n) && n > 0) amounts.push(n);
    });

    return amounts;
}


