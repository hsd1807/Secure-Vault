document.getElementById('master-password-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const masterPassword = document.getElementById('master-password').value;
    const errorMessage = document.getElementById('error-message');

    if (masterPassword === 'key') {
        localStorage.setItem('isAuthenticated', 'true');
        window.location.href = 'pages/dashboard.html';
    } else {
        errorMessage.textContent = 'Incorrect Master Password. Please try again.';  
    }
});
