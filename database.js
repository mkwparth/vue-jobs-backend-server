const sqlite3 = require('sqlite3').verbose();

// Connect to Sqlite db
const db = new sqlite3.Database('./jobs.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error("Error connecting to database:", err.message);
    } else {
        console.log("Connected to SQLite database.")
    }
});

// Create jobs table
db.run(`
    CREATE TABLE IF NOT EXISTS jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    type TEXT NOT NULL,
    location TEXT NOT NULL,
    description TEXT NOT NULL,
    salary TEXT NOT NULL,
    company_name TEXT NOT NULL,
    company_description TEXT NOT NULL,
    contact_email TEXT NOT NULL,
    contact_phone TEXT NOT NULL
)`);

// Insert Data into jobs
db.run(`INSERT INTO jobs (title, type, location, description, salary, company_name, company_description, contact_email, contact_phone)
VALUES 
('Junior Vue Dev', 'Full-Time', 'Boston, MA', 
 'We are seeking a talented Front-End Developer to join our team in Boston, MA. The ideal candidate will have strong skills in HTML, CSS, and JavaScript, with experience working with modern JavaScript frameworks such as Vue or Angular.', 
 '$125K - $150K', 'NewTek Solutions', 
 'NewTek Solutions is a leading technology company specializing in web development and digital solutions.', 
 'contact@teksolutions.com', '555-555-5555'),

('Senior React Developer', 'Full-Time', 'New York, NY', 
 'We are looking for an experienced React.js developer to lead our front-end team.', 
 '$150K - $180K', 'Tech Innovators Inc.', 
 'A global leader in software development and innovation.', 
 'hr@techinnovators.com', '555-123-4567'),

('Backend Node.js Developer', 'Part-Time', 'Remote', 
 'Seeking a backend developer with expertise in Node.js, Express.js, and MongoDB.', 
 '$80K - $120K', 'CloudSoft Solutions', 
 'A company focused on cloud-based solutions and scalable web applications.', 
 'jobs@cloudsoft.com', '555-987-6543'),

('Full Stack Developer', 'Contract', 'San Francisco, CA', 
 'Looking for a talented full-stack developer skilled in JavaScript, Vue.js, and Node.js.', 
 '$130K - $160K', 'Code Crafters', 
 'We create high-quality digital solutions for startups and enterprises.', 
 'careers@codecrafters.com', '555-789-1234'),

('Mobile App Developer', 'Full-Time', 'Austin, TX', 
 'Seeking a mobile developer with experience in React Native or Flutter.', 
 '$110K - $140K', 'AppWorks LLC', 
 'A leading mobile app development agency delivering innovative solutions.', 
 'hiring@appworks.com', '555-456-7890');
`);


module.exports = db;

