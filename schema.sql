CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE Products (
	item_id INT(10) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity SMALLINT NOT NULL,
    PRIMARY KEY(item_id)
);

USE bamazon_db;
INSERT INTO Products 
	(product_name,department_name,price,stock_quantity)
VALUES
	('Television','Tech',300,100),
    ('Computer','Tech',800,100),
    ('Cell Phone','Tech',200,100),

    ('T-Shirt','Clothing',20,100),
    ('Jeans','Clothing',80,100),
    ('Shoes','Clothing',100,100),

    ('Basketball','Sporting Goods',40,100),
    ('Baseball Bat','Sporting Goods',120,100),
    ('Golf Clubs','Sporting Goods',750,100);
