// Assuming this function is called when the "View Students" button is clicked
function onViewStudents() {
    // Fetch the student data from the server
    fetch('/view-students')
        .then(response => response.json())
        .then(data => {
            // Call a function to display the student list
            displayStudentList(data);
        })
        .catch(error => {
            console.error('Error fetching student data:', error);
        });
}

// Function to display the student list
function displayStudentList(students) {
    const studentsList = document.getElementById('students-list');

    // Clear existing content
    studentsList.innerHTML = '';

    // Iterate through the student data and create list items
    students.forEach(student => {
        const listItem = document.createElement('li');
        listItem.textContent = `${student.first_name} ${student.lastname} - ${student.reg_number}`;
        studentsList.appendChild(listItem);
    });
}
