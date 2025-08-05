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



