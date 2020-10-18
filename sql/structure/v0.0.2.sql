CREATE TABLE `contact_book` (
  `contact_book_id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `contact_name` VARCHAR(200) NOT NULL,
  `phone` INT(9) NOT NULL,
  CONSTRAINT `fk_contact_book_user` FOREIGN KEY (user_id) REFERENCES user (user_id)
);