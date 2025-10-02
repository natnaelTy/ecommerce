-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 01, 2025 at 03:21 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `furniture`
--

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `street` varchar(191) NOT NULL,
  `city` varchar(191) NOT NULL,
  `country` varchar(191) NOT NULL,
  `postalCode` varchar(191) DEFAULT NULL,
  `phone` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `address`
--

INSERT INTO `address` (`id`, `userId`, `street`, `city`, `country`, `postalCode`, `phone`) VALUES
(1, 10, 'fura', 'hawassa', 'Ethiopia', NULL, NULL),
(2, 10, 'fura', 'hawassa', 'Ethiopia', NULL, NULL),
(3, 10, 'fura', 'hawassa', 'Ethiopia', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `fullName` varchar(191) NOT NULL,
  `profilePhoto` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `role` enum('ADMIN','SUPER_ADMIN') DEFAULT 'ADMIN',
  `updatedAt` datetime(3) NOT NULL,
  `isActive` tinyint(1) DEFAULT 1,
  `lastLogin` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `email`, `password`, `fullName`, `profilePhoto`, `createdAt`, `role`, `updatedAt`, `isActive`, `lastLogin`) VALUES
(2, 'admin@gmail.com', '$2b$10$SFa0IJkC.PqCxU6UNY8yGe/gjWPt/twMi0xR1Bbk0jvSDe36ur8iK', 'Natnael bab', '', '2025-09-19 16:42:43.486', 'ADMIN', '2025-09-25 14:04:07.680', 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `productId`, `quantity`, `userId`) VALUES
(56, 11, 1, 10);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `contactmessage`
--

