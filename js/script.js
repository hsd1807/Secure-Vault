document.getElementById('master-password-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const masterPassword = document.getElementById('master-password').value;
    const errorMessage = document.getElementById('error-message');

    if (masterPassword === 'SecureVault123!') {
        localStorage.setItem('isAuthenticated', 'true');
        window.location.href = 'pages/main.html';
    } else {
        errorMessage.textContent = 'Incorrect Master Password. Please try again.';  
    }
});