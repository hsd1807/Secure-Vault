if (!localStorage.getItem('isAuthenticated')) {
    window.location.href = '../index.html';
}

function generatePassword() {
    const length = document.getElementById('password-length').value;
    const uppercase = document.getElementById('include-uppercase').checked;
    const lowercase = document.getElementById('include-lowercase').checked;
    const numbers = document.getElementById('include-numbers').checked;
    const symbols = document.getElementById('include-symbols').checked;

    let charset = '';
    if (uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (numbers) charset += '0123456789';
    if (symbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    if (charset === '') {
        alert('Please select atleast one character type.');
        return;
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }

    document.getElementById('generated-password').textContent = password;
}

function savePassword() {
    const generatedPassword = document.getElementById('generated-password').textContent;
    if (!generatedPassword) {
        alert('Please generate a password first.');
        return;
    }

    const website = prompt('Enter the website for this password:');
    const username = prompt('Enter the username for this password:');

    if (!website || !username) {
        alert('Website and Username are required.');
        return;
    }

    const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
    passwords.push({ website, username, password: generatedPassword });
    localStorage.setItem('passwords', JSON.stringify(passwords));

    alert('Password Saved Successfully!');
    location.href = '../pages/dashboard.html';
}

document.addEventListener('DOMContentLoaded', generatePassword);