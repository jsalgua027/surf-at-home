-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-12-2024 a las 13:42:02
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bd_surfathome`
--
CREATE DATABASE IF NOT EXISTS `bd_surfathome` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `bd_surfathome`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id_categoria` int(11) NOT NULL,
  `nombre_categoria` varchar(255) NOT NULL,
  `foto_categoria` varchar(255) DEFAULT NULL,
  `descripcion_categoria` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id_categoria`, `nombre_categoria`, `foto_categoria`, `descripcion_categoria`) VALUES
(1, 'SURF', 'inicio/Inicio_surf.jpg', 'Los surfistas buscan capturar la energía de las olas, deslizarse sobre ellas con gracia y habilidad, y experimentar una conexión única con el océano. Este deporte no solo requiere destreza física y equilibrio, sino también una profunda comprensión de las condiciones marinas y el comportamiento de las olas. Ya sea que busques la adrenalina de enfrentar grandes olas o la tranquilidad de deslizarte sobre olas más pequeñas, el surf ofrece una experiencia única y gratificante para todos los niveles de habilidad'),
(2, 'BODYBOARD', 'inicio/Inicio_body.jpg', 'Nacido en Hawái en la década de 1970, el bodyboard se ha convertido en una actividad popular tanto para principiantes como para expertos debido a su accesibilidad y la emoción que ofrece. Los bodyboarders se acuestan boca abajo en sus tablas, utilizando aletas para impulsarse y maniobrar. Este deporte permite ejecutar una variedad de maniobras, desde simples deslizamientos hasta complejos trucos aéreos, proporcionando una experiencia emocionante y dinámica en el agua. Ideal para quienes buscan adrenalina o simplemente disfrutar del mar, el bodyboard es una forma estupenda de conectar con el océano y experimentar su poder y belleza.'),
(3, 'SKATE', 'inicio/Inicio_Skate.jpg', 'Surgido en las calles de California en la década de 1950, el skate ha evolucionado desde una actividad de ocio hasta convertirse en un deporte globalmente reconocido con su propia cultura y estilo de vida. Los skaters utilizan las tablas para realizar una variedad de trucos y acrobacias, desde simples deslizamientos hasta complejas maniobras aéreas, utilizando rampas, barandillas y otros elementos urbanos. Este deporte no solo ofrece una forma divertida de mantenerse activo y mejorar la coordinación, sino que también fomenta una comunidad vibrante y creativa que valora la expresión personal y la innovación.'),
(4, 'NEOPRENOS', 'inicio/Inicio_neoprenos.jpg', 'Diseñados con un material elástico y aislante, los neoprenos mantienen el calor corporal, permitiendo a los surfistas, bodyboarders y otros entusiastas del agua prolongar su tiempo en el mar sin sentir el frío. Además de proporcionar aislamiento térmico, los trajes de neopreno también ofrecen una capa adicional de protección contra rozaduras y golpes. Con diferentes grosores y estilos, desde trajes completos hasta shortys, los neoprenos se adaptan a diversas condiciones y preferencias personales. Ya sea que estés surfeando olas en invierno o disfrutando de un día de paddle surf.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `id_pedido` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `estado_pedido` enum('pendiente','completado','cancelado') NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `total` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido_producto`
--

