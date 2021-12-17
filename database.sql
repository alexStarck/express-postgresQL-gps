
create TABLE person(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    surname VARCHAR(255)
);

create TABLE gps(
    id SERIAL PRIMARY KEY,
    stamp TIMESTAMP WITH TIME ZONE,
    location POINT ,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES person (id)
);