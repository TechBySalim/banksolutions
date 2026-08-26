document.addEventListener('wheel', function (event) {
    if (document.activeElement && document.activeElement.type === 'number') {
        event.preventDefault();
    }
}, { passive: false });
