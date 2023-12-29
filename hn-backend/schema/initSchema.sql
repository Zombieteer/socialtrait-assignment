CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    rank text,
    title text,
    link text,
    site text,
    hasUpvote boolean,
    points text,
    author text,
    time text,
    comments text,
    createdAt timestamp with time zone default now()
);