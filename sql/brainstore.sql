-- untuk semua table agar bisa diimport langsung ke Cloud SQL (NOT UPDATED)
-- Create the user table
CREATE TABLE user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'seller', 'customer') NOT NULL
);

-- Create the admin table
CREATE TABLE admin (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

-- Create the seller table
CREATE TABLE seller (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    avatar_image VARCHAR(255),
    shop_name VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (shop_name) REFERENCES shop(shop_name)
);

-- Create the customer table
CREATE TABLE customer (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    home_address VARCHAR(255),
    avatar_image VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

-- Create the shop table
CREATE TABLE store (
    store_id INT AUTO_INCREMENT PRIMARY KEY,
    store_name VARCHAR(255) NOT NULL UNIQUE,
    store_image VARCHAR(255),
    store_description TEXT,
    rating DECIMAL(3, 2),
    location VARCHAR(255),
    seller_id INT UNIQUE,
    FOREIGN KEY (seller_id) REFERENCES seller(seller_id)
);

-- Create the product table
CREATE TABLE product (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    product_image VARCHAR(255),
    price DECIMAL(10, 2) NOT NULL,
    specification TEXT,
    description TEXT,
    stock INT NOT NULL,
    rating DECIMAL(3, 2),
    seller_id INT,
    category_id INT,
    FOREIGN KEY (seller_id) REFERENCES seller(seller_id),
    FOREIGN KEY (category_id) REFERENCES category(category_id)
);

-- Create the category table
CREATE TABLE category (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL UNIQUE
);