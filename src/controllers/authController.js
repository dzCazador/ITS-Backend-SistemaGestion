require('dotenv').config();
const objUsuario = require('../models/usuarioModel');
const {generarToken,validarToken} = require('../middleware/jsonwebtoken');
const bcrypt = require('bcrypt'); // Asegúrate de tener bcrypt instalado
const { Op } = require('sequelize');
const objLogin = require('../models/LoginModel');

const jwt = require('jsonwebtoken');

// Controlador para obtener todos los Pagos
exports.authorization = async (req, res) => {
  const { nombre, password } = req.body;

  try {
    // Buscar el usuario en la base de datos

    const user = await objUsuario.findOne({
        where: {
            nombre: {
                [Op.like]: `%${nombre}%` // Búsqueda parcial
            }
        }
    });
    
    // Verificar si el usuario existe
    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }
    

    // Validar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Si todo es correcto, generar el token
    const accessToken = generarToken(user);
    const fechaActual = new Date();
    const usuarioId = user.id;

    //Creamos Registro de Login
    /*
    Da error de Id en la tabla login a pesar que esta bien configurado el modelo 
    const newLogin = await objLogin.create({
        usuarioId: usuarioId,
        fecha: fechaActual
    });
*/
    
    res.status(200).json({ accessToken, message: 'Acceso Correcto' });
    
  } catch (error) {
    console.error(error); // Loguear el error en el servidor
    res.status(500).json({ message: 'Error en el servidor' });
  }
};


exports.isAdmin = async (req, res, next) => {

    const token = req.headers['authorization'];
    
    if (!token) {
        return res.status(401).json({ error: 'Token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        //buscar el usuario decoded
        
        const user = await objUsuario.findOne({
            where: {
                nombre: {
                    [Op.like]: `%${decoded.usuario}%` // Búsqueda parcial
                }
            }
        });

        
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        
        if (user.rolId!== 2) { // Rol 2 es Admin
            return res.status(403).json({ error: 'No tienes permisos para acceder a esta ruta' });
        }
        next();

    } catch (error) {
        return res.status(401).json({ error: 'Token inválido' });
    }
};

