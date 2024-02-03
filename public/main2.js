// Assuming this function is called when the "View Students" button is clicked
function onViewtimetable() {
    // Fetch the student data from the server
    fetch('/view-timetable')
        .then(response => response.json())
        .then(data => {
            // Call a function to display the timetable list
            displaytimetableist(data);
        })
        .catch(error => {
            console.error('Error fetching timetable data:', error);
        });
}

// Function to display the timetable list
function displaytimetableList(students) {
    const timetableList = document.getElementById('timetable-list');

    // Clear existing content
    timetableList.innerHTML = '';

    // Iterate through the timetable data and create list items
    students.forEach(student => {
        const listItem = document.createElement('li');
        listItem.textContent = `${timetable.date} ${timetable.subject} ${timetable.period} - ${timetable.room}`;
        timetableList.appendChild(listItem);
    });
}
