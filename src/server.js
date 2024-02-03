const express = require('express');
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// Parse application/json
app.use(bodyParser.json());

// MySQL Connection Configuration
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'timetable',
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL as id ' + connection.threadId);
});

app.use(express.static('public'));

// you have a 'users' table in your database
app.post('/login', (req, res) => {
    const { username, password, role } = req.body;

    // Query the users table to find the user with the provided username
    const sql = 'SELECT * FROM users WHERE username = ?';
    connection.query(sql, [username], (err, results) => {
        if (err) {
            console.error('Error executing MySQL query: ' + err.stack);
            return res.status(500).send('Error authenticating user');
        }

        // Check if the user exists
        if (results.length === 0 || password !== results[0].password || role !== results[0].role) {
            // If user doesn't exist or credentials are incorrect, send an error message
            return res.status(401).send('Invalid username, password, or role');
        }

        const user = results[0];

        // Redirect based on the role
        if (user.role === 'admin') {
            res.redirect('/admin-dashboard');
        } else if (user.role === 'student') {
            res.redirect('/student-dashboard');
        }
    });
});

// Student dashboard route
app.get('/student-dashboard', (req, res) => {
    // Render the student dashboard page or timetable view
    res.sendFile(path.join(__dirname, 'public', 'student-dashboard.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Login.html'));
});

// Route to handle adding a student

app.post('/add-student', (req, res) => {
    const { firstName, lastName, regNumber, password } = req.body;

    const sql = 'INSERT INTO students (first_name, lastname, reg_number, password) VALUES (?, ?, ?, ?)';
    
    connection.query(sql, [firstName, lastName, regNumber, password], (err, result) => {
        if (err) {
            console.error('Error adding student: ' + err.stack);
            return res.status(500).send('Error adding student: ' + err.message);
        }
        console.log('Student added successfully');
        res.redirect('/admin-dashboard'); // Redirect to admin dashboard after adding student
    });
});


// Route to handle viewing students
app.get('/view-students', (req, res) => {
    const sql = 'SELECT * FROM students';

    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching students: ' + err.stack);
            return res.status(500).send('Error fetching students');
        }
        
        // Render the list of students (you can customize this based on your needs)
        res.json(results);
    });
});

// Route to handle adding timetable
app.post('/add-timetable', (req, res) => {
    const { date, subject, period, room } = req.body;

    const sql = 'INSERT INTO timetable (date, subject, period, room) VALUES (?, ?, ?, ?)';
    
    connection.query(sql, [date, subject, period, room], (err, result) => {
        if (err) {
            console.error('Error adding timetable: ' + err.stack);
            return res.status(500).send('Error adding timetable');
        }
        res.redirect('/admin-dashboard'); // Redirect to admin dashboard after adding timetable
    });
});
app.get('/view-timetable', (req, res) => {
    const sql = 'SELECT * FROM timetable';

    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching timetable: ' + err.stack);
            return res.status(500).send('Error fetching timetable');
        }
        
        // Render the list of timetable (you can customize this based on your needs)
        res.json(results);
    });
});
// Route to handle admin dashboard
app.get('/admin-dashboard', (req, res) => {
    // Render the admin dashboard page or perform any other logic
    res.sendFile(path.join(__dirname, 'public', 'admin-dashboard.html'));
});

// 404 Error Handler
app.use((req, res) => {
    res.status(404).send('Page Not Found');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
