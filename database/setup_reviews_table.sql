CREATE TABLE IF NOT EXISTS `reviews` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `estrellas` int(1) NOT NULL,
  `tour_id` varchar(100) NOT NULL,
  `comentario` text NOT NULL,
  `ig_user` varchar(100) DEFAULT NULL,
  `autorizacion_fotos` tinyint(1) NOT NULL DEFAULT 0,
  `aprobado` tinyint(1) NOT NULL DEFAULT 0,
  `fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
