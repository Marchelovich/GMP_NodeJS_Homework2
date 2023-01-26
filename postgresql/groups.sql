CREATE TYPE permission AS ENUM ('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES');

CREATE TABLE IF NOT EXISTS groups (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    permissions permission[] NOT NULL
);

CREATE TABLE IF NOT EXISTS users_groups (
    group_id INTEGER REFERENCES groups(id),
    user_id INTEGER REFERENCES users(id),
    PRIMARY KEY(group_id, user_id),
    FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO groups (name, permissions)
VALUES
    ('group1', ARRAY['READ', 'WRITE']::permission[]),
    ('group2', ARRAY['DELETE', 'WRITE']::permission[]),
    ('group3', ARRAY['DELETE', 'SHARE']::permission[]),
    ('group4', ARRAY['SHARE', 'WRITE']::permission[]),
    ('group5', ARRAY['READ', 'UPLOAD_FILES']::permission[]),
    ('group6', ARRAY['READ', 'UPLOAD_FILES']::permission[]),
    ('group7', ARRAY['READ', 'DELETE']::permission[]),
    ('group8', ARRAY['READ', 'SHARE']::permission[]),
    ('group9', ARRAY['DELETE', 'UPLOAD_FILES']::permission[]),
    ('group10', ARRAY['SHARE', 'WRITE']::permission[]);
