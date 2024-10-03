require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const {validarToken} = require('./middleware/jsonwebtoken');
const pagoRoutes = require('./routes/pagoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const fileUpload = require('express-fileupload');
const { isAdmin } = require('./controllers/authController');


const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan());
app.use(express.json());
app.use(express.static('public'));

app.use(fileUpload({
    useTempFiles: false,
    createParentPath: true,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
    tempFileDir: "C:\\temp\\"
}));


// Rutas de usuarios
app.use('/user',validarToken,userRoutes);

// Rutas Adminitrativas
app.use('/pago',validarToken, isAdmin,pagoRoutes);
app.use('/usuario',validarToken,isAdmin, usuarioRoutes);
app.use('/uploads',validarToken, isAdmin, uploadRoutes);   
app.use('/auth', authRoutes);   


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

// Iniciar el servidor

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});