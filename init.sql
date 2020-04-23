USE `scrapy`;

CREATE TABLE `discogs` (
    `id` int(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `id_discogs` int(20) DEFAULT NULL,
    `artist` varchar(255) NOT NULL,
    `description` varchar(255) NOT NULL DEFAULT '',
    `price` varchar(255) NOT NULL,
    `image` varchar(255) NOT NULL,
    `url_cart` varchar(255) NOT NULL,
    `url_release` varchar(255) NOT NULL,
    `url_details` varchar(255) NOT NULL,
    `url_seller` varchar(255) NOT NULL,
    `seller` varchar(255) NOT NULL,
    `location` varchar(255) NOT NULL,
    `condition_media` varchar(255) NOT NULL,
    `condition_sleeve` varchar(255) NOT NULL,
    `telegram_message_pushed` tinyint(1) NOT NULL DEFAULT '0',
    `entry_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `seller_blacklist` (
    `id` int(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `seller` varchar(255) NOT NULL,
    `entry_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;