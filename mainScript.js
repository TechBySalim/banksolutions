function openModal() {
    const modal = document.getElementById('aboutModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeModal() {
    const modal = document.getElementById('aboutModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function ensureAboutButton() {
    const header = document.querySelector('.header-container');
    if (!header) return;

    if (header.querySelector('.about-btn')) return;

    const actionWrap = document.createElement('div');
    actionWrap.style.display = 'flex';
    actionWrap.style.alignItems = 'center';
    actionWrap.style.gap = '10px';

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'about-btn';
    button.textContent = 'About Me';
    button.addEventListener('click', openModal);

    actionWrap.appendChild(button);

    const dropdown = header.querySelector('.dropdown-container');
    if (dropdown) {
        header.insertBefore(actionWrap, dropdown);
    } else {
        header.appendChild(actionWrap);
    }
}

function ensureAboutModal() {
    if (document.getElementById('aboutModal')) return;

    const modal = document.createElement('div');
    modal.id = 'aboutModal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="closeModal()">&times;</span>
            <img src="image.png" alt="Profile">
            <h3>Salim Ahmed</h3>
            <p>Mobile: 01739856638</p>
            <p>Email: saliim.dev@gmail.com</p>
        </div>
    `;

    document.body.appendChild(modal);
}

window.onclick = function (event) {
    const modal = document.getElementById('aboutModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

// Dropdown menu functionality
document.addEventListener('DOMContentLoaded', function () {
    ensureAboutModal();
    ensureAboutButton();

    const dropdownContainer = document.querySelector('.dropdown-container');
    if (!dropdownContainer) return;

    const dropdownContent = document.querySelector('.dropdown-content');
    if (!dropdownContent) return;

    let timeoutId;

    // Show dropdown on mouse enter
    dropdownContainer.addEventListener('mouseenter', function () {
        clearTimeout(timeoutId);
        dropdownContent.classList.remove('hide');
        dropdownContent.classList.add('show');
    });

    // Hide dropdown on mouse leave with delay
    dropdownContainer.addEventListener('mouseleave', function () {
        timeoutId = setTimeout(function () {
            dropdownContent.classList.remove('show');
            dropdownContent.classList.add('hide');
        }, 200); // 200ms delay before hiding
    });

    // Keep dropdown open when hovering over content
    dropdownContent.addEventListener('mouseenter', function () {
        clearTimeout(timeoutId);
    });

    dropdownContent.addEventListener('mouseleave', function () {
        timeoutId = setTimeout(function () {
            dropdownContent.classList.remove('show');
            dropdownContent.classList.add('hide');
        }, 200);
    });
});


