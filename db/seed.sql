INSERT department (name) VALUES ("Blackmarket Sales");
INSERT department (name) VALUES ("Sales");
INSERT department (name) VALUES ("Marketing");
select * from department; -- 0
INSERT role (title, salary, department_id) VALUES ("Hired Thug", 70000, 1);
INSERT role (title, salary, department_id) VALUES ("Hired Thug Manager", 150000, 1);

select * from role; -- 1 FK

INSERT employee (first_name, last_name, role_id, manager_id) VALUES ("Jivko", "A", 3, null);


select * from employee; -- 2 FK

