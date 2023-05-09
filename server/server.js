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

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});

app.options('*', (req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
    res.status(200).send();
});


/**
 * USER by ID
 * /api/safety-brief/usr?id=2
 */
app.get("/api/safety-brief/usr", (req, res) => {
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
    /**
     * All USERs ordered by username
     * /api/safety-brief/usr
     */
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

/**
 * Create USER
 * /api/safety-brief/usr
 */
app.post("/api/safety-brief/usr", (req, res) => {
    const { username, email, password, pic_url } = req.body;
    pool.query("INSERT INTO usr (username, email, password, pic_url) VALUES ($1, $2, $3, $4) RETURNING *", [username, email, password, pic_url], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error creating USER");
        } else {
            console.log(result.rows);
            console.log("USER created successfully");
            res.status(200).json(result.rows);
        }
    });
});

/**
 * Delete USER by ID
 * /api/safety-brief/brief/2
 */
app.delete("/api/safety-brief/usr/:id", (req, res) => {
    const id = req.params.id;
    pool.query("DELETE FROM usr WHERE id = $1 RETURNING *", [id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error deleting USER");
        } else {
            console.log(result.rows);
            console.log(`USER with id ${result.rows[0].id} deleted successfully`); //'undefined'?
            res.status(200).json(result.rows);
        }
    });
});

/**
 * BRIEF by ID
 * /api/safety-brief/brief?id=2
 */
app.get("/api/safety-brief/brief", (req, res) => {
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
    /**
     * All BRIEFs under a usr_id
     * /api/safety-brief/brief?usrID=2
     */
    } else if (req.query.usrID) {
        const usrID = req.query.usrID;
        pool.query(`SELECT * FROM brief WHERE usr_id = $1`, [usrID], (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send(`Error reading BRIEF table`);
            } else if (result.rows.length === 0) {
                console.log(`Brief for usr_id ${usrID} was not found`);
                res.status(404).send(`Brief for usr_id ${usrID} was not found`);
            } else {
                console.log(result.rows);
                res.json(result.rows);
            }
        });
    /**
     * All BRIEFs ordered by title
     * /api/safety-brief/brief
     */
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

/**
 * Create BRIEF
 * /api/safety-brief/brief
 */
app.post("/api/safety-brief/brief", (req, res) => {
    const { title, usr_id } = req.body;
    pool.query("INSERT INTO brief (title, usr_id) VALUES ($1, $2) RETURNING *", [title, usr_id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error creating BRIEF");
        } else {
            console.log(result.rows);
            console.log("BRIEF created successfully");
            res.status(200).json(result.rows);
        }
    });
});

/**
 * Delete BRIEF by ID
 * /api/safety-brief/brief/2
 */
app.delete("/api/safety-brief/brief/:id", (req, res) => {
    const id = req.params.id;
    pool.query("DELETE FROM brief WHERE id = $1 RETURNING *", [id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error deleting BRIEF");
        } else {
            console.log(result.rows);
            console.log(`BRIEF with id ${result.rows[0].id} deleted successfully`); //'undefined'?
            res.status(200).json(result.rows);
        }
    });
});

/**
 * DONT by ID
 * /api/safety-brief/dont?id=2
 */
app.get("/api/safety-brief/dont", (req, res) => {
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
    /**
     * All DONTs in a BRIEF ordered by category
     * /api/safety-brief/dont?briefID=3
     */
    } else if(req.query.briefID) {
        const briefID = req.query.briefID;
        pool.query(`SELECT dont.*, brief_dont.checked FROM dont INNER JOIN brief_dont ON dont.id = brief_dont.dont_id WHERE brief_dont.brief_id = $1`, [briefID], (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send(`Error reading INNER JOINT tables`);
            } else if (result.rows.length === 0) {
                console.log(`DONTs with brief_id ${briefID} not found`);
                res.status(404).send(`DONTs with brief_id ${briefID} not found`);
            } else {
                console.log(result.rows);
                res.json(result.rows);
            }
        });
    /**
     * All DONTs ordered by category
     * /api/safety-brief/dont
     */
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

/**
 * All categories in DONT table
 * /api/safety-brief/dont/cat
 */
app.get("/api/safety-brief/dont/cat", (req, res) => {
    console.log(req.query);
    pool.query(`SELECT cat, COUNT(*) AS qty FROM dont GROUP BY cat`, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send(`Error reading DONT table`);
        } else if (result.rows.length === 0) {
            console.log(`DONT table not found`);
            res.status(404).send(`DONT table not found`);
        } else {
            console.log(result.rows);
            res.json(result.rows);
        }
    });
});

