document.addEventListener('DOMContentLoaded', function() {
    if (!localStorage.getItem('isAuthenticated')) {
        window.location.href = '../index.html';
    }
});

function logout() {
    localStorage.removeItem('isAuthenticated');
    window.location.href = '../index.html';
}