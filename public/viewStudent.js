// js/viewStudent.js

// Update this to match your server endpoint
const apiEndpoint = '/view-students';

document.addEventListener('DOMContentLoaded', () => {
    fetch(apiEndpoint)
        .then(response => response.json())
        .then(students => {
            displayStudents(students);
        })
        .catch(error => console.error('Error fetching students:', error));
});

function displayStudents(students) {
    const tbody = document.querySelector('tbody');

    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.first_name}</td>
            <td>${student.lastname}</td>
            <td>${student.reg_number}</td>
        `;
        tbody.appendChild(row);
    });
}