/**
 * Add x-ammount of random DONTs to BRIEF from category
 * /api/safety-brief/brief_dont
 */
app.post("/api/safety-brief/brief_dont", (req, res) => {
    const { brief_id, cat, num_donts } = req.body;
    pool.query("INSERT INTO brief_dont (brief_id, dont_id, checked) SELECT $1, id, FALSE FROM dont WHERE cat = $2 AND id NOT IN (SELECT dont_id FROM brief_dont WHERE brief_id = $1) ORDER BY RANDOM() LIMIT $3 RETURNING *", [brief_id, cat, num_donts], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error adding random DONTs to BRIEF");
        } else {
            console.log(result.rows);
            console.log("Added random DONTs to BRIEF successfully");
            res.status(200).json(result.rows);
        }
    });
});

/**
 * Update DONT in a BRIEF by <usr_id/dont_id>
 * /api/safety-brief/brief_dont/1/3
 */
app.patch("/api/safety-brief/brief_dont/:briefID/:dontID", (req, res) => {
    const { briefID, dontID } = req.params;
    const { checked } = req.body;
    pool.query("UPDATE brief_dont SET checked = COALESCE($1, checked) WHERE brief_id = $2 AND dont_id = $3 RETURNING *", [checked || false, briefID, dontID], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error updating cheched DONTs in BRIEF");
        } else {
            console.log(result.rows);
            console.log(`DONT id ${result.rows[0].dont_id} in BRIEF id ${result.rows[0].brief_id} check is now: ${result.rows[0].checked}`);
            res.status(200).json(result.rows);
        }
    });
});

/**
 * Delete DONT from BRIEF by <brief_id/dont_id>
 * /api/safety-brief/brief_dont/3/10
 */
app.delete("/api/safety-brief/brief_dont/:briefID/:dontID", (req, res) => {
    const { briefID, dontID } = req.params;
    pool.query("DELETE FROM brief_dont WHERE brief_id = $1 AND dont_id = $2 RETURNING *", [briefID, dontID], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error deleting DONT");
        } else {
            console.log(result.rows);
            console.log(`DONT id ${result.rows[0].dont_id} deleted from BRIEF id ${result.rows[0].brief_id} successfully`);
            res.status(200).json(result.rows);
        }
    });
});

/**
 * All FAVEs for a usr_id
 * /api/safety-brief/fave?usrID=2
 */
app.get("/api/safety-brief/fave", (req, res) => {
    const id = req.query.usrID;
    pool.query("SELECT fave.dont_id, dont.cat, dont.descr FROM fave JOIN dont ON fave.dont_id = dont.id WHERE fave.usr_id = $1", [id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error reading FAVE table");
        } else if (result.rows.length === 0) {
            console.log(`User with id ${id} has no FAVEs`);
            res.status(404).send(`User with id ${id} was not found`);
        } else {
            console.log(result.rows);
            res.json(result.rows);
        }
    });
});

/**
 * Add FAVE
 * /api/safety-brief/fave
 */
app.post("/api/safety-brief/fave", (req, res) => {
    const { usr_id, dont_id } = req.body;
    pool.query("INSERT INTO fave (usr_id, dont_id) SELECT $1, $2 WHERE NOT EXISTS (SELECT 1 FROM fave WHERE usr_id = $1 AND dont_id = $2) RETURNING *", [usr_id, dont_id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error adding FAVE");
        } else {
            console.log(result.rows);
            console.log(`FAVE for dont_id ${result.rows[0].dont_id} added to USER id ${result.rows[0].usr_id} successfully`);
            res.status(200).json(result.rows);
        }
    });
});

/**
 * Delete FAVE by <usr_id/dont_id>
 * /api/safety-brief/fave/2/7
 */
app.delete("/api/safety-brief/fave/:usrID/:dontID", (req, res) => {
    const { usrID, dontID } = req.params;
    pool.query("DELETE FROM fave WHERE usr_id = $1 AND dont_id = $2 RETURNING *", [usrID, dontID], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error deleting FAVE");
        } else {
            console.log(result.rows);
            console.log(`FAVE for dont_id ${result.rows[0].dont_id} removed from USER id ${result.rows[0].usr_id} successfully`);
            res.status(200).json(result.rows);
        }
    });
});

app.listen(port, err => {
    if (err) {
        console.error(err);
    } else {
        console.log(`Server started on port ${port}`);
    }
});