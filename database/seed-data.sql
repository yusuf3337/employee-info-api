/* Initialize DB with some seed data */
USE `employee_info_api_db`;

-- DONT MODIFY THIS MIGRATION
-- it is used by Xest local development pipeline
INSERT INTO `migrations` (
  name,
  run_on
) VALUES (
  "/20211107064324-seed-data",
  "20211107064324"
);

-- YOU CAN MODIFY BELOW THIS LINE
INSERT INTO user_types (user_type_id, user_type)
VALUES (1, "admin");
INSERT INTO user_types (user_type_id, user_type)
VALUES (2, "user");

INSERT INTO users (user_id, first_name, last_name, email, password, user_type_id, created_at)
VALUES (1, "Ahmet", "Akinsql", "ahmet@akinsql.com", SHA2(CONCAT("password","SECRET_SALT"), 224), 1, "2020-11-20 12:00:00");
INSERT INTO users (user_id, first_name, last_name, email, password, user_type_id, created_at)
VALUES (2, "Joe", "Bloggs","joebloggs@gmail.com", SHA2(CONCAT("password","SECRET_SALT"), 224), 2, "2020-11-20 12:00:00");
INSERT INTO users (user_id, first_name, last_name, email, password, user_type_id, created_at)
VALUES (3, "Jim", "Bloggs" , "jimbloggs@yahoo.com", SHA2(CONCAT("password","SECRET_SALT"), 224), 2, "2020-11-20 12:00:00");

INSERT INTO password_recovery_requests(shortcode,requested_email,expiry_date,created_at)
VALUES ("321","ahmet@akinsql.com","2020-09-20 12:30:00","2022-01-03 12:30:00");

INSERT INTO employees
  (first_name, last_name, email, phone, department, job_title, hire_date, status)
VALUES
  ('Ayşe', 'Yılmaz', 'ayse.yilmaz@example.com', '+90 555 100 0001', 'Muhasebe', 'Muhasebe Uzmanı', '2021-03-15', 'active'),
  ('Mehmet', 'Demir', 'mehmet.demir@example.com', '+90 555 100 0002', 'Yazılım', 'Backend Geliştirici', '2022-01-10', 'active'),
  ('Elif', 'Kaya', 'elif.kaya@example.com', '+90 555 100 0003', 'İnsan Kaynakları', 'İK Uzmanı', '2020-09-01', 'active'),
  ('Can', 'Çelik', 'can.celik@example.com', '+90 555 100 0004', 'Satış', 'Satış Temsilcisi', '2023-04-03', 'active'),
  ('Zeynep', 'Arslan', 'zeynep.arslan@example.com', '+90 555 100 0005', 'Pazarlama', 'Pazarlama Uzmanı', '2022-07-18', 'active'),
  ('Emre', 'Şahin', 'emre.sahin@example.com', '+90 555 100 0006', 'Yazılım', 'Frontend Geliştirici', '2021-11-22', 'active'),
  ('Derya', 'Aydın', 'derya.aydin@example.com', '+90 555 100 0007', 'Operasyon', 'Operasyon Sorumlusu', '2019-05-06', 'active'),
  ('Burak', 'Öztürk', 'burak.ozturk@example.com', '+90 555 100 0008', 'Finans', 'Finans Analisti', '2024-02-12', 'active'),
  ('Selin', 'Koç', 'selin.koc@example.com', '+90 555 100 0009', 'Destek', 'Müşteri Temsilcisi', '2023-08-28', 'inactive'),
  ('Mert', 'Yıldız', 'mert.yildiz@example.com', '+90 555 100 0010', 'Yazılım', 'Test Uzmanı', '2024-06-17', 'active');
