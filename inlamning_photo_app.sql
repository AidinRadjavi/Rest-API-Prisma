-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Värd: localhost:3306
-- Tid vid skapande: 19 feb 2024 kl 19:22
-- Serverversion: 5.7.24
-- PHP-version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databas: `inlamning_photo_app`
--

-- --------------------------------------------------------

--
-- Tabellstruktur `album`
--

CREATE TABLE `album` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumpning av Data i tabell `album`
--

INSERT INTO `album` (`id`, `title`, `userId`) VALUES
(1, 'Hulk album 1', 7),
(2, 'Hulk album 2', 7),
(3, 'Spiderman album 1', 3),
(4, 'Spiderman album 2', 3),
(5, 'Spiderman album 3', 3),
(6, 'black widow 1', 5),
(7, 'black widow 2', 5),
(8, 'black widow 3', 5),
(9, 'black widow 4', 5),
(10, 'doctor strange 1', 6),
(11, 'doctor strange 2', 6),
(12, 'Lamborghini', 4),
(13, 'Spiderman album 4', 3),
(15, 'Spiderman Album 5', 3);

-- --------------------------------------------------------

--
-- Tabellstruktur `photo`
--

CREATE TABLE `photo` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `comment` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `userId` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumpning av Data i tabell `photo`
--

INSERT INTO `photo` (`id`, `title`, `url`, `comment`, `userId`) VALUES
(6, 'spiderman1', 'https://cdn.pixabay.com/photo/2023/06/18/02/59/ai-generated-8071119_1280.png', 'AI Generated Spiderman', 3),
(7, 'spiderman2', 'https://cdn.pixabay.com/photo/2022/07/24/16/40/background-7342022_1280.jpg', 'black spiderman', 3),
(8, 'spiderman3', 'https://cdn.pixabay.com/photo/2023/05/19/14/06/ai-generated-8004661_1280.jpg', 'silver spiderman', 3),
(9, 'Hulk1', 'https://cdn.pixabay.com/photo/2023/06/29/02/54/hulk-8095537_1280.png', 'AI Hulk', 7),
(10, 'testing 3', 'https://cdn.pixabay.com/photo/2023/06/28/20/04/ai-generated-8095124_1280.png', 'changed comment for testing', 7),
(11, 'Hulk3', 'https://cdn.pixabay.com/photo/2023/07/12/15/19/angry-hulk-8122726_1280.png', 'Hulk cooks food', 7),
(12, 'BlackWidow1', 'https://static.wikia.nocookie.net/marvelcinematicuniverse/images/9/9a/BlackWidow-EndgameProfile.jpg/revision/latest?cb=20231025163748', 'Black Widow fight', 5),
(13, 'BlackWidow2', 'https://live.staticflickr.com/7252/7122170865_542995ccaf_z.jpg', 'Black Widow Guns', 5),
(14, 'BlackWidow3', 'https://idsb.tmgrup.com.tr/ly/uploads/images/2021/07/01/125693.jpg', 'Black Widow Norway', 5),
(15, 'DoctorStrange1', 'https://images.nightcafe.studio/jobs/hsOpugqrFj9xiQdiMkWN/hsOpugqrFj9xiQdiMkWN--2--pne5r.jpg?tr=w-1600,c-at_max', 'Doctor Strange Angry', 6),
(16, 'DoctorStrange2', 'https://i.pinimg.com/originals/e7/a0/7c/e7a07cfe78532cf2478aa717cd240590.jpg', 'Doctor Strange Happy', 6),
(17, 'DoctorStrange3', 'https://storage.googleapis.com/pai-images/9248dd06c6cd4f6383eeabde16f07972.jpeg', 'Doctor Strange Ready To Fight', 6),
(18, 'Lamborghini Aventador SVJ', 'https://static.cdn-expressen.se/images/03/b8/03b88719d8db4cc3b0106f91e026780e/annan/2560.jpg', 'Lambo svj', 4),
(19, 'Lamborghini Huracan STO', 'https://www.carscoops.com/wp-content/uploads/2022/07/Lamborghini-Huracan.jpg', 'Lambo sto', 4),
(20, 'Lamborghini Urus Performante', 'https://i0.wp.com/citymagazine.si/wp-content/uploads/2022/08/lamborghini-urus-performante-8.jpg?fit=1920%2C1080&ssl=1', 'Lambo urus perf', 4);

