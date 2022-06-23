CREATE DATABASE  IF NOT EXISTS `circlebar`;
USE `circlebar`;

DROP TABLE IF EXISTS `drinks`;
CREATE TABLE `drinks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` tinytext NOT NULL,
  `icon` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16;


DROP TABLE IF EXISTS `cocktails`;
CREATE TABLE `cocktails` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` tinytext NOT NULL,
  `icon` int unsigned NOT NULL DEFAULT '0',
  `recipe` json NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9;

DROP TABLE IF EXISTS `slots`;
CREATE TABLE `slots` (
  `id` int NOT NULL,
  `drink_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `drink_id_idx` (`drink_id`),
  CONSTRAINT `drink_id` FOREIGN KEY (`drink_id`) REFERENCES `drinks` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB;