DROP TABLE IF EXISTS usr CASCADE;
DROP TABLE IF EXISTS brief CASCADE;
DROP TABLE IF EXISTS cue;
DROP TABLE IF EXISTS brief_cue;
DROP TABLE IF EXISTS fave;

CREATE TABLE usr (
    id SERIAL PRIMARY KEY,
    username VARCHAR(25) NOT NULL,
    email VARCHAR(25) NOT NULL,
    password VARCHAR(25) NOT NULL,
    pic_url TEXT
);

CREATE TABLE brief (
    id SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    usr_id INT,
    CONSTRAINT fk_usr
        FOREIGN KEY(usr_id)
        REFERENCES usr(id)
        ON DELETE CASCADE
);

CREATE TABLE cue (
    id SERIAL PRIMARY KEY,
    cat VARCHAR(25) NOT NULL,
    descr VARCHAR(200) NOT NULL
);

CREATE TABLE brief_cue (
    brief_id INT,
    cue_id INT,
    checked BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (brief_id, cue_id),
    CONSTRAINT fk_brief
        FOREIGN KEY(brief_id)
        REFERENCES brief(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_cue
        FOREIGN KEY(cue_id)
        REFERENCES cue(id)
        ON DELETE CASCADE    
);

CREATE TABLE fave (
    usr_id INT,
    cue_id INT,
    PRIMARY KEY (usr_id, cue_id),
    CONSTRAINT fk_usr
        FOREIGN KEY(usr_id)
        REFERENCES usr(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_cue
        FOREIGN KEY(cue_id)
        REFERENCES cue(id)
        ON DELETE CASCADE
);