const request = require('supertest');
const app = require('../src/app'); // Cambia la ruta según la estructura de tu proyecto

// Mock de la base de datos para pruebas
/* beforeEach(async () => {
    await Usuario.destroy({ where: {}, force: true }); // Limpia la base de datos antes de cada prueba
}); */


beforeAll(done => {
    server = app.listen(3000, () => {
        console.log('Servidor corriendo en el puerto 3000');
        done();
    });
});

afterAll(done => {
    server.close(done);
});

describe('AuthController', () => {
    let userCredentials;

    beforeEach(() => {
        userCredentials = {
            usuario: 'dzCazador',
            password: '123456'
        };
    });

    it('Deberia Loguear y Devover JWT', async () => {

        // Luego, intentamos iniciar sesión
        const res = await request(app)
            .post('/auth') // Cambia la ruta según tu API
            .send(userCredentials);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('ok', true);
        expect(res.body).toHaveProperty('token');
    });

    it('Debe retornar usuario invalido', async () => {
        const res = await request(app)
            .post('/auth')
            .send({
                username: 'Invalido',
                password: 'ClaveErronea',
            });

        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty('ok', false);
        expect(res.body).toHaveProperty('msg', 'Credenciales inválidas');
    });
});
