DROP TABLE IF EXISTS books;
CREATE TABLE IF NOT EXISTS books(
   id        INTEGER  NOT NULL PRIMARY KEY AUTOINCREMENT
  ,bookTitle VARCHAR(50) NOT NULL
  ,bookIsbn  VARCHAR(13) NOT NULL
  ,bookAuthor  VARCHAR(20) NOT NULL
  ,bookPrice     VARCHAR(4) NOT NULL
  ,bookGenre     VARCHAR(12) NOT NULL
);
INSERT INTO books(id,bookTitle,bookIsbn,bookAuthor,bookPrice,bookGenre) VALUES (1,'Murder on the Orient Express','9780007119318','Agatha Christie','109 kr','Crime/Thriller');
INSERT INTO books(id,bookTitle,bookIsbn,bookAuthor,bookPrice,bookGenre) VALUES (2,'A Good Girls Guide to Murder','9781405293181','Holly Jackson','109 kr','Crime/Thriller');
INSERT INTO books(id,bookTitle,bookIsbn,bookAuthor,bookPrice,bookGenre) VALUES (3,'Tarzan of the Apes','9780451531025','Edgar Rice Burroughs','89 kr','Adventure');
INSERT INTO books(id,bookTitle,bookIsbn,bookAuthor,bookPrice,bookGenre) VALUES (4,'Moby Dick','9780785839781','Herman Melville','120 kr','Adventure');
INSERT INTO books(id,bookTitle,bookIsbn,bookAuthor,bookPrice,bookGenre) VALUES (5,'Den lille prinsen','9789180238984','Antoine de Saint-Exupéry','179 kr','Childrens');
INSERT INTO books(id,bookTitle,bookIsbn,bookAuthor,bookPrice,bookGenre) VALUES (6,'Pokémon: Extra stora handboken','9789179772154','Pokemon TM','165 kr','Childrens');
INSERT INTO books(id,bookTitle,bookIsbn,bookAuthor,bookPrice,bookGenre) VALUES (7,'Icebreaker','9781398525689','Hannah Grace','145 kr','Romance');
INSERT INTO books(id,bookTitle,bookIsbn,bookAuthor,bookPrice,bookGenre) VALUES (8,'It Ends With Us','9781471156267','Colleen Hoover','145 kr','Romance');
INSERT INTO books(id,bookTitle,bookIsbn,bookAuthor,bookPrice,bookGenre) VALUES (9,'Percy Jackson and the Lightning Thief','9780141346809','Rick Riordan','106 kr','Sci-fi/Fantasy');
INSERT INTO books(id,bookTitle,bookIsbn,bookAuthor,bookPrice,bookGenre) VALUES (10,'Harry Potter and the Goblet of Fire','9781408855683','J. K. Rowling','146 kr','Sci-fi/Fantasy');


select * from books;