import express from "express";
import dotenv from "dotenv";
import pg from "pg";
import cors from "cors";

const { Pool } = pg;

const app = express();

dotenv.config();
const port = process.env.PORT || 3000;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10
});

app.use(express.json());

app.use(cors());

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
 * CUE by ID
 * /api/safety-brief/cue?id=2
 */
app.get("/api/safety-brief/cue", (req, res) => {
    if (req.query.id) {
        console.log(req.query);
        const id = req.query.id;
        pool.query(`SELECT * FROM cue WHERE id = $1`, [id], (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send(`Error reading CUE table`);
            } else if (result.rows.length === 0) {
                console.log(`CUE with id ${id} was not found`);
                res.status(404).send(`CUE with id ${id} was not found`);
            } else {
                console.log(result.rows);
                res.json(result.rows);
            }
        });
    /**
     * All CUEs in a BRIEF ordered by category
     * /api/safety-brief/cue?briefID=3
     */
    } else if(req.query.briefID) {
        const briefID = req.query.briefID;
        pool.query(`SELECT cue.*, brief_cue.checked FROM cue INNER JOIN brief_cue ON cue.id = brief_cue.cue_id WHERE brief_cue.brief_id = $1`, [briefID], (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send(`Error reading INNER JOINT tables`);
            } else if (result.rows.length === 0) {
                console.log(`CUEs with brief_id ${briefID} not found`);
                res.status(404).send(`CUEs with brief_id ${briefID} not found`);
            } else {
                console.log(result.rows);
                res.json(result.rows);
            }
        });
    /**
     * All CUEs ordered by category
     * /api/safety-brief/cue
     */
    } else {
        pool.query(`SELECT * FROM cue ORDER BY cat`, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send(`Error reading CUE table`)
            } else if (result.rows.length === 0) {
                console.log(`CUE table not found`);
                res.status(404).send(`CUE table not found`);
            } else {
                console.log(result.rows);
                res.json(result.rows);
            }
        });
    }
});

/**
 * All categories in CUE table
 * /api/safety-brief/cue/cat
 */
app.get("/api/safety-brief/cue/cat", (req, res) => {
    console.log(req.query);
    pool.query(`SELECT cat, COUNT(*) AS qty FROM cue GROUP BY cat`, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send(`Error reading CUE table`);
        } else if (result.rows.length === 0) {
            console.log(`CUE table not found`);
            res.status(404).send(`CUE table not found`);
        } else {
            console.log(result.rows);
            res.json(result.rows);
        }
    });
});

/**
 * Add x-ammount of random CUEs to BRIEF from category
 * /api/safety-brief/brief_cue
 */
app.post("/api/safety-brief/brief_cue", (req, res) => {
    const { brief_id, cat, num_cues } = req.body;
    pool.query("INSERT INTO brief_cue (brief_id, cue_id, checked) SELECT $1, id, FALSE FROM cue WHERE cat = $2 AND id NOT IN (SELECT cue_id FROM brief_cue WHERE brief_id = $1) ORDER BY RANDOM() LIMIT $3 RETURNING *", [brief_id, cat, num_cues], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error adding random CUEs to BRIEF");
        } else {
            console.log(result.rows);
            console.log("Added random CUEs to BRIEF successfully");
            res.status(200).json(result.rows);
        }
    });
});

/**
 * Update CUE in a BRIEF by <usr_id/cue_id>
 * /api/safety-brief/brief_cue/1/3
 */
app.patch("/api/safety-brief/brief_cue/:briefID/:cueID", (req, res) => {
    const { briefID, cueID } = req.params;
    const { checked } = req.body;
    pool.query("UPDATE brief_cue SET checked = COALESCE($1, checked) WHERE brief_id = $2 AND cue_id = $3 RETURNING *", [checked || false, briefID, cueID], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error updating cheched CUEs in BRIEF");
        } else {
            console.log(result.rows);
            console.log(`CUE id ${result.rows[0].cue_id} in BRIEF id ${result.rows[0].brief_id} check is now: ${result.rows[0].checked}`);
            res.status(200).json(result.rows);
        }
    });
});

/**
 * Delete CUE from BRIEF by <brief_id/cue_id>
 * /api/safety-brief/brief_cue/3/10
 */
app.delete("/api/safety-brief/brief_cue/:briefID/:cueID", (req, res) => {
    const { briefID, cueID } = req.params;
    pool.query("DELETE FROM brief_cue WHERE brief_id = $1 AND cue_id = $2 RETURNING *", [briefID, cueID], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error deleting CUE");
        } else {
            console.log(result.rows);
            console.log(`CUE id ${result.rows[0].cue_id} deleted from BRIEF id ${result.rows[0].brief_id} successfully`);
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
    pool.query("SELECT fave.cue_id, cue.cat, cue.descr FROM fave JOIN cue ON fave.cue_id = cue.id WHERE fave.usr_id = $1", [id], (err, result) => {
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
    const { usr_id, cue_id } = req.body;
    pool.query("INSERT INTO fave (usr_id, cue_id) SELECT $1, $2 WHERE NOT EXISTS (SELECT 1 FROM fave WHERE usr_id = $1 AND cue_id = $2) RETURNING *", [usr_id, cue_id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error adding FAVE");
        } else {
            console.log(result.rows);
            console.log(`FAVE for cue_id ${result.rows[0].cue_id} added to USER id ${result.rows[0].usr_id} successfully`);
            res.status(200).json(result.rows);
        }
    });
});

/**
 * Delete FAVE by <usr_id/cue_id>
 * /api/safety-brief/fave/2/7
 */
app.delete("/api/safety-brief/fave/:usrID/:cueID", (req, res) => {
    const { usrID, cueID } = req.params;
    pool.query("DELETE FROM fave WHERE usr_id = $1 AND cue_id = $2 RETURNING *", [usrID, cueID], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error deleting FAVE");
        } else {
            console.log(result.rows);
            console.log(`FAVE for cue_id ${result.rows[0].cue_id} removed from USER id ${result.rows[0].usr_id} successfully`);
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