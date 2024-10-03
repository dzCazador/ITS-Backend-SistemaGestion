const jwt = require('jsonwebtoken');

function generarToken(user) {
    // Implementación del generador de token
    const payload = {
        id: user.id, 
        usuario: user.nombre
    };    
    return jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '1h'})    
}

function validarToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'Token no proporcionado' });
    jwt.verify(token, process.env.SECRET_KEY,(error,user) => {
        if (error) 
            return res.status(403).json({ message: 'Token inválido' });
        req.user = user; // Agregar el usuario a la request para su uso posterior
        next();
    });
}

// codigo para exportar ambas funciones
module.exports = {
    generarToken,
    validarToken
}

