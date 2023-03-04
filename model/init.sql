DROP TABLE IF EXISTS `items`; 

CREATE TABLE `items` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    `title` TEXT NOT NULL, 
    `description` TEXT NOT NULL,
    `image` TEXT NOT NULL, 
    `location` TEXT NOT NULL, 
    `contact` TEXT NOT NULL, 
    `available` boolean not null default 1, 
    `category` TEXT NOT NULL 
);

DROP TABLE IF EXISTS `users`; 

CREATE TABLE `users`(
	`id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
	`username` VARCHAR(255) NOT NULL, 
	`password` VARCHAR(255) NOT NULL
);