-- --------------------------------------------------------
-- Máy chủ:                      127.0.0.1
-- Server version:               10.4.27-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Phiên bản:           12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for db5
CREATE DATABASE IF NOT EXISTS `db5` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `db5`;

-- Dumping structure for table db5.category
CREATE TABLE IF NOT EXISTS `category` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `category` varchar(75) DEFAULT NULL,
  `path` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table db5.category: ~8 rows (approximately)
INSERT INTO `category` (`id`, `category`, `path`, `createdAt`) VALUES
	(1, 'trái cây việt nam', '/vnfruit', '2023-03-15 16:29:15'),
	(2, 'trái cây nhập khẩu', '/importfruit', '2023-03-15 16:30:36'),
	(3, 'quà tặng trái cây', '/fruitgift', '2023-03-15 16:31:03'),
	(4, 'thực phẩm khô', '/friedfood', '2023-03-15 16:31:31'),
	(5, 'hàng đông lạnh', '/frozenfood', '2023-03-15 16:32:08'),
	(6, 'đồ uống', '/drink', '2023-03-15 16:32:19'),
	(7, 'giới thiệu', '/about', '2023-03-15 16:32:35'),
	(8, 'khuyến mãi', '/promotion', '2023-03-15 16:32:46');

-- Dumping structure for table db5.chat
CREATE TABLE IF NOT EXISTS `chat` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `room` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `text` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_7f3e04a25760adbd8ac4a60cab` (`text`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table db5.chat: ~0 rows (approximately)

-- Dumping structure for table db5.discount
CREATE TABLE IF NOT EXISTS `discount` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `disPercent` float NOT NULL DEFAULT 0,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table db5.discount: ~0 rows (approximately)

-- Dumping structure for table db5.order_item
CREATE TABLE IF NOT EXISTS `order_item` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `address` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `trans` varchar(255) NOT NULL,
  `cartTotal` float NOT NULL DEFAULT 0,
  `revenue` float NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `name` varchar(255) NOT NULL,
  `modifiedAd` datetime NOT NULL DEFAULT current_timestamp(),
  `userId` int(11) DEFAULT NULL,
  `itemQty` int(11) NOT NULL DEFAULT 0,
  `status` enum('unConfirm','confirmed','transPorting','finished') NOT NULL DEFAULT 'unConfirm',
  PRIMARY KEY (`id`),
  KEY `FK_845716d96530a440c6cdc6c7346` (`userId`),
  CONSTRAINT `FK_845716d96530a440c6cdc6c7346` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table db5.order_item: ~0 rows (approximately)

-- Dumping structure for table db5.payment
CREATE TABLE IF NOT EXISTS `payment` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `cartTotal` float NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `modifiedAd` datetime NOT NULL DEFAULT current_timestamp(),
  `orderItemId` bigint(20) DEFAULT NULL,
  `review` int(11) NOT NULL DEFAULT 0,
  `status` enum('not paid','paid') NOT NULL DEFAULT 'not paid',
  `paymentType` enum('cod','credit card') NOT NULL DEFAULT 'cod',
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_0beb81677d9f228d126e7e7f13` (`orderItemId`),
  CONSTRAINT `FK_0beb81677d9f228d126e7e7f135` FOREIGN KEY (`orderItemId`) REFERENCES `order_item` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table db5.payment: ~0 rows (approximately)

-- Dumping structure for table db5.product
CREATE TABLE IF NOT EXISTS `product` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `productName` varchar(255) NOT NULL,
  `price` float NOT NULL DEFAULT 0,
  `initialPrice` float NOT NULL DEFAULT 0,
  `quantity` smallint(6) NOT NULL DEFAULT 0,
  `sold` smallint(6) NOT NULL DEFAULT 99,
  `stars` varchar(255) NOT NULL DEFAULT '5',
  `image` varchar(255) NOT NULL,
  `brand` varchar(255) NOT NULL,
  `content` text DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `categoryId` bigint(20) DEFAULT NULL,
  `discountId` bigint(20) DEFAULT NULL,
  `active` tinyint(4) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `FK_ff0c0301a95e517153df97f6812` (`categoryId`),
  KEY `FK_1e0bf1305eddcd6627b4a32a6c6` (`discountId`),
  CONSTRAINT `FK_1e0bf1305eddcd6627b4a32a6c6` FOREIGN KEY (`discountId`) REFERENCES `discount` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_ff0c0301a95e517153df97f6812` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table db5.product: ~0 rows (approximately)

-- Dumping structure for table db5.productvariant
CREATE TABLE IF NOT EXISTS `productvariant` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `typePrice` int(11) NOT NULL DEFAULT 0,
  `type` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `productId` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_ae3d40a34e1a6e76f1082169eb0` (`productId`),
  CONSTRAINT `FK_ae3d40a34e1a6e76f1082169eb0` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table db5.productvariant: ~0 rows (approximately)

