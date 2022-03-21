INSERT INTO departments (department_name)
VALUES ("Human Resources"),
       ("Marketing"),
       ("Accounting"),
       ("Sales");

INSERT INTO roles (title, salary, department_id)
VALUES ("Human Resources Manager", 50000, 1),
       ("Accounting Manager", 50000, 3), 
       ("Sales Manager", 54000, 4),
       ("Marketing Director", 62000, 2),
       ("Accounting Director", 57600, 3),
       ("Sales Intern", 37000, 4),
       ("Accounting Intern", 48000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Toby", "Flenderson", 1, NULL),
-- Manager of Accounting
       ("Oscar", "Martinez", 1, 5),
-- Manager of Sales
       ("Phyllis", "Vance", 1, NULL), 
-- Director of Marketing
       ("Darryl","Philbin", 2, NULL),
-- Director of Accounting
       ("Angela", "Martin", 2, NULL),
-- Intern of Sales
       ("Kelly", "Kapoor", 2, 4),
-- Intern of Accounting
       ("Kevin", "Malone", 2, 2);