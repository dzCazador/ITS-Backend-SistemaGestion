# Aplicación de Gestión de Usuarios y Pagos - Programacion Backend - INSTITUTO TECNICO SUPERIOR
## INTEGRANTES : TESTASECA CRISTIAN - CAPORASO MANUEL

Esta es una aplicación creada con Node.js que permite la gestión de usuarios y pagos. Incluye la posibilidad de crear administradores a partir de un superadmin, quienes podrán a su vez crear usuarios, subir archivos y registrar pagos. Los usuarios comunes pueden ver sus pagos y descargar sus recibos en formato PDF.

## Funcionalidades

- Crear y gestionar usuarios con diferentes roles (administrador y usuario común).
- Subida de archivos.
- Registro y modificación de pagos.
- Visualización y descarga de recibos en formato PDF.
- Desactivación de pagos.

## Endpoints disponibles

### **Autenticación**

#### **Login (Autenticación)**

**POST** `http://localhost:3000/auth`

Este endpoint permite a los usuarios autenticarse en la aplicación y recibir un token de acceso.

**Cuerpo del request:**

```json

{
    "nombre": "dzCazador",
    "password": "123456"
}
```

```json
{
    "nombre": "manuLPDA",
    "password": "654321"
}
```

### **Usuarios**

#### **Crear un usuario**

**POST** `http://localhost:3000/usuario`

Este endpoint permite a los administradores crear nuevos usuarios.

**Cuerpo del request:**

```json
{
    "nombre": "dzCazador",
    "correo": "ctestaseca@hotmail.com",
    "password": "123456",
    "rolId": 1
}
```

#### **Actualizar un usuario**

**PUT** `http://localhost:3000/usuario/:id`

Permite a los administradores actualizar los datos de un usuario existente.

**Cuerpo del request:**

```json

{
    "nombre": "dzCazador",
    "correo": "ctestaseca@hotmail.com",
    "password": "123456",
    "rolId": 1
}
```

### **Pagos**

#### **Usuarios comunes: Ver pagos propios**

**GET** `http://localhost:3000/usuario/pagos`

Obtiene un listado de los pagos del usuario autenticado.

#### **Descargar recibo**

**GET** `http://localhost:3000/usario/:id/recibo`

Permite a un usuario descargar su propio recibo en formato PDF.

### **Administradores**

#### **Listar todos los pagos**

**GET** `http://localhost:3000/pago`

Obtiene el listado de todos los pagos registrados.

#### **Obtener datos de un pago específico**

**GET** `http://localhost:3000/pago/:id`

Obtiene los detalles de un pago en particular.

#### **Registrar un nuevo pago**

**POST** `http://localhost:3000/pago`

Permite registrar un nuevo pago.

**Cuerpo del request:**

```json
{
    "id": 2,
    "fechaCarga": "2024-03-02",
    "fechaPago": "2024-03-03",
    "descripcion": "Pago Manu",
    "registradoPor": 2,
    "formaPagoId": 1,
    "usuarioId": 3,
    "recibo": "2ba35e57-7ed1-44bb-88e5-66c23c81cd37.pdf",
    "monto": 5000,
    "activo": true
}
```

#### **Modificar un pago existente**

**PUT** `http://localhost:3000/pago/:id`

Permite modificar un pago existente.

**Cuerpo del request:**

```json
{
    "fechaCarga": "2024-03-02",
    "fechaPago": "2024-03-03",
    "descripcion": "Pago Manu 2",
    "registradoPor": 2,
    "formaPagoId": 2,
    "usuarioId": 3,
    "monto": 25000
}
```

#### **Desactivar un pago**

**DELETE** `http://localhost:3000/pago/:id`

Este endpoint permite desactivar un pago, es decir, no se elimina, pero pasa a estar inactivo.

---

### Notas adicionales

- Los pagos desactivados no se eliminan de la base de datos, sino que simplemente se marcan como inactivos.
- La autenticación se maneja con tokens JWT, los cuales deben ser enviados en los encabezados de las peticiones protegidas.


# **ADICIONALES**
### **Paginacion**

#### **Crear un usuario**

**GET** `http://localhost:3000/pago`

Este endpoint tiene como opcional los campos detallados para hacer una correcta paginacion y ordenamiento por ejemplo "/pago?sortBy=descripcion&order=desc"

**Cuerpo del request:**

```json
{
    page = 1
    limit = 10
    order = asc/desc
    sortBy = CAMPO
}
```

