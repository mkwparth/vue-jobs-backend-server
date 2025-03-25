// const jsonServer = require("json-server");
// const server = jsonServer.create();
// const router = jsonServer.router("db.json");
// const middlewares = jsonServer.defaults();

// server.use(middlewares);
// server.use(router);
// server.listen(port);

// =========================================================

require('dotenv').config();
const express = require("express");
const db = require('./database')
const port = process.env.PORT;

const app = express();
app.use(express.json());

// 1. Get all jobs
app.get("/jobs", (req, res) => {
    db.all("SELECT * FROM jobs", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// 2. Get a single job by ID
app.get("/jobs/:id", (req, res) => {
    const { id } = req.params;
    db.get("SELECT * FROM jobs WHERE id = ?", [id], (err, row) => {
        // If Any Error
        if (err) {
            res.status(500).json({ error: err.message });
        }
        // If Job Not Found.
        if (!row) {
            res.status(404).json({ error: "Job Not Found" })
        }
        res.json(row);
    })
});

// 3. Create a new job
app.post("/jobs", (req, res) => {
    const { title, type, location, description, salary, company_name, company_description, contact_email, contact_phone } = req.body;

    if (!title || !type || !location || !description || !salary || !company_name || !company_description || !contact_email || !contact_phone) {
        return res.status(400).json({ error: "All fields are required" });
    }

    db.run("INSERT INTO jobs (title, type, location, description, salary, company_name, company_description, contact_email, contact_phone) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?) ", [title, type, location, description, salary, company_name, company_description, contact_email, contact_phone], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({
            id: this.lastID,
            title, type, location, description, salary, company_name, company_description, contact_email, contact_phone
        });
    });
});


// Update job by ID
app.put("/jobs/:id", (req, res) => {
    const { id } = req.params;
    const { title, type, location, description, salary, company_name, company_description, contact_email, contact_phone } = req.body;

    if (!title || !type || !location || !description || !salary || !company_name || !company_description || !contact_email || !contact_phone) {
        return res.status(400).json({ error: "All fields are required" });
    }

    db.run(
        `UPDATE jobs 
         SET title = ?, 
             type = ?, 
             location = ?, 
             description = ?, 
             salary = ?, 
             company_name = ?, 
             company_description = ?, 
             contact_email = ?, 
             contact_phone = ? 
         WHERE id = ?`,
        [title, type, location, description, salary, company_name, company_description, contact_email, contact_phone, id],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ error: "Job Not Found" });
            }
            console.log(this.changes);

            res.json({ message: "Job Updated Successfully" });
        }
    );
});


// Delete Job by ID
app.delete("/jobs/:id", (req, res) => {
    const { id } = req.params;

    db.run("DELETE FROM jobs WHERE id = ?", [id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: "Job Not Found" });
        }

        res.json({ message: "Job Deleted Successfully" });
    })
})

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});