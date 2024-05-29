-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 29, 2024 at 11:53 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `brainstore`
--

-- --------------------------------------------------------

--
-- Table structure for table `appeal`
--

CREATE TABLE `appeal` (
  `appeal_id` int(11) NOT NULL,
  `appeal_desc` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `productProductId` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appeal`
--

INSERT INTO `appeal` (`appeal_id`, `appeal_desc`, `created_at`, `updated_at`, `productProductId`, `product_id`) VALUES
(1, 'Kenapa gambarnya bokeh ya? padahal gambar produknya jelas-jelas HD', '2024-05-29 09:50:54', '2024-05-29 09:50:54', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_img` varchar(255) NOT NULL,
  `product_price` varchar(255) NOT NULL,
  `product_spec` text NOT NULL,
  `product_desc` text NOT NULL,
  `product_stock` int(11) NOT NULL,
  `product_rate` decimal(2,1) NOT NULL,
  `product_category` varchar(255) NOT NULL,
  `img_quality` varchar(255) NOT NULL,
  `store_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `storeStoreId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `product_name`, `product_img`, `product_price`, `product_spec`, `product_desc`, `product_stock`, `product_rate`, `product_category`, `img_quality`, `store_id`, `created_at`, `updated_at`, `storeStoreId`) VALUES
(1, 'Lipstik Merah', 'img lipstik', '1.000.000', 'Tidak mengandung Kadmium', 'Produk ini adalah lipstik', 50, '1.0', 'Kosmetik', 'Bokeh', 1, '2024-05-29 09:26:48', '2024-05-29 09:26:48', NULL),
(2, 'Lipstik Kuning', 'img lipstik', '500.000', 'Tidak mengandung Kadmium', 'Produk ini adalah lipstik', 115, '5.0', 'Kosmetik', 'Blur', 1, '2024-05-29 09:28:26', '2024-05-29 09:28:26', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `store`
--

CREATE TABLE `store` (
  `store_id` int(11) NOT NULL,
  `store_name` varchar(255) NOT NULL,
  `store_img` varchar(255) DEFAULT NULL,
  `store_desc` text DEFAULT NULL,
  `store_rate` decimal(2,1) DEFAULT NULL,
  `store_location` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `userUserId` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `store`
--

INSERT INTO `store` (`store_id`, `store_name`, `store_img`, `store_desc`, `store_rate`, `store_location`, `created_at`, `updated_at`, `userUserId`, `user_id`) VALUES
(1, 'Toko Kosmetik', NULL, 'Kami menyediakan berbagai jenis kosmetik dengan berbagai brand yang ada', '5.0', 'Jakarta', '2024-05-29 09:22:29', '2024-05-29 09:37:39', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_phone` varchar(255) DEFAULT NULL,
  `user_address` varchar(255) DEFAULT NULL,
  `user_img` varchar(255) DEFAULT NULL,
  `user_role` enum('admin','seller','customer') NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_name`, `user_email`, `user_password`, `user_phone`, `user_address`, `user_img`, `user_role`, `created_at`, `updated_at`) VALUES
(1, 'Sherina si Seller', 'sherina_seller@gmail.com', '$2a$10$MLq9SiZSVjSVmNdTVGVjzuE1SQoW5lLXh5O2IUdQ6FBQA.4P25yyG', NULL, NULL, NULL, 'seller', '2024-05-29 09:22:29', '2024-05-29 09:22:29'),
(2, 'Kasuari si Customer', 'kasuari_customer@gmail.com', '$2a$10$grEkwAoQBPilDrSDLBMkMeehcJctA4qf0xE/hBET0yOHFYRl6VBYi', '081555001123', 'Jalan Merak No.30, Medan', NULL, 'customer', '2024-05-29 09:41:43', '2024-05-29 09:45:18'),
(3, 'Adam si Admin', 'adam_admin@gmail.com', '$2a$10$RorC00Zts0xXF56hAtk8V.xh2KzWDWOPj8tMaHi0k6h0kYdM2oAHW', NULL, NULL, NULL, 'admin', '2024-05-29 09:48:11', '2024-05-29 09:48:11');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appeal`
--
ALTER TABLE `appeal`
  ADD PRIMARY KEY (`appeal_id`),
  ADD KEY `productProductId` (`productProductId`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `store_id` (`store_id`),
  ADD KEY `storeStoreId` (`storeStoreId`);

--
-- Indexes for table `store`
--
ALTER TABLE `store`
  ADD PRIMARY KEY (`store_id`),
  ADD UNIQUE KEY `store_name` (`store_name`),
  ADD KEY `userUserId` (`userUserId`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_name` (`user_name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appeal`
--
ALTER TABLE `appeal`
  MODIFY `appeal_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `store`
--
ALTER TABLE `store`
  MODIFY `store_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appeal`
--
ALTER TABLE `appeal`
  ADD CONSTRAINT `appeal_ibfk_1` FOREIGN KEY (`productProductId`) REFERENCES `product` (`product_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `appeal_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`store_id`) REFERENCES `store` (`store_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `product_ibfk_2` FOREIGN KEY (`storeStoreId`) REFERENCES `store` (`store_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `store`
--
ALTER TABLE `store`
  ADD CONSTRAINT `store_ibfk_1` FOREIGN KEY (`userUserId`) REFERENCES `user` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `store_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
