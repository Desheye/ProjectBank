const express = require('express');
const morgan = require('morgan');
const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.resolve(__dirname, "css")));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'form.html'));
});

app.post('/submit', (req, res) => {
    const { username, age, phoneNumber, city, country, email, password, confirm_password } = req.body;

    if (password !== confirm_password) {
        return res.json({ success: false, message: "Passwords do not match" });
    }

    const query = 'INSERT INTO user_data (user_name, age, phone_number, city, country, email, password) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [username, age, phoneNumber, city, country, email, password];

    console.log('username:', username); // Added this line
    console.log('age:', age); // Added this line
    console.log('phoneNumber:', phoneNumber); // Added this line
    console.log('city:', city); // Added this line
    console.log('country:', country); // Added this line
    console.log('email:', email); // Added this line
    console.log('password:', password); // Added this line

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error inserting data: ' + err.stack);
            return res.json({ success: false, message: 'Database insertion failed' });
        }
        console.log('Data inserted successfully:', result); // Added this line
        res.json({ success: true, message: 'Form submitted successfully' });
    });
});

// Catch-all route for undefined routes
app.get('*', (req, res) => {
    res.status(404).send('Page not found');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
