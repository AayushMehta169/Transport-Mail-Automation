-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 16, 2020 at 12:42 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.2.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `transport`
--

-- --------------------------------------------------------

--
-- Table structure for table `test1`
--

CREATE TABLE `test1` (
  `ZONE` varchar(255) DEFAULT NULL,
  `LOCATION_CODE` varchar(255) DEFAULT NULL,
  `TANK_TRUCK_NUMBER` varchar(255) DEFAULT NULL,
  `TRANSPORTER_CODE` varchar(255) DEFAULT NULL,
  `TRANSPORTER_NAME` varchar(255) DEFAULT NULL,
  `TOTAL_NO_OF_TRIPS` varchar(255) DEFAULT NULL,
  `TOTAL_TRIPS_WITH_VOILATION` varchar(255) DEFAULT NULL,
  `NO_OF_SPEED_VOILATIONS` varchar(255) DEFAULT NULL,
  `NO_OF_STOPPAGE_VOILATIONS` varchar(255) DEFAULT NULL,
  `NO_OF_ROUTE_VOILATIONS` varchar(255) DEFAULT NULL,
  `FROM_DATE` varchar(255) DEFAULT NULL,
  `TO_DATE` varchar(255) DEFAULT NULL,
  `EMAIL` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `test1`
--

INSERT INTO `test1` (`ZONE`, `LOCATION_CODE`, `TANK_TRUCK_NUMBER`, `TRANSPORTER_CODE`, `TRANSPORTER_NAME`, `TOTAL_NO_OF_TRIPS`, `TOTAL_TRIPS_WITH_VOILATION`, `NO_OF_SPEED_VOILATIONS`, `NO_OF_STOPPAGE_VOILATIONS`, `NO_OF_ROUTE_VOILATIONS`, `FROM_DATE`, `TO_DATE`, `EMAIL`) VALUES
('North', '1', '101', '111', 'Ramesh', '6', '4', '1', '2', '1', '11', '12', 'sample1@example.com'),
('North', '1', '102', '112', 'Chandu', '5', '4', '2', '2', '0', NULL, NULL, 'sample2@example.com'),
('North', '1', '103', '113', 'Raj', '7', '2', '1', '0', '1', NULL, NULL, 'sample3@example.com'),
('North', '1', '104', '114', 'Shikhar', '2', '4', '2', '1', '1', NULL, NULL, 'sample4@example.com'),
('North', '1', '105', '115', 'Chitwan', '3', '1', '1', '0', '0', NULL, NULL, 'sample5@example.com');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
