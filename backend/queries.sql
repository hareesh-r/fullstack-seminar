-- Changing the password for the 'root' user
-- If you want to change the password to something else you can use the same command
ALTER USER 'root'@'localhost' IDENTIFIED BY 'password';

-- Creating a new database named 'test'
CREATE DATABASE `test`;

-- Switching to the 'test' database
USE test;

-- Creating a table named 'books' within the 'test' database
CREATE TABLE `test`.`books`(
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `price` INT NOT NULL,
  `desc` VARCHAR(255) NOT NULL,
  `cover` VARCHAR(1000) NULL,
  PRIMARY KEY (`id`)
);

-- Retrieving all records from the 'books' table
SELECT * FROM books limit 20;
