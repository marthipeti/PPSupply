INSERT INTO `PRODUCT` (`NAME`, `QUANTITY`, `DESCRIPTION`, `IMAGE`) VALUES ('TOLL', 10, 'ASD', 'pen.jpg');
INSERT INTO `PRODUCT` (`NAME`, `QUANTITY`, `DESCRIPTION`, `IMAGE`) VALUES ('CERUZA', 50, 'SDF', 'pencil.jpg');

INSERT INTO `USER` (`NAME`, `EMAIL`, `USER_NAME`, `PASSWORD`, `LAST_LOGIN`, `ROLE`) VALUES ('admin', 'abcdc@gmail.hu', 'admin', '$2a$10$lW9Q6thFdccwPiRyOmQmreEtNhERoYGEsYKRL3uV97Q9u2ZGKxusW', null, 'ROLE_ADMIN');
INSERT INTO `USER` (`NAME`, `EMAIL`, `USER_NAME`, `PASSWORD`, `LAST_LOGIN`, `ROLE`) VALUES ('Gabor', 'elte@gmail.hu', 'felh', '$2a$10$lW9Q6thFdccwPiRyOmQmreEtNhERoYGEsYKRL3uV97Q9u2ZGKxusW', null, 'ROLE_USER');

INSERT INTO `TAG` (`TEXT`) VALUES ('AKCIOS');

INSERT INTO `PRODUCT_TAGS` (`PRODUCTS_ID`, `TAGS_ID`) VALUES (1,1);