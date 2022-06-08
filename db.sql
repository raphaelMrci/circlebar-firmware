
--
-- Table structure for table `cocktails`
--

DROP TABLE IF EXISTS `cocktails`;
CREATE TABLE `cocktails` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` tinytext NOT NULL,
  `icon` int unsigned NOT NULL DEFAULT '0',
  `recipe` json NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `drinks`
--

DROP TABLE IF EXISTS `drinks`;
CREATE TABLE `drinks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` tinytext NOT NULL,
  `icon` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `slots`
--

DROP TABLE IF EXISTS `slots`;
CREATE TABLE `slots` (
  `id` int NOT NULL AUTO_INCREMENT,
  `drink_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `drink_id_idx` (`drink_id`),
  CONSTRAINT `drink_id` FOREIGN KEY (`drink_id`) REFERENCES `drinks` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
