import express from "express";
import dotenv from "dotenv";
import pg from "pg";
const { Pool } = pg;

const app = express();

dotenv.config();
const port = process.env.PORT || 3000;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 5
});

app.use(express.json());

app.get("/api/safety-brief/usr", (req, res) => {
    /* USER by ID --> /api/safety-brief/usr?id=2 <-- */
    if (req.query.id) {
        console.log(req.query);
        const id = req.query.id;
        pool.query(`SELECT * FROM usr WHERE id = $1`, [id], (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send(`Error reading USER table`);
            } else if (result.rows.length === 0) {
                console.log(`User with id ${id} was not found`);
                res.status(404).send(`User with id ${id} was not found`);
            } else {
                console.log(result.rows);
                res.json(result.rows);
            }
        });
    /* All USERs ordered by username --> /api/safety-brief/usr <-- */
    } else {
        pool.query(`SELECT * FROM usr ORDER BY username`, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send(`Error reading USER table`);
            } else if (result.rows.length === 0) {
                console.log(`USER table not found`);
                res.status(404).send(`USER table not found`);
            } else {
                console.log(result.rows);
                res.json(result.rows);
            }
        });
    }
});

app.get("/api/safety-brief/brief", (req, res) => {
    /* BRIEF by ID --> /api/safety-brief/brief?id=2 <-- */
    if (req.query.id) {
        console.log(req.query);
        const id = req.query.id;
        pool.query(`SELECT * FROM brief WHERE id = $1`, [id], (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send(`Error reading BRIEF table`);
            } else if (result.rows.length === 0) {
                console.log(`Brief with id ${id} was not found`);
                res.status(404).send(`Brief with id ${id} was not found`);
            } else {
                console.log(result.rows);
                res.json(result.rows);
            }
        });
    /* All BRIEFs ordered by title --> /api/safety-brief/brief <-- */
    } else {
        pool.query(`SELECT * FROM brief ORDER BY title`, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send(`Error reading BRIEF table`)
            } else if (result.rows.length === 0) {
                console.log(`BRIEF table not found`);
                res.status(404).send(`BRIEF table not found`);
            } else {
                console.log(result.rows);
                res.json(result.rows);
            }
        });
    }
});

app.get("/api/safety-brief/dont", (req, res) => {
    /* DONT by ID --> /api/safety-brief/dont?id=2 <-- */
    if (req.query.id) {
        console.log(req.query);
        const id = req.query.id;
        pool.query(`SELECT * FROM dont WHERE id = $1`, [id], (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send(`Error reading DONT table`);
            } else if (result.rows.length === 0) {
                console.log(`DONT with id ${id} was not found`);
                res.status(404).send(`DONT with id ${id} was not found`);
            } else {
                console.log(result.rows);
                res.json(result.rows);
            }
        });
    /* All DONTs in a brief ordered by category --> /api/safety-brief/dont?briefID <-- */
    } else if(req.query.briefID) {
        const briefID = req.query.briefID;
        pool.query(`SELECT dont.* FROM dont INNER JOIN brief_dont ON dont.id = brief_dont.dont_id WHERE brief_dont.brief_id = $1`, [briefID], (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send(`Error reading DONT or BRIEF_DONT tables`);
            } else if (result.rows.length === 0) {
                console.log(`DONT with brief_id ${id} was not found`);
                res.status(404).send(`DONT with brief_id ${id} was not found`);
            } else {
                console.log(result.rows);
                res.json(result.rows);
            }
        });
    /* All DONTs ordered by category --> /api/safety-brief/dont <-- */
    } else {
        pool.query(`SELECT * FROM dont ORDER BY cat`, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send(`Error reading DONT table`)
            } else if (result.rows.length === 0) {
                console.log(`DONT table not found`);
                res.status(404).send(`DONT table not found`);
            } else {
                console.log(result.rows);
                res.json(result.rows);
            }
        });
    }
});

app.listen(port, err => {
    if (err) {
        console.error(err);
    } else {
        console.log(`Server started on port ${port}`);
    }
});