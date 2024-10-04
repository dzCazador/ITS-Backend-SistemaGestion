const request = require('supertest');
const app = require('../src/app'); // Asegúrate de que la ruta sea correcta

describe('GET /', () => {
  it('Debe retornar login.html', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.headers['content-type']).toContain('text/html');
  });
});

describe('Protected Routes', () => {
  it('Debe retornar 401 para /user sin token', async () => {
    const res = await request(app).get('/user');
    expect(res.statusCode).toEqual(401);
  });

  it('Debe retornar 401 para /pago sin token', async () => {
    const res = await request(app).get('/pago');
    expect(res.statusCode).toEqual(401);
  });

  it('Debe retornar 401 para /usuario sin token', async () => {
    const res = await request(app).get('/usuario');
    expect(res.statusCode).toEqual(401);
  });

  it('Debe retornar 401 para /uploads sin token', async () => {
    const res = await request(app).get('/uploads');
    expect(res.statusCode).toEqual(401);
  });

  it('Debe retornar 401 para /usuarioAdmin sin token', async () => {
    const res = await request(app).get('/usuarioAdmin');
    expect(res.statusCode).toEqual(401);
  });
});

describe('POST /auth', () => {
  it('debe retornar 200 y un toker valido', async () => {
    const res = await request(app)
      .post('/auth')
      .send({
        nombre: 'manuLPDA',
        password: '654321'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('accessToken');
  });

  it('Debe retornar 401 para invalid login', async () => {
    const res = await request(app)
      .post('/auth')
      .send({
        nombre: 'usuarioNoValid',
        password: 'PasswordNoValido'
      });
    expect(res.statusCode).toEqual(401);
  });
});

describe('File Upload', () => {
  var token;

  beforeAll(async () => {
    // Obtén un token válido antes de las pruebas de carga
    const res = await request(app)
      .post('/auth')
      .send({
        nombre: 'manuLPDA', 
        password: '654321'      
      });
    token = res.body.accessToken;     
  });


  it('Debe retornar 401 para /uploads sin token', async () => {
    const res = await request(app).post('/uploads').attach('file', 'tp2-backend-testaseca-caporaso.pdf');
    expect(res.statusCode).toEqual(401);
  });
  
  console.log(token);
  it('should upload a file con token valido', async () => {
    const res = await request(app)
      .post('/uploads')
      .set('Authorization', `Bearer ${token}`)
      .attach('file', 'tp2-backend-testaseca-caporaso.pdf');
    expect(res.statusCode).toEqual(200);
  });
});
