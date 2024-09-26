if (!localStorage.getItem('isAuthenticated')) {
    window.location.href = '../index.html';
}

let currentUpdateIndex;

function loadPasswords() {
    const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
    const tableBody = document.querySelector('#passwords-table tbody');
    tableBody.innerHTML = '';

    passwords.forEach((entry, index) => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = entry.website;
        row.insertCell(1).textContent = entry.username;
        row.insertCell(2).textContent = '********';

        const actionsCell = row.insertCell(3);
        const showButton = document.createElement('button');
        showButton.textContent = 'Show';
        showButton.onclick = () => togglePassword(row.cells[2], entry.password);
        actionsCell.appendChild(showButton);

        const updateButton = document.createElement('button');
        updateButton.textContent = 'Update';
        updateButton.onclick = () => openUpdateModal(index);
        actionsCell.appendChild(updateButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deletePassword(index);
        actionsCell.appendChild(deleteButton);

        const copyButton = document.createElement('button');
        copyButton.textContent = 'Copy';
        copyButton.onclick = () => copyToClipboard(entry.password);
        actionsCell.appendChild(copyButton);
    });
}

function togglePassword(cell, password) {
    if (cell.textContent === '********') {
        cell.textContent = password;
    } else {
        cell.textContent = '********';
    }
}

function deletePassword(index) {
    const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
    passwords.splice(index, 1);
    localStorage.setItem('passwords', JSON.stringify(passwords));
    loadPasswords();
}

function openUpdateModal(index) {
    const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
    const entry = passwords[index];
    document.getElementById('update-website').value = entry.website;
    document.getElementById('update-username').value = entry.username;
    document.getElementById('update-password').value = '';
    currentUpdateIndex = index;
    document.getElementById('updateModal').style.display = 'block';
}

function updatePassword() {
    const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
    const updatedUsername = document.getElementById('update-username').value;
    const updatedPassword = document.getElementById('update-password').value;

    if (updatedUsername && updatedPassword) {
        passwords[currentUpdateIndex].username = updatedUsername;
        passwords[currentUpdateIndex].password = updatedPassword;
        localStorage.setItem('passwords', JSON.stringify(passwords));
        document.getElementById('updateModal').style.display = 'none';
        loadPasswords();
    } else {
        alert('Please fill in both username and password fields.');
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Password copied to clipboard!');
    }, (err) => {
        console.error('Could not copy text: ', err);
    });
}

document.getElementsByClassName('close')[0].onclick = function() {
    document.getElementById('updateModal').style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == document.getElementById('updateModal')) {
        document.getElementById('updateModal').style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', loadPasswords);