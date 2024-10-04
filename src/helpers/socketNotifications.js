
const emitirActualizacionDeRegistros = (registro) => {
    io.emit('actualizacionRegistro', registro); // Emite a todos los administradores conectados
};