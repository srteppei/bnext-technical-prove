CREATE TABLE `contact_book` {
  `contact_book_id` INT PRIMARY KEY AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `contact_name` VARCHAR(200) NOT NULL,
  `phone` INT(9) NOT NULL
}