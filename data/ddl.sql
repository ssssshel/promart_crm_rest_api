INSERT INTO role (name, description, p_unlock_client, p_modify_client_status, p_create_client, p_delete_client, p_update_client, p_view_client) values
  ('superadmin', 'Super administrador del sistema', true, true, true, true, true, true),
  ('admin', 'Administrador del sistema', false, true, true, true, true, true),
  ('customer', 'Cliente del sistema', false, false, false, false, false, false);
  
INSERT INTO status (name) VALUES
  ('prospect'),
  ('active'),
  ('inactive'),
  ('locked');
  
INSERT INTO "user" (first_name, last_name, middle_name, email, password_hash, is_deleted, role_id, "createdAt", "updatedAt") VALUES
  ('John', 'Doe', 'M', 'superadmin@example.com', '$2a$07$0Cu/ruIlgG.XZuTjUbBelOs.CjHoAm67PbopqTXHNpXyd13yDjC2m', FALSE, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Jane', 'Smith', 'A', 'admin@example.com', '$2a$07$o/ZC8XkNqbcOUWcyIP2bmuvEIVkp0oVUFrt33xguPcnBmSmS0Y./u', FALSE, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Alice', 'Johnson', 'B', 'customer1@example.com', '$2a$07$jJ9MNzZAJu3di57CavpItOQSugYJww3INm4QuQclGv.CNWB3j4mbW', FALSE, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Bob', 'Williams', 'C', 'customer2@example.com', '$2a$07$wH/UKKbG8eQWXE00O8fuHO68bC3CX.UxF3jIsCINVuwgB4BFAfOeG', FALSE, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Charlie', 'Brown', 'D', 'customer3@example.com', '$2a$07$8fRWILOehWaZieKZHbsSwOU22oljR5oV3A6HY7OJ0PJhlKNg0vBwa', FALSE, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
  
INSERT into user_status (user_id, current_status_id, change_status_date) values
 (3, 1, CURRENT_TIMESTAMP),
 (4, 1, CURRENT_TIMESTAMP),
 (5, 1, CURRENT_TIMESTAMP);