CREATE EXTENTION IF NOT EXISTS "uuid-ossp";

CREATE TABLE userDetails(
uId uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
userName TEXT NOT NULL,
userEmail TEXT NOT NULL,
userPassword TEXT NOT NULL);


SELECT * FROM userDetails;

INSERT INTO userDetails (userName,userEmail,userPassword)VALUES("Root Admin","admin@gmail.com","pass123")