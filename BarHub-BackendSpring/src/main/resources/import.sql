INSERT INTO users (username, password, email) VALUES ('admin', '$2a$10$plfR9bHhR4hb0O1zo3x2E.PTSc5IcWwxl3ud4qYUmne8eDYdubuK2', 'admin@gmail.com');
INSERT INTO users (username, password, email) VALUES ('cliente', '$2a$10$plfR9bHhR4hb0O1zo3x2E.PTSc5IcWwxl3ud4qYUmne8eDYdubuK2', 'cliente@gmail.com');
INSERT INTO users (username, password, email) VALUES ('emple', '$2a$10$plfR9bHhR4hb0O1zo3x2E.PTSc5IcWwxl3ud4qYUmne8eDYdubuK2', 'emple@gmail.com');

INSERT INTO roles (name) VALUES ('ROLE_ADMIN');
INSERT INTO roles (name) VALUES ('ROLE_CLIENTE');
INSERT INTO roles (name) VALUES ('ROLE_EMPLEADO');

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

INSERT INTO pedidos (id_user, id_mesa, fecha, estado, precio_total, created_at, updated_at) VALUES (1, 1, '2024-03-14', 'PENDIENTE', 3.00, NOW(), NOW());
INSERT INTO pedidos (id_user, id_mesa, fecha, estado, precio_total, created_at, updated_at) VALUES (1, 2, '2024-03-14', 'PENDIENTE', 5.00, NOW(), NOW());
INSERT INTO pedidos (id_user, id_mesa, fecha, estado, precio_total, created_at, updated_at) VALUES (2, 3, '2024-03-14', 'PREPARADO', 3.50, NOW(), NOW());
INSERT INTO pedidos (id_user, id_mesa, fecha, estado, precio_total, created_at, updated_at) VALUES (3, 4, '2024-03-14', 'PREPARADO', 13.50, NOW(), NOW());
INSERT INTO pedidos (id_user, id_mesa, fecha, estado, precio_total, created_at, updated_at) VALUES (3, 5, '2024-03-14', 'SERVIDO', 6.00, NOW(), NOW());

INSERT INTO detalles_pedidos (id_pedido, id_producto, cantidad, precio_unitario) VALUES (1, 1, 2, 1.50);
INSERT INTO detalles_pedidos (id_pedido, id_producto, cantidad, precio_unitario) VALUES (2, 2, 2, 2.50);
INSERT INTO detalles_pedidos (id_pedido, id_producto, cantidad, precio_unitario) VALUES (3, 3, 1, 3.50);
INSERT INTO detalles_pedidos (id_pedido, id_producto, cantidad, precio_unitario) VALUES (4, 4, 3, 4.50);
INSERT INTO detalles_pedidos (id_pedido, id_producto, cantidad, precio_unitario) VALUES (5, 5, 2, 3.00);

INSERT INTO pagos (id_pedido, metodo_pago, estado_pago, total, fecha_pago, created_at, updated_at) VALUES (1, 'tarjeta', 'completado', 3.00, '2024-03-14', NOW(), NOW());
INSERT INTO pagos (id_pedido, metodo_pago, estado_pago, total, fecha_pago, created_at, updated_at) VALUES (2, 'tarjeta', 'completado', 5.00, '2024-03-14', NOW(), NOW());
INSERT INTO pagos (id_pedido, metodo_pago, estado_pago, total, fecha_pago, created_at, updated_at) VALUES (3, 'efectivo', 'rechazado', 3.50, '2024-03-14', NOW(), NOW());
INSERT INTO pagos (id_pedido, metodo_pago, estado_pago, total, fecha_pago, created_at, updated_at) VALUES (4, 'tarjeta', 'completado', 13.50, '2024-03-14', NOW(), NOW());
INSERT INTO pagos (id_pedido, metodo_pago, estado_pago, total, fecha_pago, created_at, updated_at) VALUES (5, 'efectivo', 'pendiente', 6.00, '2024-03-14', NOW(), NOW());

INSERT INTO sesiones_qr (id_mesa, id_user, token, fecha_sesion, created_at, updated_at) VALUES (1, 1, 'abc123', '2024-03-14', NOW(), NOW());
INSERT INTO sesiones_qr (id_mesa, id_user, token, fecha_sesion, created_at, updated_at) VALUES (2, 1, 'abc234', '2024-03-14', NOW(), NOW());
INSERT INTO sesiones_qr (id_mesa, id_user, token, fecha_sesion, created_at, updated_at) VALUES (3, 2, 'abc345', '2024-03-14', NOW(), NOW());
INSERT INTO sesiones_qr (id_mesa, id_user, token, fecha_sesion, created_at, updated_at) VALUES (4, 3, 'abc456', '2024-03-14', NOW(), NOW());
INSERT INTO sesiones_qr (id_mesa, id_user, token, fecha_sesion, created_at, updated_at) VALUES (5, 3, 'abc567', '2024-03-14', NOW(), NOW());