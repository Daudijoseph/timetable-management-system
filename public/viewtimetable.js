// js/viewTimetable.js

// Update this to match your server endpoint
const apiEndpoint = '/view-timetable';

document.addEventListener('DOMContentLoaded', () => {
    fetch(apiEndpoint)
        .then(response => response.json())
        .then(timetable => {
            displayTimetable(timetable);
        })
        .catch(error => console.error('Error fetching timetable:', error));
});

function displayTimetable(timetable) {
    const tbody = document.querySelector('tbody');

    timetable.forEach(entry => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${entry.date}</td>
            <td>${entry.subject}</td>
            <td>${entry.period}</td>
            <td>${entry.room}</td>
        `;
        tbody.appendChild(row);
    });
}
