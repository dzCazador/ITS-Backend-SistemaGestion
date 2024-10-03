CREATE DATABASE `backend` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci */;

-- backend.formapago definition

CREATE TABLE `formapago` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- backend.rol definition

CREATE TABLE `rol` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;


-- backend.usuario definition

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `rolId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_rol_FK` (`rolId`),
  CONSTRAINT `usuario_rol_FK` FOREIGN KEY (`rolId`) REFERENCES `rol` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- backend.login definition

CREATE TABLE `login` (
  `usuarioId` int(11) DEFAULT NULL,
  `fecha` datetime NOT NULL,
  KEY `login_usuario_FK` (`usuarioId`),
  CONSTRAINT `login_usuario_FK` FOREIGN KEY (`usuarioId`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- backend.pago definition

CREATE TABLE `pago` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fechaCarga` date NOT NULL,
  `fechaPago` date NOT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  `registradoPor` int(11) NOT NULL,
  `formaPagoId` int(11) NOT NULL,
  `usuarioId` int(11) NOT NULL,
  `recibo` varchar(255) DEFAULT NULL,
  `monto` float NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `pagos_usuario_FK` (`registradoPor`),
  KEY `pagos_formapago_FK` (`formaPagoId`),
  KEY `pago_usuario_FK` (`usuarioId`),
  CONSTRAINT `pago_usuario_FK` FOREIGN KEY (`usuarioId`) REFERENCES `usuario` (`id`),
  CONSTRAINT `pagos_formapago_FK` FOREIGN KEY (`formaPagoId`) REFERENCES `formapago` (`id`),
  CONSTRAINT `pagos_usuario_FK` FOREIGN KEY (`registradoPor`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

INSERT INTO backend.rol (nombre) VALUES
	 ('Rol Estandar'),
	 ('Rol Admin'),
	 ('Rol SuperAdmin');
	
INSERT INTO backend.formapago (descripcion) VALUES
	 ('Efectivo'),
	 ('Transferencia'),
	 ('Tarjeta Credito');
	
INSERT INTO backend.usuario (nombre,correo,password,rolId) VALUES
	 ('dzCazador','ctestaseca@hotmail.com','$2b$10$MRHJPnMtxoQAghmiaD57BuJVuPEXK6txb754akcTALLl0Kl2DrkvG',1),
	 ('manuLPDA','manuLPDA@gmail.com','$2b$10$RavhIp8t8FtkQO3I4vOmku77b6SRvcChL6C7oSVg4EHHXOxYqqZUC',2);

INSERT INTO backend.pago (fechaCarga,fechaPago,descripcion,registradoPor,formaPagoId,usuarioId,recibo,monto,activo) VALUES
	 ('2024-03-02','2024-03-03','Pago Todes!',2,1,2,'efd3b4f0-f0e5-4a18-a607-c0ee5b41b2ab.pdf',0.0,0),
	 ('2024-03-02','2024-03-03','Pago Manu',2,1,3,'2ba35e57-7ed1-44bb-88e5-66c23c81cd37.pdf',5000.0,1),
	 ('2024-03-02','2024-03-03','Pago Manu 2',2,2,3,NULL,25000.0,0);