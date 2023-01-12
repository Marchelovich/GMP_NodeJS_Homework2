create table users
(
    id        serial
        primary key,
    login     varchar(255) not null,
    password  varchar(255) not null,
    age INTEGER NOT NULL CHECK (age >= 13 AND age <= 130),
    isDeleted boolean default false
);

INSERT INTO users (login, age, password, isDeleted)
VALUES
    ('user1', floor(random() * (130 - 13 + 1) + 13), 'password1',DEFAULT),
    ('user2', floor(random() * (130 - 13 + 1) + 13), 'password2',DEFAULT),
    ('user3', floor(random() * (130 - 13 + 1) + 13), 'password3',DEFAULT),
    ('user4', floor(random() * (130 - 13 + 1) + 13), 'password4',true),
    ('user5', floor(random() * (130 - 13 + 1) + 13), 'password5',DEFAULT),
    ('user6', floor(random() * (130 - 13 + 1) + 13), 'password6',DEFAULT),
    ('user7', floor(random() * (130 - 13 + 1) + 13), 'password7',DEFAULT),
    ('user8', floor(random() * (130 - 13 + 1) + 13), 'password8',true),
    ('user9', floor(random() * (130 - 13 + 1) + 13), 'password9',DEFAULT),
    ('user10', floor(random() * (130 - 13 + 1) + 13), 'password10',DEFAULT);

