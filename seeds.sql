INSERT INTO department (name)
VALUES 
-- 1
       ("Human Resources"),
-- 2
       ("Marketing"),
-- 3
       ("Accounting"),
-- 4
       ("Sales");

INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 50000, 1),
       ("Manager", 50000, 3), 
       ("Manager", 54000, 4),
       ("Director", 62000, 2),
       ("Director", 57600, 3),
       ("Intern", 37000, 4),
       ("Intern", 48000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
--Manager of Human Resources
       ("Toby", "Flenderson", 1, NULL),
-- Manager of Accounting
       ("Oscar", "Martinez", 1, 5),
-- Manager of Sales
       ("Phyllis", "Vance", 1, NULL), 
--Director of Marketing
       ("Darryl","Philbin", 2, NULL),
-- Director of Accounting
       ("Angela", "Martin", 2, NULL),
--Intern of Sales
       ("Kelly", "Kapoor", 2, 4),
-- Intern of Accounting
       ("Kevin", "Malone", 2, 2);