CREATE TABLE `pedido_producto` (
  `id_pedido` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `id_producto` int(11) NOT NULL,
  `marca_producto` varchar(255) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `foto_producto` varchar(255) DEFAULT NULL,
  `id_categoria` int(11) DEFAULT NULL,
  `stock` int(11) NOT NULL,
  `descripcion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`id_producto`, `marca_producto`, `precio`, `foto_producto`, `id_categoria`, `stock`, `descripcion`) VALUES
(44, 'NSP', 476.00, '1/TablasIniciacion/Modelo1/imagen1.webp', 1, 10, 'Tabla de surf NSP Double Up Protech Blue Tint'),
(45, 'NSP', 391.00, '1/TablasIniciacion/Modelo2/imagen1.webp', 1, 10, 'Tabla de surf NSP funboard Protech Navy Tint'),
(46, 'QUIKSILVER', 395.00, '1/TablasIniciacion/Modelo3/imagen1.webp', 1, 10, 'Tabla de surf softboard Quiksilver The Break'),
(47, 'CATCH', 559.00, '1/TablasIniciacion/Modelo4/imagen1.webp', 1, 10, 'Tabla softboard Catch Surf Lost Crowd killer'),
(48, 'CATCH', 449.00, '1/TablasIniciacion/Modelo5/imagen1.webp', 1, 10, 'Tabla softboard Catch Surf Odysea Log'),
(49, 'CATCH', 529.00, '1/TablasIniciacion/Modelo6/imagen1.webp', 1, 10, 'Tabla softboard Catch Surf Odysea Log Johnny Redmond'),
(50, 'CATCH', 449.00, '1/TablasIniciacion/Modelo7/imagen1.webp', 1, 10, 'Tabla softboard Catch Surf Odysea Log Kalani Robb'),
(51, 'CATCH', 529.00, '1/TablasIniciacion/Modelo8/imagen1.webp', 1, 10, 'Tabla softboard Catch Surf Odysea Log Taj Burrow'),
(52, 'CATCH', 529.00, '1/TablasIniciacion/Modelo9/imagen1.webp', 1, 10, 'Tabla softboard Catch Surf Odysea Log Tyler Stanaland'),
(53, 'OCEAN&EARTH', 325.00, '1/TablasIniciacion/Modelo10/imagen1.webp', 1, 10, 'Tabla softboard Ocean & Earth EZI-Rider Mini-Malibu Pastel Blue'),
(54, 'OCEAN&EARTH', 326.00, '1/TablasIniciacion/Modelo11/imagen1.webp', 1, 10, 'Tabla softboard Ocean & Earth EZI-Rider Mini-Malibu Pastel Pink'),
(55, 'NSP', 485.00, '1/TablasIniciacion/Modelo12/imagen1.webp', 1, 10, 'Tabla surf evolutiva NSP funboard Elements White'),
(56, 'MS', 439.00, '1/TablasEvolutivas/Modelo1/imagen1.webp', 1, 10, 'Tabla de surf evolutiva MS Easy Pony'),
(57, 'MS', 444.00, '1/TablasEvolutivas/Modelo2/imagen1.webp', 1, 10, 'Tabla de surf evolutiva MS Easy PonyB'),
(58, 'MS', 439.00, '1/TablasEvolutivas/Modelo3/imagen1.webp', 1, 10, 'Tabla de surf evolutiva MS Mad Cow'),
(59, 'ZERO', 349.00, '1/TablasEvolutivas/Modelo4/imagen1.webp', 1, 10, 'Tabla de surf evolutiva ZERO'),
(60, 'QUIKSILVER', 575.00, '1/TablasEvolutivas/Modelo5/imagen1.webp', 1, 10, 'Tabla de surf Quiksilver Discus'),
(61, 'SOUL', 519.00, '1/TablasEvolutivas/Modelo6/imagen1.webp', 1, 10, 'Tabla de surf SOUL Evolution'),
(62, 'SOUL', 509.00, '1/TablasEvolutivas/Modelo7/imagen1.webp', 1, 10, 'Tabla de surf SOUL Middle Single'),
(63, 'TORQ', 829.00, '1/TablasEvolutivas/Modelo8/imagen1.webp', 1, 10, 'Tabla de surf Torq Channel Island Chancho'),
(64, 'TORQ', 589.00, '1/TablasEvolutivas/Modelo9/imagen1.webp', 1, 10, 'Tabla de surf Torq Funboard Carbon Strip'),
(65, 'TORQ', 625.00, '1/TablasEvolutivas/Modelo10/imagen1.webp', 1, 10, 'Tabla de surf Torq Funboard Fade'),
(66, 'TORQ', 539.00, '1/TablasEvolutivas/Modelo11/imagen1.webp', 1, 10, 'Tabla de surf Torq Funboard Pinline Color'),
(67, 'TORQ', 575.00, '1/TablasEvolutivas/Modelo12/imagen1.webp', 1, 10, 'Tabla de surf Torq Funboard Pinline Colour'),
(68, 'SOUL', 734.00, '1/TablasLongboard/Modelo1/imagen1.webp', 1, 5, 'Longboard Soul Buzzy'),
(69, 'SOUL', 734.00, '1/TablasLongboard/Modelo2/imagen1.webp', 1, 5, 'Longboard Soul Hutcho'),
(70, 'SOUL', 734.00, '1/TablasLongboard/Modelo3/imagen1.webp', 1, 5, 'Longboard Soul Pro Model'),
(71, 'EMERY', 700.00, '1/TablasLongboard/Modelo4/imagen1.webp', 1, 5, 'Tabla de surf EMERY Retro Bay Mal'),
(72, 'FIREWIRE', 1040.00, '1/TablasLongboard/Modelo5/imagen1.webp', 1, 3, 'Tabla de surf Firewire Special T'),
(73, 'FIREWIRE', 1545.00, '1/TablasLongboard/Modelo6/imagen1.webp', 1, 2, 'Tabla de surf Firewire Special T Red'),
(74, 'NSP', 459.00, '1/TablasLongboard/Modelo7/imagen1.webp', 1, 5, 'Tabla Longboard NSP Protech Red Tint'),
(75, 'LOST', 744.00, '1/TablasShortBoard/Modelo1/imagen1.webp', 1, 5, 'Tabla de surf Lost Rad Ripper'),
(76, 'NSP', 465.00, '1/TablasShortBoard/Modelo2/imagen1.webp', 1, 5, 'Tabla de surf NSP Tinder Protech Papaya Tint'),
(77, 'PUKAS', 745.00, '1/TablasShortBoard/Modelo3/imagen1.webp', 1, 2, 'Tabla de surf Pukas Darker'),
(78, 'PYZEL', 765.00, '1/TablasShortBoard/Modelo4/imagen1.webp', 1, 3, 'Tabla de surf Pyzel Ghost'),
(79, 'PYZEL', 765.00, '1/TablasShortBoard/Modelo5/imagen1.webp', 1, 3, 'Tabla de surf Pyzel JJF Slab 2.0'),
(80, 'PYZEL', 765.00, '1/TablasShortBoard/Modelo6/imagen1.webp', 1, 3, 'Tabla de surf Pyzel Phantom'),
(81, 'SIMON.A', 660.00, '1/TablasShortBoard/Modelo7/imagen1.webp', 1, 3, 'Tabla de surf Simon Anderson Single Flyer'),
(82, 'SOUL', 800.00, '1/TablasShortBoard/Modelo8/imagen1.webp', 1, 2, 'tabla de surf Soul Black Bird'),
(83, 'T.PATTERSON', 850.00, '1/TablasShortBoard/Modelo9/imagen1.webp', 1, 1, 'Tabla de surf T. Patterson Five Speed EPS'),
(84, 'T.PATTERSON', 750.00, '1/TablasShortBoard/Modelo10/imagen1.webp', 1, 1, 'Tabla de surf T. Patterson Italo Ferreira'),
(85, 'T.PATTERSON', 750.00, '1/TablasShortBoard/Modelo11/imagen1.webp', 1, 1, 'Tabla de surf T. Patterson Synthetic 84'),
(86, 'RNF', 829.00, '1/TablasShortBoard/Modelo12/imagen1.webp', 1, 1, 'Tabla Lost RNF Redux Carbon Wrap'),
(87, 'PRIDE', 129.00, '2/TablasPE/Modelo1/imagen1.webp', 2, 3, 'Tabla de body Pride Stereo PE HD BlueWhite'),
(88, 'PRIDE', 129.00, '2/TablasPE/Modelo2/imagen1.webp', 2, 3, 'Tabla de body Pride Stereo PE HD RedGrey'),
(89, 'PRIDE', 129.00, '2/TablasPE/Modelo3/imagen1.webp', 2, 3, 'Tabla de body Pride Stereo PE HD WhiteElectric Blue'),
(90, 'PRIDE', 147.00, '2/TablasPE/Modelo4/imagen1.webp', 2, 3, 'Tabla de bodyboard Pride Answer Mini PE MidnightBlack'),
(91, 'PRIDE', 147.00, '2/TablasPE/Modelo5/imagen1.webp', 2, 3, 'Tabla de bodyboard Pride Answer Mini PE PinkBlack'),
(92, 'PRIDE', 159.00, '2/TablasPE/Modelo6/imagen1.webp', 2, 3, 'Tabla de Bodyboard Pride Mini Timeless PE + HD BlackElectric Blue'),
(93, 'PRIDE', 169.00, '2/TablasPE/Modelo7/imagen1.webp', 2, 3, 'Tabla de Bodyboard Pride Timeless PE + HD Deep Sea GreenWhite'),
(94, 'PRIDE', 169.00, '2/TablasPE/Modelo8/imagen1.webp', 2, 3, 'Tabla de Bodyboard Pride Timeless PE + HD Retro Yellow'),
(95, 'FUNKSHEN', 209.00, '2/TablasPP/Modelo1/imagen1.webp', 2, 3, 'Bodyboard Funkshen Chase O\'Leary Graphic Contour PP Mallard GreenWhite'),
(96, 'FUNKSHEN', 230.00, '2/TablasPP/Modelo2/imagen1.webp', 2, 3, 'Bodyboard Funkshen Chase O\'Leary Premium Skintec PP WhiteWhite'),
(97, 'PRIDE', 339.00, '2/TablasPP/Modelo3/imagen1.webp', 2, 3, 'Bodyboard Pride Answer PP SDC AquaMetalic Dark Grey'),
(98, 'PRIDE', 339.00, '2/TablasPP/Modelo4/imagen1.webp', 2, 3, 'Bodyboard Pride Guru PP SNPP SDC GreyGrey'),
(99, 'PRIDE', 289.00, '2/TablasPP/Modelo5/imagen1.webp', 2, 3, 'Bodyboard Pride Realest PP+HD BlackBlack'),
(100, 'PRIDE', 293.00, '2/TablasPP/Modelo6/imagen1.webp', 2, 3, 'Bodyboard Pride Realest SDC Radial Flex Retro'),
(101, 'PRIDE', 400.00, '2/TablasPP/Modelo7/imagen1.webp', 2, 3, 'Bodyboard Pride Realest SDC Radial Flex Retro Black'),
(102, 'PRIDE', 249.00, '2/TablasPP/Modelo8/imagen1.webp', 2, 3, 'Tabla de Bodyboard Pride Timeless PP + HD YellowOrange'),
(103, 'CREATURES', 34.00, '2/Fundas/Modelo1/imagen1.webp', 2, 10, 'Funda calcetin de bodyboard Creatures Icon sox'),
(104, 'PRIDE', 35.00, '2/Fundas/Modelo2/imagen1.webp', 2, 10, 'Funda calcetin Pride Premium'),
(105, 'OCEAN', 39.90, '2/Fundas/Modelo3/imagen1.webp', 2, 10, 'Funda de bodyboard calcetin Ocean & Earth'),
(106, 'SNIPER', 38.00, '2/Fundas/Modelo4/imagen1.webp', 2, 10, 'Funda de bodyboard calcetin Sniper'),
(107, 'THRASH', 31.00, '2/Fundas/Modelo5/imagen1.webp', 2, 10, 'Funda de bodyboard calcetin Thrash'),
(108, 'THRASH', 31.00, '2/Fundas/Modelo6/imagen1.webp', 2, 10, 'Funda de bodyboard calcetin Thrash Stripe'),
(109, 'STRETCH', 35.00, '2/Fundas/Modelo7/imagen1.webp', 2, 10, 'Funda Limited Edition Stretch Cover'),
(110, 'STRETCH', 35.00, '2/Fundas/Modelo8/imagen1.webp', 2, 10, 'Funda Limited Edition Stretch Cover Stripe'),
(111, 'VIPER', 34.00, '2/Aletas/Modelo1/imagen1.webp', 2, 10, 'Aletas bodyboard Viper MS Naranja'),
(112, 'HUBBOARD', 69.00, '2/Aletas/Modelo2/imagen1.webp', 2, 10, 'Aletas de bodyboard Hubboard AirHubb Cut Grey'),
(113, 'MATT LACKEY', 65.00, '2/Aletas/Modelo3/imagen1.webp', 2, 10, 'Aletas de bodyboard Limited Edition Matt Lackey'),
(114, 'VIPER', 80.00, '2/Aletas/Modelo4/imagen1.webp', 2, 10, 'Aletas de Bodyboard Viper V5'),
(115, 'PRIDE', 75.00, '2/Aletas/Modelo5/imagen1.webp', 2, 10, 'Aletas Pride Vulcan V3 AzulAmarillo'),
(116, 'VIPER', 34.00, '2/Aletas/Modelo6/imagen1.webp', 2, 10, 'Aletas Viper MS Amarilla'),
(117, 'ALOIKI', 71.92, '3/SkateBoards/Modelo1/imagen1.webp', 3, 6, 'Skateboard Aloiki Ukiyo 7.87″'),
(118, 'CRUZADE', 87.92, '3/SkateBoards/Modelo2/imagen1.webp', 3, 6, 'Skateboard completo Cruzade Chop'),
(119, 'CRUZADE', 87.92, '3/SkateBoards/Modelo3/imagen1.webp', 3, 6, 'Skateboard completo Cruzade Smashing Punk'),
(120, 'CRUZADE', 109.90, '3/SkateBoards/Modelo4/imagen1.webp', 3, 6, 'Skateboard completo Cruzade Your Favorite'),
(121, 'FLIP', 139.90, '3/SkateBoards/Modelo5/imagen1.webp', 3, 6, 'Skateboard completo Flip Odyssey'),
(122, 'JART', 103.95, '3/SkateBoards/Modelo6/imagen1.webp', 3, 6, 'Skateboard completo Jart Classic'),
(123, 'JART', 129.95, '3/SkateBoards/Modelo7/imagen1.webp', 3, 6, 'Skateboard completo Jart Classic'),
(124, 'PLAN B', 111.92, '3/SkateBoards/Modelo8/imagen1.webp', 3, 6, 'Skateboard Plan B Bumble 7.75″'),
(125, 'QUIKSILVER', 89.00, '3/SkateBoards/Modelo9/imagen1.webp', 3, 6, 'Skateboard Quiksilver Trips'),
(126, 'SK8MAFIA', 139.90, '3/SkateBoards/Modelo10/imagen1.webp', 3, 6, 'Skateboard Sk8mafia House Logo Fluor'),
(127, 'SK8MAFIA', 111.92, '3/SkateBoards/Modelo11/imagen1.webp', 3, 6, 'Skateboard Sk8mafia OG Logo watercolor'),
(128, 'SK8MAFIA', 111.92, '3/SkateBoards/Modelo12/imagen1.webp', 3, 6, 'Skateboard Sk8mafia Sun Ramirez'),
(129, 'CARVER', 209.00, '3/SurfSkate/Modelo1/imagen1.webp', 3, 4, 'Surfskate Carver CI Happy 30.75\'\' Cx'),
(130, 'YOW', 329.00, '3/SurfSkate/Modelo2/imagen1.webp', 3, 4, 'Surfskate Yow Fanning Falcon Driver 32.5\'\''),
(131, 'YOW', 329.00, '3/SurfSkate/Modelo3/imagen1.webp', 3, 4, 'Surfskate Yow Fanning Falcon Performer 33.5\'\''),
(132, 'YOW', 299.00, '3/SurfSkate/Modelo4/imagen1.webp', 3, 4, 'Surfskate Yow Hossegor 29\'\''),
(133, 'YOW', 239.00, '3/SurfSkate/Modelo5/imagen1.webp', 3, 4, 'Surfskate Yow Medina Bengal 33″'),
(134, 'YOW', 279.99, '3/SurfSkate/Modelo6/imagen1.webp', 3, 4, 'Surfskate Yow Medina Panthera 33.5″'),
(135, 'YOW', 269.95, '3/SurfSkate/Modelo7/imagen1.webp', 3, 4, 'Surfskate Yow Pipe 32\'\''),
(136, 'YOW', 329.00, '3/SurfSkate/Modelo8/imagen1.webp', 3, 4, 'Surfskate Yow Waikiki 40\'\''),
(137, 'RIP CURL', 174.99, '4/Mujer/Modelo1/imagen1.webp', 4, 6, 'Neopreno Rip Curl Dawn Patrol 32mm Womens BZ'),
(138, 'RIP CURL', 181.99, '4/Mujer/Modelo2/imagen1.webp', 4, 6, 'Neopreno Rip Curl Dawn Patrol 32mm Womens CZ'),
(139, 'RIP CURL', 307.99, '4/Mujer/Modelo3/imagen1.webp', 4, 6, 'Neopreno Rip Curl Dawn Patrol 43mm Womens CZ'),
(140, 'RIP CURL', 259.99, '4/Mujer/Modelo4/imagen1.webp', 4, 6, 'Neopreno Rip Curl Dawn Patrol Performance'),
(141, 'RIP CURL', 111.99, '4/Mujer/Modelo5/imagen1.webp', 4, 6, 'Shorty Rip Curl Dawn Patrol 2mm Womens LS'),
(142, 'RIP CURL', 103.46, '4/Mujer/Modelo6/imagen1.webp', 4, 6, 'Traje de neopreno Rip Curl G Bomb 1mm Boyleg'),
(143, 'BILLABONG', 309.95, '4/Mujer/Modelo7/imagen1.webp', 4, 6, 'Traje neopreno Billabong Synergy Natural'),
(144, 'RIP CURL', 239.30, '4/Mujer/Modelo8/imagen1.webp', 4, 6, 'Traje Rip Curl Dawn Patrol 43mm Women CZ'),
(145, 'HURLEY', 29.96, '4/Hombre/Modelo1/imagen1.webp', 4, 6, 'Lycra de surf Hurley One and Only Quickdry'),
(146, 'O`NEILL', 27.17, '4/Hombre/Modelo2/imagen1.webp', 4, 6, 'Lycra O´Neill Premium Skins'),
(147, 'BILLABONG', 359.95, '4/Hombre/Modelo3/imagen1.webp', 4, 6, 'Neopreno Billabong Revolution Natural CZ'),
(148, 'O`NEILL', 244.95, '4/Hombre/Modelo4/imagen1.webp', 4, 6, 'Neopreno O´Neill Epic 43mm CZ BlackBlack'),
(149, 'RIP CURL', 219.99, '4/Hombre/Modelo5/imagen1.webp', 4, 6, 'Neopreno Rip Curl Omega 43mm Black'),
(150, 'RIP CURL', 55.99, '4/Hombre/Modelo6/imagen1.webp', 4, 6, 'Neopreno Shorty Rip Curl Omega'),
(151, 'O`NEILL', 123.96, '4/Hombre/Modelo7/imagen1.webp', 4, 6, 'Shorty O´Neill Hammer 2mm LS'),
(152, 'RIP CURL', 209.33, '4/Hombre/Modelo8/imagen1.webp', 4, 6, 'Traje Rip Curl Dawn Patrol Perf 43mm');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `tipo` enum('cliente','administrador') NOT NULL,
  `token` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `email`, `password`, `nombre`, `direccion`, `telefono`, `tipo`, `token`) VALUES
(1, 'admin@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 'admin', 'admin-direccion', '985651262', 'administrador', NULL),
(2, 'usuario@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b', 'usuario', 'usuario-direccion', '606855948', 'cliente', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indices de la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`id_pedido`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `pedido_producto`
--
ALTER TABLE `pedido_producto`
  ADD PRIMARY KEY (`id_pedido`,`id_producto`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id_producto`),
  ADD KEY `id_categoria` (`id_categoria`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `id_pedido` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=153;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `pedido_producto`
--
ALTER TABLE `pedido_producto`
  ADD CONSTRAINT `pedido_producto_ibfk_1` FOREIGN KEY (`id_pedido`) REFERENCES `pedido` (`id_pedido`),
  ADD CONSTRAINT `pedido_producto_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`);

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
