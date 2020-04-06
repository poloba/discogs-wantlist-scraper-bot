CREATE DATABASE 'scrapy';

CREATE TABLE `discogs` (
    `id` int(10) NOT NULL,
    `idItem` int(20) DEFAULT NULL,
    `notificationPushed` tinyint(1) NOT NULL DEFAULT '0',
    `artist` varchar(255) NOT NULL,
    `description` varchar(255) NOT NULL DEFAULT '',
    `price` varchar(255) NOT NULL,
    `image` varchar(255) NOT NULL,
    `urlCart` varchar(255) NOT NULL,
    `urlRelease` varchar(255) NOT NULL,
    `urlDetails` varchar(255) NOT NULL,
    `location` varchar(255) NOT NULL,
    `conditionMedia` varchar(255) NOT NULL,
    `conditionSleeve` varchar(255) NOT NULL,
    `seller` varchar(255) NOT NULL,
    `sellerLink` varchar(255) NOT NULL,
    `sellerBlacklisted` int(2) DEFAULT NULL,
    `entryDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `discogs` ADD PRIMARY KEY (`id`);

CREATE TABLE `seller_blacklist` (
    `id` int(10) NOT NULL,
    `seller` varchar(255) NOT NULL,
    `entryDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `seller_blacklist` ADD PRIMARY KEY (`id`);