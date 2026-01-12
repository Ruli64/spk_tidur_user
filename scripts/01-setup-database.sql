-- Create database
CREATE DATABASE IF NOT EXISTS sleep_advisor;
USE sleep_advisor;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create recommendations table
CREATE TABLE IF NOT EXISTS recommendations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  age INT NOT NULL,
  wake_up_time VARCHAR(5) NOT NULL,
  activity_level ENUM('low', 'medium', 'high') NOT NULL,
  health_status ENUM('fit', 'unfit') NOT NULL,
  stress_level ENUM('low', 'medium', 'high'),
  screen_time ENUM('minimal', 'moderate', 'high'),
  bedtime VARCHAR(5),
  sleep_duration DECIMAL(3, 1),
  score DECIMAL(3, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create index for faster queries
CREATE INDEX idx_user_id ON recommendations(user_id);
CREATE INDEX idx_created_at ON recommendations(created_at DESC);
