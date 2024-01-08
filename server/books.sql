DROP TABLE IF EXISTS books;
CREATE TABLE IF NOT EXISTS books(
   id        INTEGER  NOT NULL PRIMARY KEY AUTOINCREMENT
  ,bookTitle VARCHAR(50) NOT NULL
  ,bookIsbn  BIGINT(13) NOT NULL
  ,bookAuthor  VARCHAR(20) NOT NULL
  ,bookPrice     SMALLINT(4) NOT NULL
  ,bookGenre     VARCHAR(12) NOT NULL
);
INSERT INTO books(bookTitle,bookIsbn,bookAuthor,bookPrice,bookGenre) VALUES ('Murder on the Orient Express','9780007119318','Agatha Christie','109','Crime/Thriller');
INSERT INTO books(bookTitle,bookIsbn,bookAuthor,bookPrice,bookGenre) VALUES ('A Good Girls Guide to Murder','9781405293181','Holly Jackson','109','Crime/Thriller');
INSERT INTO books(bookTitle,bookIsbn,bookAuthor,bookPrice,bookGenre) VALUES ('Tarzan of the Apes','9780451531025','Edgar Rice Burroughs','89','Adventure');
INSERT INTO books(bookTitle,bookIsbn,bookAuthor,bookPrice,bookGenre) VALUES ('Moby Dick','9780785839781','Herman Melville','120','Adventure');
INSERT INTO books(bookTitle,bookIsbn,bookAuthor,bookPrice,bookGenre) VALUES ('Den lille prinsen','9789180238984','Antoine de Saint-Exupéry','179','Childrens');
INSERT INTO books(bookTitle,bookIsbn,bookAuthor,bookPrice,bookGenre) VALUES ('Pokémon: Extra stora handboken','9789179772154','Pokemon TM','165','Childrens');
INSERT INTO books(bookTitle,bookIsbn,bookAuthor,bookPrice,bookGenre) VALUES ('Icebreaker','9781398525689','Hannah Grace','145','Romance');
INSERT INTO books(bookTitle,bookIsbn,bookAuthor,bookPrice,bookGenre) VALUES ('It Ends With Us','9781471156267','Colleen Hoover','145','Romance');
INSERT INTO books(bookTitle,bookIsbn,bookAuthor,bookPrice,bookGenre) VALUES ('Percy Jackson and the Lightning Thief','9780141346809','Rick Riordan','106','Sci-fi/Fantasy');
INSERT INTO books(bookTitle,bookIsbn,bookAuthor,bookPrice,bookGenre) VALUES ('Harry Potter and the Goblet of Fire','9781408855683','J. K. Rowling','146','Sci-fi/Fantasy');


select * from books;
