-- import.sql

INSERT INTO roles (name) VALUES ('ROLE_ADMIN');
INSERT INTO roles (name) VALUES ('ROLE_CLIENTE');
INSERT INTO roles (name) VALUES ('ROLE_EMPLEADO');

INSERT INTO users (username, password, email) VALUES ('admin', '$2a$10$3uz5MXAJkIX4Gqg4jyYmMOy5jMMUs45yZzMcz2MDo2wy6r7jl/tUS', 'admin@gmail.com');
INSERT INTO users (username, password, email) VALUES ('cliente', '$2a$10$3uz5MXAJkIX4Gqg4jyYmMOy5jMMUs45yZzMcz2MDo2wy6r7jl/tUS', 'cliente@gmail.com');
INSERT INTO users (username, password, email) VALUES ('emple', '$2a$10$3uz5MXAJkIX4Gqg4jyYmMOy5jMMUs45yZzMcz2MDo2wy6r7jl/tUS', 'emple@gmail.com');

INSERT INTO user_roles (user_id, role_id) VALUES (1, 1);
INSERT INTO user_roles (user_id, role_id) VALUES (2, 2);
INSERT INTO user_roles (user_id, role_id) VALUES (3, 3);

INSERT INTO mesas (codigoQR, estado, created_at, updated_at) VALUES ('QR001', 'DISPONIBLE', NOW(), NOW());
INSERT INTO mesas (codigoQR, estado, created_at, updated_at) VALUES ('QR002', 'OCUPADA', NOW(), NOW());
INSERT INTO mesas (codigoQR, estado, created_at, updated_at) VALUES ('QR003', 'DISPONIBLE', NOW(), NOW());
INSERT INTO mesas (codigoQR, estado, created_at, updated_at) VALUES ('QR004', 'OCUPADA', NOW(), NOW());
INSERT INTO mesas (codigoQR, estado, created_at, updated_at) VALUES ('QR005', 'RESERVADA', NOW(), NOW());

INSERT INTO productos (nombre, descripcion, precio, imagen, created_at, updated_at) VALUES ('Coca Cola', 'Bebida gaseosa', 1.50, 'coca_cola.jpg', NOW(), NOW());
INSERT INTO productos (nombre, descripcion, precio, imagen, created_at, updated_at) VALUES ('Tercio', 'Cerveza', 2.50, 'cruzcampo.jpg', NOW(), NOW());
INSERT INTO productos (nombre, descripcion, precio, imagen, created_at, updated_at) VALUES ('Croquetas', 'Entrante caliente', 3.50, 'croquetas.jpg', NOW(), NOW());
INSERT INTO productos (nombre, descripcion, precio, imagen, created_at, updated_at) VALUES ('Serranito', 'Bocadillo de Jamón y Lomo', 4.50, 'serranito.jpg', NOW(), NOW());
INSERT INTO productos (nombre, descripcion, precio, imagen, created_at, updated_at) VALUES ('Brownie', 'Postre', 3.00, 'brownie.jpg', NOW(), NOW());
