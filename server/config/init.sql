-- Database: FilmScore
DROP DATABASE IF EXISTS "FilmScore";

CREATE DATABASE "FilmScore"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'es_ES.UTF-8'
    LC_CTYPE = 'es_ES.UTF-8'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    TEMPLATE = template0;

\c "FilmScore"

-- Schema: model
DROP SCHEMA IF EXISTS model CASCADE;

CREATE SCHEMA IF NOT EXISTS model
    AUTHORIZATION postgres;

-- Table: model.Content
CREATE TABLE IF NOT EXISTS model."Content"
(
    id varchar NOT NULL,
    title varchar,
    genere varchar,
    description varchar,
    duration integer,
    rate double precision,
    director varchar,
    poster varchar,
    CONSTRAINT "Content_pkey" PRIMARY KEY (id)
);

-- Table: model.User
CREATE TABLE IF NOT EXISTS model."User"
(
    email varchar NOT NULL,
    login varchar NOT NULL,
    password varchar NOT NULL,
    "firstName" varchar NOT NULL,
    "lastName" varchar NOT NULL,
    "birthYear" integer NOT NULL,
    CONSTRAINT "User_pkey" PRIMARY KEY (email)
);

-- Table: model.Review
CREATE TABLE IF NOT EXISTS model."Review"
(
    id varchar NOT NULL,
    author varchar,
    rate double precision,
    content varchar,
    "User_fk" varchar REFERENCES model."User"(email),
    "Content_fkey" varchar REFERENCES model."Content"(id),
    CONSTRAINT "Review_pkey" PRIMARY KEY (id)
);

-- Insert initial movies
INSERT INTO model."Content" (id, title, genere, description, duration, rate, director, poster) VALUES
(1, 'The Shawshank Redemption', 'Drama', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 142, 9.3, 'Frank Darabont', 'https://i.ebayimg.com/images/g/4goAAOSwMyBe7hnQ/s-l1200.webp'),
(2, 'The Dark Knight', 'Action, Crime, Drama', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 152, 9.0, 'Christopher Nolan', 'https://i.ebayimg.com/images/g/yokAAOSw8w1YARbm/s-l1200.jpg'),
(3, 'Inception', 'Action, Adventure, Sci-Fi', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 148, 8.8, 'Christopher Nolan', 'https://m.media-amazon.com/images/I/91Rc8cAmnAL._AC_UF1000,1000_QL80_.jpg'),
(4, 'Pulp Fiction', 'Crime, Drama', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 154, 8.9, 'Quentin Tarantino', 'https://www.themoviedb.org/t/p/original/vQWk5YBFWF4bZaofAbv0tShwBvQ.jpg'),
(5, 'Forrest Gump', 'Drama, Romance', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 142, 8.8, 'Robert Zemeckis', 'https://i.ebayimg.com/images/g/qR8AAOSwkvRZzuMD/s-l1600.jpg'),
(6, 'Gladiator', 'Action, Adventure, Drama', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 155, 8.5, 'Ridley Scott', 'https://img.fruugo.com/product/0/60/14417600_max.jpg'),
(7, 'The Matrix', 'Action, Sci-Fi', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 136, 8.7, 'Lana Wachowski', 'https://i.ebayimg.com/images/g/QFQAAOSwAQpfjaA6/s-l1200.jpg'),
(8, 'Interstellar', 'Adventure, Drama, Sci-Fi', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 169, 8.6, 'Christopher Nolan', 'https://m.media-amazon.com/images/I/91obuWzA3XL._AC_UF1000,1000_QL80_.jpg'),
(9, 'The Lord of the Rings: The Return of the King', 'Action, Adventure, Drama', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 201, 8.9, 'Peter Jackson', 'https://m.media-amazon.com/images/I/71X6YzwV0gL._AC_SL1000_.jpg'),
(10, 'The Lion King', 'Animation, Adventure, Drama', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 88, 8.5, 'Roger Allers, Rob Minkoff', 'https://m.media-amazon.com/images/I/81BMmrwSFOL._AC_UF1000,1000_QL80_.jpg'),
(11, 'The Avengers', 'Action, Adventure, Sci-Fi', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 143, 8.0, 'Joss Whedon', 'https://img.fruugo.com/product/7/41/14532417_max.jpg'),
(12, 'Jurassic Park', 'Adventure, Sci-Fi', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 127, 8.1, 'Steven Spielberg', 'https://vice-press.com/cdn/shop/products/Jurassic-Park-Editions-poster-florey.jpg?v=1654518755&width=1024'),
(13, 'Titanic', 'Drama, Romance', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 195, 7.8, 'James Cameron', 'https://i.pinimg.com/originals/42/42/65/4242658e6f1b0d6322a4a93e0383108b.png'),
(14, 'The Social Network', 'Biography, Drama', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 120, 7.7, 'David Fincher', 'https://i.pinimg.com/originals/7e/37/b9/7e37b994b613e94cba64f307b1983e39.jpg'),
(15, 'Avatar', 'Action, Adventure, Fantasy', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 162, 7.8, 'James Cameron', 'https://i.etsystatic.com/35681979/r/il/dfe3ba/3957859451/il_fullxfull.3957859451_h27r.jpg');

-- Set ownership
ALTER TABLE model."Content" OWNER to postgres;
ALTER TABLE model."User" OWNER to postgres;
ALTER TABLE model."Review" OWNER to postgres;