CREATE TABLE `contactmessage` (
  `id` int(11) NOT NULL,
  `fullName` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `message` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `isRead` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `contactmessage`
--

INSERT INTO `contactmessage` (`id`, `fullName`, `email`, `message`, `createdAt`, `isRead`) VALUES
(1, 'Natnael taye', 'nati@gmail.com', 'hi', '2025-09-30 20:24:11.635', 1),
(2, 'dave', 'dave@gmail.com', 'hello', '2025-09-30 20:24:11.635', 1),
(3, 'natnael taye', 'natitaye316@gmail.com', 'yo yo', '2025-09-30 20:24:11.635', 1);

-- --------------------------------------------------------

--
-- Table structure for table `coupon`
--

CREATE TABLE `coupon` (
  `id` int(11) NOT NULL,
  `code` varchar(191) NOT NULL,
  `discount` double NOT NULL,
  `type` varchar(191) NOT NULL,
  `expiresAt` datetime(3) DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `newarrival`
--

CREATE TABLE `newarrival` (
  `id` int(11) NOT NULL,
  `productId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `title` varchar(191) NOT NULL,
  `message` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `isRead` tinyint(1) NOT NULL DEFAULT 0,
  `type` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `notification`
--

INSERT INTO `notification` (`id`, `userId`, `title`, `message`, `createdAt`, `isRead`, `type`) VALUES
(1, 16, 'Order Placed', 'Your order #30 has been placed successfully.', '2025-09-28 14:44:58.824', 1, 'order'),
(2, 16, 'Order Placed', 'Your order #31 has been placed successfully.', '2025-09-28 14:47:38.041', 1, 'order'),
(3, 16, 'Order Placed', 'Your order #32 has been placed successfully.', '2025-09-28 14:49:57.285', 1, 'order'),
(4, NULL, 'New Order', 'Order #32 placed by User 16', '2025-09-28 14:49:57.413', 1, 'order'),
(5, 16, 'Order Placed', 'Your order #33 has been placed successfully.', '2025-09-28 18:46:33.191', 0, 'order'),
(6, NULL, 'New Order', 'Order #33 placed by User #16', '2025-09-28 18:46:33.476', 1, 'order'),
(7, 10, 'Order Placed', 'Your order #34 has been placed successfully.', '2025-09-29 11:06:17.237', 1, 'order'),
(8, NULL, 'New Order', 'Order #34 placed by User #10', '2025-09-29 11:06:17.294', 1, 'order'),
(9, 10, 'Order Placed', 'Your order #35 has been placed successfully.', '2025-09-29 14:44:55.529', 1, 'order'),
(10, NULL, 'New Order', 'Order #35 placed by User #10', '2025-09-29 14:44:55.746', 0, 'order'),
(11, 10, 'Order Confirmed', 'Your order #35 has been confirmed, you will receive the product shortly.', '2025-09-29 15:41:14.814', 0, 'order'),
(12, 10, 'Order Placed', 'Your order #36 has been placed successfully.', '2025-09-29 16:09:32.890', 0, 'order'),
(13, NULL, 'New Order', 'Order #36 placed by User #10', '2025-09-29 16:09:33.154', 0, 'order'),
(14, 10, 'Order Placed', 'Your order #37 has been placed successfully.', '2025-09-29 16:28:24.755', 0, 'order'),
(15, NULL, 'New Order', 'Order #37 placed by User #10', '2025-09-29 16:28:24.824', 0, 'order'),
(16, 10, 'Order Confirmed', 'Your order #37 has been confirmed, you will receive the product shortly.', '2025-09-29 16:38:57.999', 0, 'order'),
(17, 10, 'Order Cancelled', 'Your order #36 has been cancelled.', '2025-09-29 18:28:09.124', 0, 'order'),
(18, NULL, 'Order Cancelled', 'Order #36 by User #10 has been cancelled.', '2025-09-29 18:28:09.967', 0, 'order');

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `total` double NOT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'PENDING',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `addressId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order`
--

INSERT INTO `order` (`id`, `userId`, `total`, `status`, `createdAt`, `updatedAt`, `addressId`) VALUES
(1, 10, 120000, 'pending', '2025-08-28 13:50:31.092', '2025-08-28 13:50:31.092', NULL),
(2, 16, 180000, 'pending', '2025-08-28 14:53:16.957', '2025-08-28 14:53:16.957', NULL),
(3, 16, 180000, 'pending', '2025-08-28 14:53:19.884', '2025-08-28 14:53:19.884', NULL),
(4, 16, 180000, 'pending', '2025-08-29 17:36:10.194', '2025-08-29 17:36:10.194', NULL),
(5, 10, 14500, 'pending', '2025-09-12 19:10:16.079', '2025-09-12 19:10:16.079', NULL),
(6, 10, 50000, 'pending', '2025-09-15 08:14:10.719', '2025-09-15 08:14:10.719', NULL),
(7, 10, 30000, 'pending', '2025-09-16 15:50:30.199', '2025-09-16 15:50:30.199', NULL),
(8, 10, 42000, 'pending', '2025-09-16 15:58:55.030', '2025-09-16 15:58:55.030', NULL),
(9, 10, 18000, 'pending', '2025-09-16 16:03:43.415', '2025-09-16 16:03:43.415', NULL),
(10, 16, 77997, 'pending', '2025-09-22 11:45:12.620', '2025-09-22 11:45:12.620', NULL),
(11, 16, 7500, 'pending', '2025-09-22 11:52:24.567', '2025-09-22 11:52:24.567', NULL),
(12, 16, 9000, 'pending', '2025-09-22 13:38:14.307', '2025-09-22 13:38:14.307', NULL),
(13, 16, 30000, 'pending', '2025-09-22 13:49:27.344', '2025-09-22 13:49:27.344', NULL),
(14, 16, 15999, 'pending', '2025-09-22 14:03:24.615', '2025-09-22 14:03:24.615', NULL),
(15, 16, 6500, 'pending', '2025-09-22 14:17:37.116', '2025-09-22 14:17:37.116', NULL),
(16, 16, 8000, 'pending', '2025-09-22 15:44:32.382', '2025-09-22 15:44:32.382', NULL),
(17, 10, 45000, 'pending', '2025-09-24 11:16:24.912', '2025-09-24 11:16:24.912', NULL),
(18, 10, 8000, 'pending', '2025-09-24 11:44:45.177', '2025-09-24 11:44:45.177', NULL),
(19, 10, 56500, 'pending', '2025-09-25 14:28:30.413', '2025-09-25 14:28:30.413', NULL),
(20, 10, 25999, 'pending', '2025-09-25 14:42:48.641', '2025-09-25 14:42:48.641', NULL),
(21, 10, 25999, 'pending', '2025-09-25 14:43:59.402', '2025-09-25 14:43:59.402', NULL),
(22, 10, 7500, 'pending', '2025-09-25 15:21:28.307', '2025-09-25 15:21:28.307', NULL),
(23, 10, 6500, 'pending', '2025-09-25 15:44:00.899', '2025-09-25 15:44:00.899', NULL),
(24, 10, 25999, 'pending', '2025-09-25 15:46:00.678', '2025-09-25 15:46:00.678', NULL),
(25, 10, 25999, 'pending', '2025-09-25 16:05:17.923', '2025-09-25 16:05:17.923', NULL),
(26, 10, 25999, 'paid', '2025-09-25 16:40:02.240', '2025-09-25 16:40:24.855', NULL),
(27, 10, 7500, 'paid', '2025-09-25 17:13:13.943', '2025-09-25 17:52:59.812', NULL),
(28, 16, 25999, 'pending', '2025-09-28 13:52:41.844', '2025-09-28 13:52:41.844', NULL),
(29, 16, 25999, 'pending', '2025-09-28 13:52:51.277', '2025-09-28 13:52:51.277', NULL),
(30, 16, 25999, 'pending', '2025-09-28 14:44:58.723', '2025-09-28 14:44:58.723', NULL),
(31, 16, 25999, 'pending', '2025-09-28 14:47:37.897', '2025-09-28 14:47:37.897', NULL),
(32, 16, 25999, 'paid', '2025-09-28 14:49:57.045', '2025-09-28 14:50:23.868', NULL),
(33, 16, 15999, 'paid', '2025-09-28 18:46:32.903', '2025-09-28 18:46:48.275', NULL),
(34, 10, 32499, 'paid', '2025-09-29 11:06:16.981', '2025-09-29 11:06:39.325', NULL),
(35, 10, 6500, 'confirmed', '2025-09-29 14:44:55.406', '2025-09-29 15:41:14.555', 1),
(36, 10, 25999, 'cancelled', '2025-09-29 16:09:32.456', '2025-09-29 18:28:08.871', 2),
(37, 10, 8000, 'confirmed', '2025-09-29 16:28:24.526', '2025-09-29 16:38:57.897', 3);

-- --------------------------------------------------------

--
-- Table structure for table `orderitem`
--

CREATE TABLE `orderitem` (
  `id` int(11) NOT NULL,
  `orderId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orderitem`
--

INSERT INTO `orderitem` (`id`, `orderId`, `productId`, `quantity`, `price`) VALUES
(1, 1, 2, 4, 30000),
(2, 2, 2, 6, 30000),
(3, 3, 2, 6, 30000),
(4, 4, 2, 6, 30000),
(5, 5, 10, 1, 8000),
(6, 5, 11, 1, 6500),
(7, 6, 7, 1, 50000),
(8, 7, 2, 1, 30000),
(9, 8, 5, 1, 42000),
(10, 9, 4, 1, 18000),
(11, 10, 2, 3, 25999),
(12, 11, 9, 1, 7500),
(13, 12, 6, 1, 9000),
(14, 13, 3, 1, 30000),
(15, 14, 4, 1, 15999),
(16, 15, 11, 1, 6500),
(17, 16, 10, 1, 8000),
(18, 17, 8, 1, 45000),
(19, 18, 10, 1, 8000),
(20, 19, 7, 1, 50000),
(21, 19, 11, 1, 6500),
(22, 20, 2, 1, 25999),
(23, 21, 2, 1, 25999),
(24, 22, 9, 1, 7500),
(25, 23, 11, 1, 6500),
(26, 24, 2, 1, 25999),
(27, 25, 2, 1, 25999),
(28, 26, 2, 1, 25999),
(29, 27, 9, 1, 7500),
(30, 28, 2, 1, 25999),
(31, 29, 2, 1, 25999),
(32, 30, 2, 1, 25999),
(33, 31, 2, 1, 25999),
(34, 32, 2, 1, 25999),
(35, 33, 4, 1, 15999),
(36, 34, 11, 1, 6500),
(37, 34, 2, 1, 25999),
(38, 35, 11, 1, 6500),
(40, 37, 10, 1, 8000);

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `id` int(11) NOT NULL,
  `orderId` int(11) NOT NULL,
  `method` varchar(191) NOT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'PENDING',
  `amount` double NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `currency` varchar(191) DEFAULT NULL,
  `email` varchar(191) DEFAULT NULL,
  `txRef` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`id`, `orderId`, `method`, `status`, `amount`, `createdAt`, `currency`, `email`, `txRef`) VALUES
(1, 1, 'bank_transfer', 'unpaid', 120000, '2025-08-28 13:50:31.092', NULL, NULL, NULL),
(2, 2, 'bank_transfer', 'unpaid', 180000, '2025-08-28 14:53:16.957', NULL, NULL, NULL),
(3, 3, 'bank_transfer', 'unpaid', 180000, '2025-08-28 14:53:19.884', NULL, NULL, NULL),
(4, 4, 'bank_transfer', 'unpaid', 180000, '2025-08-29 17:36:10.194', NULL, NULL, NULL),
(5, 5, 'bank_transfer', 'unpaid', 14500, '2025-09-12 19:10:16.079', NULL, NULL, NULL),
(6, 6, 'bank_transfer', 'unpaid', 50000, '2025-09-15 08:14:10.719', NULL, NULL, NULL),
(7, 7, 'bank_transfer', 'unpaid', 30000, '2025-09-16 15:50:30.199', NULL, NULL, NULL),
(8, 8, 'bank_transfer', 'unpaid', 42000, '2025-09-16 15:58:55.030', NULL, NULL, NULL),
(9, 9, 'bank_transfer', 'unpaid', 18000, '2025-09-16 16:03:43.415', NULL, NULL, NULL),
(10, 10, 'chapa', 'unpaid', 77997, '2025-09-22 11:45:12.620', NULL, NULL, NULL),
(11, 11, 'chapa', 'unpaid', 7500, '2025-09-22 11:52:24.567', NULL, NULL, NULL),
(12, 12, 'chapa', 'unpaid', 9000, '2025-09-22 13:38:14.307', NULL, NULL, NULL),
(13, 13, 'chapa', 'unpaid', 30000, '2025-09-22 13:49:27.344', NULL, NULL, NULL),
(14, 14, 'chapa', 'unpaid', 15999, '2025-09-22 14:03:24.615', NULL, NULL, NULL),
(15, 15, 'chapa', 'unpaid', 6500, '2025-09-22 14:17:37.116', NULL, NULL, NULL),
(16, 16, 'chapa', 'unpaid', 8000, '2025-09-22 15:44:32.382', NULL, NULL, NULL),
(17, 17, 'chapa', 'unpaid', 45000, '2025-09-24 11:16:24.912', NULL, NULL, NULL),
(18, 18, 'chapa', 'unpaid', 8000, '2025-09-24 11:44:45.177', NULL, NULL, NULL),
(19, 19, 'chapa', 'unpaid', 56500, '2025-09-25 14:28:30.413', NULL, NULL, NULL),
(20, 20, 'chapa', 'unpaid', 25999, '2025-09-25 14:42:48.641', NULL, NULL, NULL),
(21, 21, 'chapa', 'unpaid', 25999, '2025-09-25 14:43:59.402', NULL, NULL, NULL),
(22, 22, 'chapa', 'unpaid', 7500, '2025-09-25 15:21:28.307', NULL, NULL, NULL),
(23, 23, 'chapa', 'unpaid', 6500, '2025-09-25 15:44:00.899', NULL, NULL, NULL),
(24, 24, 'chapa', 'unpaid', 25999, '2025-09-25 15:46:00.678', NULL, NULL, NULL),
(25, 25, 'chapa', 'unpaid', 25999, '2025-09-25 16:05:17.923', NULL, NULL, NULL),
(26, 26, 'chapa', 'paid', 25999, '2025-09-25 16:40:02.240', 'ETB', 'natitaye316@gmail.com', 'tx-1758818402606-2248'),
(27, 27, 'chapa', 'paid', 7500, '2025-09-25 17:13:13.943', 'ETB', 'abe@gmail.com', 'tx-1758820394509-2125'),
(28, 28, 'chapa', 'unpaid', 25999, '2025-09-28 13:52:41.844', NULL, NULL, NULL),
(29, 29, 'chapa', 'unpaid', 25999, '2025-09-28 13:52:51.277', NULL, NULL, NULL),
(30, 30, 'chapa', 'unpaid', 25999, '2025-09-28 14:44:58.723', NULL, NULL, NULL),
(31, 31, 'chapa', 'unpaid', 25999, '2025-09-28 14:47:37.897', NULL, NULL, NULL),
(32, 32, 'chapa', 'paid', 25999, '2025-09-28 14:49:57.045', 'ETB', 'abdulahiredwann@gmail.com', 'tx-1759070997612-9230'),
(33, 33, 'chapa', 'paid', 15999, '2025-09-28 18:46:32.903', 'ETB', 'natitaye316@gmail.com', 'tx-1759085193751-9071'),
(34, 34, 'chapa', 'paid', 32499, '2025-09-29 11:06:16.981', 'ETB', 'natitaye316@gmail.com', 'tx-1759143977581-8601'),
(35, 35, 'chapa', 'paid', 6500, '2025-09-29 14:44:55.406', 'ETB', 'natitaye316@gmail.com', 'tx-1759157095930-4785'),
(36, 36, 'chapa', 'paid', 25999, '2025-09-29 16:09:32.456', 'ETB', 'natitaye316@gmail.com', 'tx-1759162173436-3141'),
(37, 37, 'chapa', 'paid', 8000, '2025-09-29 16:28:24.526', 'ETB', 'natitaye316@gmail.com', 'tx-1759163305500-4522');

-- --------------------------------------------------------

--
-- Table structure for table `productcategory`
--

CREATE TABLE `productcategory` (
  `productId` int(11) NOT NULL,
  `categoryId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `description` varchar(191) NOT NULL,
  `image` varchar(191) NOT NULL,
  `price` double NOT NULL,
  `category` varchar(191) DEFAULT NULL,
  `brand` varchar(191) NOT NULL,
  `quantity` int(11) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `productName` varchar(191) NOT NULL,
  `color` varchar(191) DEFAULT NULL,
  `material` varchar(191) DEFAULT NULL,
  `weight` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `description`, `image`, `price`, `category`, `brand`, `quantity`, `createdAt`, `productName`, `color`, `material`, `weight`) VALUES
(2, 'A couple sofa, also known as a loveseat, is a compact two-seater designed for comfort and intimacy.\r\nIt’s ideal for couples or small spaces like apartments, bedrooms, or reading nooks.\r\nAvail', 'https://res.cloudinary.com/dhoenyn4d/image/upload/v1753704847/ecommerce-products/uaf1ipozt47vzoklbjoi.jpg', 25999, 'sofa', 'apex', -38, '2025-07-28 12:14:11.325', 'Couple sofa', NULL, NULL, NULL),
(3, 'Upgrade your bedroom with our Modern Wooden Bed Frame, crafted with premium materials for long-lasting support and elegant design. The solid wood construction ensures stability, while the smo', 'https://res.cloudinary.com/dhoenyn4d/image/upload/v1756734567/ecommerce-products/cjdtelhswn6rxtqphymx.jpg', 30000, 'bed', 'apex', -1, '2025-09-01 13:49:29.319', 'Modern Wooden Bed Frame', NULL, NULL, NULL),
(4, 'Cozy Reading Sofa, crafted for comfort and style. Its ergonomic design provides excellent back support, while the plush cushioning lets you sink in for hours of relaxation. Compact yet stylis', 'https://res.cloudinary.com/dhoenyn4d/image/upload/v1756736145/ecommerce-products/nl1h7pmrahkpujo1s1l2.jpg', 15999, 'sofa', 'apex', -2, '2025-09-01 14:15:47.011', 'Skyblue Sofa', NULL, NULL, NULL),
(5, 'Transform your living room with our Modern L-Shaped Sofa, combining elegance, comfort, and practicality in one. Designed to maximize seating space, this sofa comfortably fits families and gue', 'https://res.cloudinary.com/dhoenyn4d/image/upload/v1756736327/ecommerce-products/wxxlxafpsqz5neyumny7.jpg', 42000, 'sofa', 'apex', 0, '2025-09-01 14:18:48.879', 'Modern L-Shaped Sofa', NULL, NULL, NULL),
(6, 'Upgrade your sleep with our Premium Mattress, engineered to give you the perfect balance of comfort and support. Whether you prefer a firm, medium, or soft feel, this mattress adapts to your ', 'https://res.cloudinary.com/dhoenyn4d/image/upload/v1756736572/ecommerce-products/mm2rp9mkzj7aadn594gq.jpg', 9000, 'bed', 'apex', 0, '2025-09-01 14:22:54.161', 'Mattress', NULL, NULL, NULL),
(7, 'White Wooden Bed , crafted with premium materials for long-lasting support and elegant design. The solid wood construction ensures stability, while the smooth finish adds a touch of sophistic', 'https://res.cloudinary.com/dhoenyn4d/image/upload/v1756736777/ecommerce-products/rd2s4nfh440xyhtkmjlg.jpg', 50000, 'bed', 'apex', -1, '2025-09-01 14:26:19.348', 'White Wooden Bed', NULL, NULL, NULL),
(8, 'Elegant Dining Table, designed with a perfect mix of durability, comfort, and modern style. Built from high-quality wood/metal with a smooth finish, this table is ideal for daily family meals', 'https://res.cloudinary.com/dhoenyn4d/image/upload/v1756736877/ecommerce-products/jp9tvlbellgym2htrmzj.jpg', 45000, 'table', 'apex', 0, '2025-09-01 14:27:58.575', 'Italian Dining Table', NULL, NULL, NULL),
(9, 'crafted with ergonomics and design in mind. Whether you’re dining, working, or relaxing, this chair offers sturdy support and long-lasting comfort. Made from high-quality materials, it’s ligh', 'https://res.cloudinary.com/dhoenyn4d/image/upload/v1756736987/ecommerce-products/lqcrq272xglk0v2ndws2.jpg', 7500, 'chair', 'apex', -2, '2025-09-01 14:29:49.083', 'Italian Chair', NULL, NULL, NULL),
(10, 'crafted with ergonomics and design in mind. Whether you’re dining, working, or relaxing, this chair offers sturdy support and long-lasting comfort. Made from high-quality materials, it’s ligh', 'https://res.cloudinary.com/dhoenyn4d/image/upload/v1756737084/ecommerce-products/nd0ocwvdzqacrflnmi0e.jpg', 8000, 'chair', 'apex', -4, '2025-09-01 14:31:26.350', 'Coffee Chair', NULL, NULL, NULL),
(11, 'crafted with ergonomics and design in mind. Whether you’re dining, working, or relaxing, this chair offers sturdy support and long-lasting comfort. Made from high-quality materials, it’s ligh', 'https://res.cloudinary.com/dhoenyn4d/image/upload/v1756737156/ecommerce-products/abrhepbp7erhjmvvup93.jpg', 6500, 'chair', 'apex', -14, '2025-09-01 14:32:37.740', 'Small Office Chair', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `id` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `comment` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `review`
--

INSERT INTO `review` (`id`, `productId`, `userId`, `rating`, `comment`, `createdAt`) VALUES
(1, 11, 10, 3, 'cool', '2025-09-26 13:45:51.784'),
(2, 11, 10, 3, 'nice product', '2025-09-26 13:52:49.821'),
(3, 11, 10, 5, '', '2025-09-26 14:11:16.374'),
(4, 11, 10, 5, '', '2025-09-26 14:16:33.209'),
(5, 11, 16, 0, 'i dont like the color', '2025-09-26 16:21:08.213'),
(6, 11, 16, 5, '', '2025-09-26 16:25:20.769'),
(7, 11, 16, 2, 'yeah it\'s me again', '2025-09-26 16:28:03.493'),
(8, 11, 16, 4, 'here we go again', '2025-09-26 16:30:29.332'),
(9, 11, 16, 5, 'yooo', '2025-09-26 16:36:44.199'),
(10, 10, 16, 5, 'dope product', '2025-09-26 16:37:49.329'),
(11, 5, 10, 4, '', '2025-09-27 11:26:31.270');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `fullName` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `phoneNumber` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `isEmailVerified` tinyint(1) NOT NULL DEFAULT 0,
  `resetPasswordCode` varchar(191) DEFAULT NULL,
  `resetPasswordCodeExpiresAt` datetime(3) DEFAULT NULL,
  `verificationCode` varchar(191) DEFAULT NULL,
  `verificationCodeExpiresAt` datetime(3) DEFAULT NULL,
  `birthday` datetime(3) DEFAULT NULL,
  `gender` varchar(191) DEFAULT NULL,
  `profileImage` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `fullName`, `email`, `phoneNumber`, `password`, `createdAt`, `isEmailVerified`, `resetPasswordCode`, `resetPasswordCodeExpiresAt`, `verificationCode`, `verificationCodeExpiresAt`, `birthday`, `gender`, `profileImage`) VALUES
(10, 'Natnael taye', 'natitaye316@gmail.com', '0975329588', '$2b$10$kkKnSXrOLABzYQz7zfERLehgKbqSkcS/Hg5vf4Hq7dpXVrz4vhiNW', '2025-07-16 18:57:17.479', 1, NULL, NULL, NULL, '2025-07-16 19:57:17.367', NULL, '', 'https://res.cloudinary.com/dhoenyn4d/image/upload/v1758879055/profile-pictures/bywce9uhr9hvaohkjnjy.png'),
(16, 'babi the great lol', 'natitaye315@gmail.com', '0975329587', '$2b$10$EZLLHXdcjXIA4SBbOZAqPery/Wx21Vb8VO8487/GfpGNoCpOeQQQ.', '2025-07-20 08:18:09.205', 1, NULL, NULL, NULL, '2025-07-20 09:18:09.203', NULL, '', 'https://res.cloudinary.com/dhoenyn4d/image/upload/v1758903347/profile-pictures/ortypkcel5etygjxv1gv.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `wishlist`
--

CREATE TABLE `wishlist` (
  `id` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `wishlist`
--

INSERT INTO `wishlist` (`id`, `productId`, `userId`) VALUES
(3, 2, 10),
(23, 10, 10),
(25, 11, 10),
(19, 2, 16);

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('42cece15-c806-407c-be5b-bdb1aa7c7440', 'ec320a2fb0ced5b77615d41abbf63bc4ef1578b6c43e0db22b4c91050b34ca13', '2025-07-16 09:58:59.495', '20250627144921_newarrival', NULL, NULL, '2025-07-16 09:58:56.287', 1),
('436be5af-2fdc-45b0-9264-f6fabc16382e', '1cf840efaa7d39fa99ce8c1112570a95e065c3b7fd5ab91a812783ad5553468e', '2025-07-16 09:58:55.301', '20250625133534_init', NULL, NULL, '2025-07-16 09:58:54.519', 1),
('834c1dcf-5fdb-42bb-8362-6a76e7a58d0f', 'daf1fbbe8794ce9c3159265f9d37cd4de84a2fc732c2817490ac85d546b065a5', '2025-07-16 09:58:56.228', '20250627094214_product', NULL, NULL, '2025-07-16 09:58:55.372', 1),
('9f31603e-e039-4640-845c-2b1e926b3065', 'c4ff09005b09639baecf144ecf59bc1420df8def36c64364d2bd502683c3895c', '2025-07-16 09:59:47.500', '20250716095940_updated_user', NULL, NULL, '2025-07-16 09:59:40.168', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Address_userId_fkey` (`userId`);

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Admin_email_key` (`email`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Cart_userId_productId_key` (`userId`,`productId`),
  ADD KEY `Cart_productId_fkey` (`productId`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Category_name_key` (`name`),
  ADD UNIQUE KEY `Category_slug_key` (`slug`);

--
-- Indexes for table `contactmessage`
--
ALTER TABLE `contactmessage`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ContactMessage_email_key` (`email`);

--
-- Indexes for table `coupon`
--
ALTER TABLE `coupon`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Coupon_code_key` (`code`);

--
-- Indexes for table `newarrival`
--
ALTER TABLE `newarrival`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Newarrival_productId_key` (`productId`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Notification_userId_fkey` (`userId`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Order_userId_fkey` (`userId`),
  ADD KEY `Order_addressId_fkey` (`addressId`);

--
-- Indexes for table `orderitem`
--
ALTER TABLE `orderitem`
  ADD PRIMARY KEY (`id`),
  ADD KEY `OrderItem_orderId_fkey` (`orderId`),
  ADD KEY `OrderItem_productId_fkey` (`productId`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Payment_orderId_key` (`orderId`),
  ADD UNIQUE KEY `Payment_txRef_key` (`txRef`);

--
-- Indexes for table `productcategory`
--
ALTER TABLE `productcategory`
  ADD PRIMARY KEY (`productId`,`categoryId`),
  ADD KEY `ProductCategory_categoryId_idx` (`categoryId`),
  ADD KEY `ProductCategory_productId_idx` (`productId`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Review_productId_fkey` (`productId`),
  ADD KEY `Review_userId_fkey` (`userId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_email_key` (`email`),
  ADD UNIQUE KEY `User_phoneNumber_key` (`phoneNumber`);

--
-- Indexes for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `WishList_userId_productId_key` (`userId`,`productId`),
  ADD KEY `WishList_productId_fkey` (`productId`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `address`
--
ALTER TABLE `address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contactmessage`
--
ALTER TABLE `contactmessage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `coupon`
--
ALTER TABLE `coupon`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `newarrival`
--
ALTER TABLE `newarrival`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `orderitem`
--
ALTER TABLE `orderitem`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `review`
--
ALTER TABLE `review`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `wishlist`
--
ALTER TABLE `wishlist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `Address_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `Cart_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Cart_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `newarrival`
--
ALTER TABLE `newarrival`
  ADD CONSTRAINT `Newarrival_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `Notification_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `Order_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `address` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `Order_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `orderitem`
--
ALTER TABLE `orderitem`
  ADD CONSTRAINT `OrderItem_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `order` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `OrderItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `Payment_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `order` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `productcategory`
--
ALTER TABLE `productcategory`
  ADD CONSTRAINT `ProductCategory_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `ProductCategory_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `Review_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Review_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD CONSTRAINT `WishList_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `WishList_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
