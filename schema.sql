DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

-- Makes it so all of the following code will affect bamazon_db --
USE bamazon_db;

-- Creates the table "products" within bamazon_db --
CREATE TABLE products (
    item_ID INTEGER(10) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30),
    department_name VARCHAR(30),
    price DECIMAL (10,2) NULL,
    stock_quantity INTEGER,
    PRIMARY KEY (item_ID)
);

-- Creates new rows data in all named columns --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Heahphones", "Electronics", 35.15, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Milk", "Dairy", 5.38, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pouring Medium", "Arts and Crafts", 12.35, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dog Food", "Pets", 18.78, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cards Against Humanity", "Entertainment", 8.62, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Wrapping Paper - Snowmen", "Holiday", 4.25, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Laundry Detergent", "Household", 13.75, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Flour", "Baking", 5.12, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pink Leather Jacket", "Womens Clothing", 42.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Duct Tape", "Maintenance", 2000.26, 10);

INSERT INTO products (product_name, price)
VALUES ("User Total", 0);

SELECT * FROM products;