create database tracker_db;
USE tracker_db;
CREATE TABLE department(
id int not null auto_increment,
name varchar(30),
primary key(id)
);
CREATE TABLE role(
id int not null auto_increment,
title varchar(30),
salary decimal(10,2),
department_id int,
foreign key(department_id) references department(id),
primary key(id)
);
CREATE TABLE employee(
id int not null auto_increment,
first_name varchar(30),
last_name varchar(30),
role_id int,
manager_id int,
foreign key(role_id) references role(id),
foreign key(manager_id) references employee(id),
primary key(id)
);