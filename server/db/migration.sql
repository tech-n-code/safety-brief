DROP TABLE IF EXISTS usr CASCADE;
DROP TABLE IF EXISTS brief CASCADE;
DROP TABLE IF EXISTS dont;
DROP TABLE IF EXISTS brief_dont;
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
    title VARCHAR(25) NOT NULL,
    usr_id INT,
    CONSTRAINT fk_usr
        FOREIGN KEY(usr_id)
        REFERENCES usr(id)
        ON DELETE CASCADE
);

CREATE TABLE dont (
    id SERIAL PRIMARY KEY,
    cat VARCHAR(25) NOT NULL,
    descr VARCHAR(200) NOT NULL
);

CREATE TABLE brief_dont (
    brief_id INT,
    dont_id INT,
    checked BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (brief_id, dont_id),
    CONSTRAINT fk_brief
        FOREIGN KEY(brief_id)
        REFERENCES brief(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_dont
        FOREIGN KEY(dont_id)
        REFERENCES dont(id)
        ON DELETE CASCADE    
);

CREATE TABLE fave (
    usr_id INT,
    dont_id INT,
    PRIMARY KEY (usr_id, dont_id),
    CONSTRAINT fk_usr
        FOREIGN KEY(usr_id)
        REFERENCES usr(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_dont
        FOREIGN KEY(dont_id)
        REFERENCES dont(id)
        ON DELETE CASCADE
);