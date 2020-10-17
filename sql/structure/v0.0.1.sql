CREATE TABLE `user` (
  `user_id` int PRIMARY KEY AUTO_INCREMENT,
  `nickname` varchar(20) NOT NULL UNIQUE,
  `password` varchar(250) NOT NULL,
  `name` varchar(100) NOT NULL,
  `last_name` VARCHAR(100) NOT NULL,
  `phone` int(9) NOT NULL UNIQUE
);