-- Dumping structure for table db5.province
CREATE TABLE IF NOT EXISTS `province` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `districts` longtext NOT NULL,
  `name` varchar(255) NOT NULL,
  `code` bigint(20) NOT NULL,
  `divisionType` varchar(255) NOT NULL,
  `codeName` varchar(255) NOT NULL,
  `phoneCode` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table db5.province: ~0 rows (approximately)

-- Dumping structure for table db5.review
CREATE TABLE IF NOT EXISTS `review` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `comment` text NOT NULL,
  `stars` smallint(6) NOT NULL DEFAULT 5,
  `type` varchar(255) NOT NULL DEFAULT 'original',
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `deletedAt` datetime(6) DEFAULT NULL,
  `productId` bigint(20) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `parentId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_2a11d3c0ea1b2b5b1790f762b9a` (`productId`),
  KEY `FK_1337f93918c70837d3cea105d39` (`userId`),
  CONSTRAINT `FK_1337f93918c70837d3cea105d39` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_2a11d3c0ea1b2b5b1790f762b9a` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table db5.review: ~0 rows (approximately)

-- Dumping structure for table db5.subcategory
CREATE TABLE IF NOT EXISTS `subcategory` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(75) DEFAULT NULL,
  `path` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `categoryId` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_3fc84b9483bdd736f728dbf95b2` (`categoryId`),
  CONSTRAINT `FK_3fc84b9483bdd736f728dbf95b2` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table db5.subcategory: ~19 rows (approximately)
INSERT INTO `subcategory` (`id`, `name`, `path`, `createdAt`, `categoryId`) VALUES
	(1, 'măng cục', '/mangosteen', '2023-03-15 17:19:56', 1),
	(2, 'bình an farm', '/binhanfarm', '2023-03-15 17:20:15', 1),
	(3, 'dâu tây', '/strawberry', '2023-03-15 17:20:42', 1),
	(4, 'trái cây khác', '/otherfruit', '2023-03-15 17:21:19', 1),
	(5, 'cherry', '/cherry', '2023-03-15 17:21:31', 2),
	(6, 'táo', '/apple', '2023-03-15 17:21:39', 2),
	(7, 'nho', '/grape', '2023-03-15 17:21:47', 2),
	(8, 'cam quýt', '/orange', '2023-03-15 17:21:57', 2),
	(9, 'lê', '/pear', '2023-03-15 17:22:08', 2),
	(10, 'hộp quà', '/gift', '2023-03-15 17:22:18', 3),
	(11, 'giỏ quà', '/biggift', '2023-03-15 17:22:34', 3),
	(12, 'quà 8/3', '/holidaygift', '2023-03-15 17:22:45', 3),
	(13, 'thực phẩm chức năng', '/functionalfood', '2023-03-15 17:22:54', 4),
	(14, 'bánh kẹo', '/candy', '2023-03-15 17:23:05', 4),
	(15, 'thực phẩm sạch', '/freshfood', '2023-03-15 17:23:15', 5),
	(16, 'kem', '/icecream', '2023-03-15 17:23:31', 5),
	(17, 'sữa', '/milk', '2023-03-15 17:23:40', 6),
	(18, 'đông trùng hạ thảo', '/cordyceps', '2023-03-15 17:23:49', 6),
	(19, 'nước ngọt & rượu', '/wine', '2023-03-15 17:23:59', 6);

-- Dumping structure for table db5.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL DEFAULT ' ',
  `username` varchar(255) NOT NULL DEFAULT ' ',
  `phone` varchar(255) NOT NULL DEFAULT ' ',
  `password` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL DEFAULT 'https://nhungdieuthuvi.com/wp-content/uploads/2021/08/avartar-vit-vang-psyduck.jpg',
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  `refreshToken` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table db5.user: ~0 rows (approximately)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
