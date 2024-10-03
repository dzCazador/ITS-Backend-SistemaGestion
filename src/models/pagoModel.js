const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const Pago = sequelize.define('Pago', {
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
  },
  fechaCarga: {
      type: DataTypes.DATEONLY,
      allowNull: false,
  },
  fechaPago: {
      type: DataTypes.DATEONLY,
      allowNull: false,
  },
  descripcion: {
      type: DataTypes.STRING(100),
      allowNull: true,
  },
  registradoPor: {
      type: DataTypes.INTEGER,
      allowNull: false,
  },
  formaPagoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
  },
  usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
  },
  recibo: {
      type: DataTypes.STRING(255),
      allowNull: true,
  },
  monto: {
    type: DataTypes.FLOAT, // Se agregó el campo monto
    allowNull: false,
  },
  activo: {
    type: DataTypes.BOOLEAN, // Utiliza BOOLEAN para el campo tinyint(1)
    allowNull: false,
    defaultValue: true, // Valor por defecto
  },    
}, {
  tableName: 'pago',
  timestamps: false, // Cambiar a true si utilizas createdAt y updatedAt
});

// Definición de asociaciones si las tienes
Pago.associate = (models) => {
  Pago.belongsTo(models.Usuario, { foreignKey: 'registradoPor' });
  Pago.belongsTo(models.FormaPago, { foreignKey: 'formaPagoId' });
  Pago.belongsTo(models.Usuario, { foreignKey: 'usuarioId' });
};

module.exports = Pago;