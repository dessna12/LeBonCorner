CREATE DATABASE IF NOT EXISTS leboncorner;
USE leboncorner;

CREATE TABLE User (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    creation_date DEFAULT NOW DATE NOT NULL
);


CREATE TABLE Category (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL
);


CREATE TABLE Post (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    price DECIMAL(10,2),
    location VARCHAR(150),
    publication_date DATE,
    user_id INT NOT NULL,
    category_id INT,
    FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES Category(id) ON DELETE SET NULL
);
CREATE INDEX idx_post_user ON Post(user_id);
CREATE INDEX idx_post_category ON Post(category_id);


CREATE TABLE Image (
    id INT AUTO_INCREMENT PRIMARY KEY,
    url VARCHAR(255) NOT NULL,
    user_id INT,
    post_id INT,
    FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE SET NULL,
    FOREIGN KEY (post_id) REFERENCES Post(id) ON DELETE CASCADE
);
CREATE INDEX idx_image_post ON Image(post_id);
CREATE INDEX idx_image_user ON Image(user_id);


CREATE TABLE Favorite (
    id_user INT NOT NULL,
    id_post INT NOT NULL,
    PRIMARY KEY (id_user, id_post), 
    FOREIGN KEY (id_user) REFERENCES User(id) ON DELETE CASCADE,
    FOREIGN KEY (id_post) REFERENCES Post(id) ON DELETE CASCADE
);
CREATE INDEX idx_favorite_post ON Favorite(id_post);

CREATE TABLE Message (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT NOT NULL,
    send_date DATE,
    id_expeditor INT NOT NULL,
    id_sender INT NOT NULL,
    id_post INT,
    FOREIGN KEY (id_expeditor) REFERENCES User(id) ON DELETE CASCADE,
    FOREIGN KEY (id_sender) REFERENCES User(id) ON DELETE CASCADE,
    FOREIGN KEY (id_post) REFERENCES Post(id) ON DELETE SET NULL
);
CREATE INDEX idx_message_expeditor ON Message(id_expeditor);
CREATE INDEX idx_message_sender ON Message(id_sender);
CREATE INDEX idx_message_post ON Message(id_post);






