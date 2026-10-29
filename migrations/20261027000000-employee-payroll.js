"use strict";

exports.up = function up(db) {
  return db.runSql(`
    CREATE TABLE IF NOT EXISTS employees (
      employee_id INT AUTO_INCREMENT PRIMARY KEY,
      first_name VARCHAR(100) NOT NULL,
      last_name VARCHAR(100) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      phone VARCHAR(30),
      department VARCHAR(100),
      job_title VARCHAR(100) NOT NULL,
      hire_date DATE NOT NULL,
      status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;
    CREATE TABLE IF NOT EXISTS salaries (
      salary_id INT AUTO_INCREMENT PRIMARY KEY,
      employee_id INT NOT NULL,
      gross_amount DECIMAL(12,2) NOT NULL,
      currency CHAR(3) NOT NULL,
      effective_date DATE NOT NULL,
      notes VARCHAR(500),
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX (employee_id),
      CONSTRAINT fk_salaries_employee FOREIGN KEY (employee_id)
        REFERENCES employees(employee_id) ON DELETE RESTRICT
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;
    CREATE TABLE IF NOT EXISTS payment_transfers (
      transfer_id INT AUTO_INCREMENT PRIMARY KEY,
      salary_id INT NOT NULL,
      amount DECIMAL(12,2) NOT NULL,
      currency CHAR(3) NOT NULL,
      transfer_date DATE NOT NULL,
      reference VARCHAR(100) NOT NULL UNIQUE,
      status ENUM('pending', 'completed', 'failed') NOT NULL DEFAULT 'pending',
      notes VARCHAR(500),
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX (salary_id),
      CONSTRAINT fk_transfers_salary FOREIGN KEY (salary_id)
        REFERENCES salaries(salary_id) ON DELETE RESTRICT
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;
  `);
};

exports.down = function down(db) {
  return db.runSql(`
    DROP TABLE payment_transfers;
    DROP TABLE salaries;
    DROP TABLE employees;
  `);
};

exports._meta = { version: 1 };
