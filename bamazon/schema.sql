DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(500) NULL,
    dept_name VARCHAR(500) NULL,
    price FLOAT(4,2) NULL,
    stock_quantity INT NULL
);

INSERT INTO products(product_name, dept_name, price, stock_quantity) 
VALUES 
("iPhone X", "Electronics", 1150.00, 1), 
("Apple TV", "Electronics", 145.00, 4), 
("Grand Theift Auto", "Games", 44.99, 50),
("Echo", "Electronics", 49.99, 55),
("Instant Loss Cookbook: Cook Your Way to a Healthy Weight with 125 Recipes for Your Instant Pot, Pressure Cooker, and More", "Books", 11.99, 100),
("Inherent Vice", "Books", 12.99, 55),
("Play-Doh Modeling Compound 10-Pack Case of Colors, Non-Toxic, Assorted Colors, 2-Ounce Cans, Ages 2 and up", "Toys & Games", 19.20, 200),
("Girl, Wash Your Face: Stop Believing the Lies About Who You Are so You Can Become Who You Were Meant to Be", "Books", 13.79, 51),
("Unfu*k Yourself: Get Out of Your Head and into Your Life", "Books", 12.99, 1),
("Zen and the Art of Happiness", "Books", 19.99, 500);

SELECT * FROM products;