-- --------------------------------------------------------

--
-- Tabellstruktur `user`
--

CREATE TABLE `user` (
  `id` int(10) UNSIGNED NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumpning av Data i tabell `user`
--

INSERT INTO `user` (`id`, `email`, `first_name`, `last_name`, `password`) VALUES
(3, 'peter@parker.com', 'Peter', 'Parker', '$2b$10$3EgIafG6qBbHcC3Yyb4ZQ.0Nli12TRw0TnvEUdVVtAzbSs0QVVm2C'),
(4, 'john@doe.com', 'John', 'Doe', '$2b$10$msN5LSz/yLWGDiRDa4/mqeegltuP45CJFvOKPcO94aY3scQTyF1T.'),
(5, 'black@widow.com', 'Black', 'Widow', '$2b$10$OKVmgO2fkIIEa7sb4On6ZeR8Ke6PdOBIbqToUESNnmvjIDAVwth32'),
(6, 'doctor@strange.com', 'Doctor', 'Strange', '$2b$10$vwa23eu2r.SYLsds2TJtNeOFk4ATd7VN3a1xPOst62I/8LN.aefT.'),
(7, 'bruce@banner.com', 'Bruce', 'Banner', '$2b$10$ucy4IGBxajTEJLhCdmTmYOs5Tim9sqyKI9Zf5pJDtKe364lzlVtiK');

-- --------------------------------------------------------

--
-- Tabellstruktur `_albumtophoto`
--

CREATE TABLE `_albumtophoto` (
  `A` int(10) UNSIGNED NOT NULL,
  `B` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumpning av Data i tabell `_albumtophoto`
--

INSERT INTO `_albumtophoto` (`A`, `B`) VALUES
(3, 6),
(4, 6),
(3, 7),
(5, 7),
(3, 8),
(4, 8),
(1, 9),
(1, 10),
(2, 11),
(6, 12),
(7, 12),
(9, 12),
(6, 13),
(8, 13),
(6, 14),
(7, 14),
(8, 14),
(10, 15),
(11, 15),
(10, 16),
(10, 17),
(11, 17),
(12, 18),
(12, 19),
(12, 20);

-- --------------------------------------------------------

--
-- Tabellstruktur `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumpning av Data i tabell `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('48255c78-7e92-4578-82a0-36b936db30ca', '5f714d8908bffca1844a9907b16a5f63f42101335a42f1060ec6fca40bd6dfb0', '2024-02-19 17:42:55.229', '20240219144202_new_file_for_migration_with_correct_names', NULL, NULL, '2024-02-19 17:42:54.965', 1);

--
-- Index för dumpade tabeller
--

--
-- Index för tabell `album`
--
ALTER TABLE `album`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Album_userId_fkey` (`userId`);

--
-- Index för tabell `photo`
--
ALTER TABLE `photo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Photo_userId_fkey` (`userId`);

--
-- Index för tabell `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_email_key` (`email`);

--
-- Index för tabell `_albumtophoto`
--
ALTER TABLE `_albumtophoto`
  ADD UNIQUE KEY `_AlbumToPhoto_AB_unique` (`A`,`B`),
  ADD KEY `_AlbumToPhoto_B_index` (`B`);

--
-- Index för tabell `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT för dumpade tabeller
--

--
-- AUTO_INCREMENT för tabell `album`
--
ALTER TABLE `album`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT för tabell `photo`
--
ALTER TABLE `photo`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT för tabell `user`
--
ALTER TABLE `user`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Restriktioner för dumpade tabeller
--

--
-- Restriktioner för tabell `album`
--
ALTER TABLE `album`
  ADD CONSTRAINT `Album_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Restriktioner för tabell `photo`
--
ALTER TABLE `photo`
  ADD CONSTRAINT `Photo_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Restriktioner för tabell `_albumtophoto`
--
ALTER TABLE `_albumtophoto`
  ADD CONSTRAINT `_AlbumToPhoto_A_fkey` FOREIGN KEY (`A`) REFERENCES `album` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `_AlbumToPhoto_B_fkey` FOREIGN KEY (`B`) REFERENCES `photo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
