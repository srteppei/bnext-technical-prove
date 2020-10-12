CREATE TABLE `user` (
  `user_id` int PRIMARY KEY AUTO_INCREMENT,
  `nickname` varchar(20) NOT NULL UNIQUE,
  `password` varchar(250) NOT NULL
);