DROP TABLE IF EXISTS items; 

CREATE TABLE items (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    title VARCHAR(100) NOT NULL, 
    description TEXT NOT NULL,
    image TEXT NOT NULL, 
    location VARCHAR(50) NOT NULL, 
    contact VARCHAR(100) NOT NULL, 
    available boolean not null default 1
)