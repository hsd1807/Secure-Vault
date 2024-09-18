if (!localStorage.getItem('isAuthenticated')) {
    window.location.href = '../index.html';
}

const passwordInput = document.getElementById('password');
const strengthMeter = document.getElementById('strength-meter');

passwordInput.addEventListener('input', checkPasswordStrength);

function checkPasswordStrength() {
    const password = passwordInput.value;
    let strength = 0;

    if (password.lenght >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/\d/)) strength++;
    if (password.match(/[^a-zA-Z\d]/)) strength++;

    switch(strength) {
        case 0:
        case 1:
            strengthMeter.textContent = 'Weak';
            strengthMeter.style.color = 'red';
            break;
        case 2:
            strengthMeter.textContent = 'Medium';
            strengthMeter.style.color = 'orange';
            break;
        case 3:
            strengthMeter.textContent = 'Strong';
            strengthMeter.style.color = 'green';
            break;
        case 4:
            strengthMeter.textContent = 'Very Strong';
            strengthMeter.style.color = 'darkgreen';
            break;
    }
}

document.getElementById('add-password.form').addEventListener('submit', function(e){
    e.preventDefault();
    const website = document.getElementById('website').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
    passwords.push({ website, username, password });
    localStorage.setItem('passwords', JSON.stringify(passwords));

    alert('Password saved successfully!');
    location.href = 'dashboard.html';
})