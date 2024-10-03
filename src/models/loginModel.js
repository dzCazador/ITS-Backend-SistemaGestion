const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const Login = sequelize.define('Login', {
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Usuario', // Nombre del modelo
      key: 'id'
    }
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'login',
  timestamps: false,
  primaryKey: false,
  autoIncrement: false
});

// Establecer la asociación con el modelo Usuario
Login.associate = (models) => {
  Login.belongsTo(models.Usuario, {
    foreignKey: 'usuarioId',
    as: 'usuario'
  });
};

module.exports = Login;
