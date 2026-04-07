USE leboncorner;

INSERT INTO User (name, email, password, creation_date) VALUES
('Alice', 'alice@mail.com', 'hashed_pwd_1', '2024-01-01'),
('Bob', 'bob@mail.com', 'hashed_pwd_2', '2024-01-05'),
('Charlie', 'charlie@mail.com', 'hashed_pwd_3', '2024-02-01');

INSERT INTO Category (title) VALUES
('Immobilier'),
('Véhicules'),
('Multimédia'),
('Maison');

INSERT INTO Post (title, description, price, location, publication_date, user_id, category_id) VALUES
('Appartement T2', 'Bel appart centre ville', 120000.00, 'Paris', '2024-03-01', 1, 1),
('Voiture occasion', 'Peugeot 208 bon état', 8000.00, 'Lyon', '2024-03-02', 2, 2),
('Télévision 4K', 'TV Samsung 55 pouces', 500.00, 'Marseille', '2024-03-03', 1, 3),
('Canapé', 'Canapé 3 places', 200.00, 'Toulouse', '2024-03-04', 3, 4);

INSERT INTO Image (url, user_id, post_id) VALUES
('img1.jpg', 1, 1),
('img2.jpg', 2, 2),
('img3.jpg', 1, 3),
('img4.jpg', 3, 4),
('img5.jpg', 1, 1);

INSERT INTO Favorite (id_user, id_post) VALUES
(1, 2),
(1, 3),
(2, 1),
(3, 1),
(3, 2);

INSERT INTO Message (content, send_date, id_expeditor, id_sender, id_post) VALUES
('Bonjour, toujours dispo ?', '2024-03-05', 2, 1, 1),
('Oui, toujours disponible', '2024-03-05', 1, 2, 1),
('Prix négociable ?', '2024-03-06', 3, 2, 2),
('Oui, un peu', '2024-03-06', 2, 3, 2),
('Intéressé par la TV', '2024-03-07', 3, 1, 3);