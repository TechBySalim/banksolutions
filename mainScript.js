// Modal script
function openModal() {
    document.getElementById('aboutModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('aboutModal').style.display = 'none';
}

// Close modal if clicked outside content
window.onclick = function (event) {
    const modal = document.getElementById('aboutModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


 // Dropdown menu functionality
 document.addEventListener('DOMContentLoaded', function() {
    const dropdownContainer = document.querySelector('.dropdown-container');
    const dropdownContent = document.querySelector('.dropdown-content');
    let timeoutId;

    // Show dropdown on mouse enter
    dropdownContainer.addEventListener('mouseenter', function() {
        clearTimeout(timeoutId);
        dropdownContent.classList.remove('hide');
        dropdownContent.classList.add('show');
    });

    // Hide dropdown on mouse leave with delay
    dropdownContainer.addEventListener('mouseleave', function() {
        timeoutId = setTimeout(function() {
            dropdownContent.classList.remove('show');
            dropdownContent.classList.add('hide');
        }, 200); // 200ms delay before hiding
    });

    // Keep dropdown open when hovering over content
    dropdownContent.addEventListener('mouseenter', function() {
        clearTimeout(timeoutId);
    });

    dropdownContent.addEventListener('mouseleave', function() {
        timeoutId = setTimeout(function() {
            dropdownContent.classList.remove('show');
            dropdownContent.classList.add('hide');
        }, 200);
    });
});


