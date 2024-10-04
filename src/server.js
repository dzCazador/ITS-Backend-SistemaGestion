const app = require('./app'); // Importar la aplicación
const http = require('http');
const socketIo = require('socket.io');

const server = http.createServer(app); // Crear servidor HTTP a partir de la aplicación
const io = socketIo(server); // Configurar Socket.IO

// Iniciar el servidor
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${server.address().port}`);
});

// Configuración de Socket.IO
io.on('connection', (socket) => {
    console.log('Un administrador se ha conectado');
    // Cuando el cliente se desconecta
    socket.on('disconnect', () => {
        console.log('Un administrador se ha desconectado');
    });
});

// Función para emitir actualizaciones de registros a todos los clientes conectados
const emitirActualizacionDeRegistros = (registro) => {
    io.emit('actualizacionRegistro', registro); // Emite a todos los administradores conectados
};

// Exportar la función para uso en otros archivos
module.exports = { emitirActualizacionDeRegistros, server }; // Opcional, si necesitas el servidor en otro archivo
