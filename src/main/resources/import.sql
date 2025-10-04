INSERT INTO roles (name) VALUES ('ADMINISTRATOR');
INSERT INTO roles (name) VALUES ('CUSTOMER');

INSERT INTO permissions (name) VALUES('READ_ALL_PRODUCTS');
INSERT INTO permissions (name) VALUES('SAVE_ONE_PRODUCT');

INSERT INTO users (username, password, name, role_id) VALUES ('slazaro', '$2a$10$02PPGOr4nr8ahERpvFUwhuSsR0kieo.NM3LYMp/j2VznTBUaKejW6', 'Santiago Lázaro', 1);
INSERT INTO users (username, password, name, role_id) VALUES ('kvergel', '$2a$10$IKQFmEGVXXPTcppraNkQfepFh29GmWpD69sWnLruoYGlNpW4h6FLO', 'Kevin Vergel', 2);

INSERT INTO roles_permissions (role_id, permission_id) VALUES (1, 1);
INSERT INTO roles_permissions (role_id, permission_id) VALUES (1, 2);
INSERT INTO roles_permissions (role_id, permission_id) VALUES (2, 1);

INSERT INTO products (name, price) VALUES ('Smartphone',500.0);
INSERT INTO products (name, price) VALUES ('SmartWach',210.0);
INSERT INTO products (name, price) VALUES ('Tablet',300.0);

INSERT INTO products (name, price) VALUES ('Monitor IPS',420.0);
INSERT INTO products (name, price) VALUES ('GamePass',120.0);
INSERT INTO products (name, price) VALUES ('Xbox 360',310.0);

INSERT INTO products (name, price) VALUES ('Baterías',50.0);
INSERT INTO products (name, price) VALUES ('PS4',610.0);
INSERT INTO products (name, price) VALUES ('Teclado kamura502',90.0);

INSERT INTO products (name, price) VALUES ('Attack shark',70.0);
INSERT INTO products (name, price) VALUES ('Taza café',80.0);