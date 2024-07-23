<body>
  <h1>Documentación del Despliegue</h1>

  <h2>Configuración del Entorno</h2>
  <p>Asegúrate de definir las siguientes variables de entorno en tu archivo <code>.env</code>:</p>
  <pre><code>
DB_PSW=
DB_USERNAME=
DB_DATABASE=
DB_HOST=
DB_PORT=

APP_PORT=3500

AUTH_SECRET=
</code></pre>

  <h2>Migración de la Base de Datos</h2>
  <p>La base de datos se migrará automáticamente al iniciar el servicio por primera vez. Asegúrate de estar conectado a una base de datos Postgres y tener configurado el archivo <code>.env</code> correctamente antes de iniciar el servicio.</p>
  <p>Para el Data Definition Language (DDL), es necesario ejecutar el archivo <code>data/ddl.sql</code> en un gestor de base de datos, de tal forma que se nos cargara data basica para probar el proyecto</p>
  <p>La data cargada por el DDL incluye usuarios con los que se puede iniciar sesión en el sitio web. Aquí tienes la información de los usuarios cargados:</p>
<table>
    <caption>Usuarios Cargados por el DDL</caption>
    <thead>
      <tr>
        <th>Correo Electrónico</th>
        <th>Rol</th>
        <th>Contraseña</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>superadmin@example.com</td>
        <td>Superadmin</td>
        <td>password</td>
      </tr>
      <tr>
        <td>admin@example.com</td>
        <td>Admin</td>
        <td>password</td>
      </tr>
      <tr>
        <td>customer1@example.com</td>
        <td>Customer</td>
        <td>password</td>
      </tr>
      <tr>
        <td>customer2@example.com</td>
        <td>Customer</td>
        <td>password/td>
      </tr>
      <tr>
        <td>customer3@example.com</td>
        <td>Customer</td>
        <td>password</td>
      </tr>
    </tbody>
  </table>
  <h2>Comandos Importantes</h2>
  <p>Estos son los comandos importantes que puedes usar durante el desarrollo y despliegue del proyecto:</p>
  <pre><code>

# Construir el proyecto

npm run build

# Iniciar el servidor en modo desarrollo

npm run start:dev

</code></pre>

  <h1>Documentación de la API de CRM</h1>

  <p>Esta API proporciona endpoints para gestionar usuarios en el sistema. Todos los endpoints están protegidos por autenticación JWT.</p>

  <h2>Endpoints de Usuario</h2>

  <h3>Crear Usuario</h3>
  <ul>
    <li><strong>URL</strong>: <code>/api/v1/users</code></li>
    <li><strong>Método</strong>: <code>POST</code></li>
    <li><strong>Descripción</strong>: Crea un nuevo usuario.</li>
    <li><strong>Autenticación</strong>: Requerida (JWT)</li>
    <li><strong>Cuerpo de la Solicitud</strong>:</li>
  </ul>
  <pre><code>{
  "first_name": "John",
  "last_name": "Doe",
  "middle_name": "A",
  "email": "john.doe@example.com",
  "role_id": 1
}</code></pre>
  <ul>
    <li><strong>Respuesta</strong>:</li>
  </ul>
  <pre><code>{
  "success": true,
  "data": {
    "id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "middle_name": "A",
    "email": "john.doe@example.com",
    "role_id": 1
  },
  "statusCode": 201,
  "message": "User created successfully"
}</code></pre>

  <h3>Obtener Usuario por ID</h3>
  <ul>
    <li><strong>URL</strong>: <code>/api/v1/users/:id</code></li>
    <li><strong>Método</strong>: <code>GET</code></li>
    <li><strong>Descripción</strong>: Obtiene un usuario por su ID.</li>
    <li><strong>Autenticación</strong>: Requerida (JWT)</li>
    <li><strong>Parámetros</strong>:</li>
    <ul>
      <li><code>id</code> (número) - ID del usuario a obtener.</li>
    </ul>
    <li><strong>Respuesta</strong>:</li>
  </ul>
  <pre><code>{
  "success": true,
  "data": {
    "id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "middle_name": "A",
    "email": "john.doe@example.com",
    "role_id": 1
  },
  "statusCode": 200,
  "message": "User retrieved successfully"
}</code></pre>

  <h3>Obtener Todos los Usuarios</h3>
  <ul>
    <li><strong>URL</strong>: <code>/api/v1/users</code></li>
    <li><strong>Método</strong>: <code>GET</code></li>
    <li><strong>Descripción</strong>: Obtiene todos los usuarios con paginación.</li>
    <li><strong>Autenticación</strong>: Requerida (JWT)</li>
    <li><strong>Parámetros</strong>:</li>
    <ul>
      <li><code>limit</code> (número) - Cantidad de usuarios por página.</li>
      <li><code>page</code> (número) - Número de página.</li>
    </ul>
    <li><strong>Respuesta</strong>:</li>
  </ul>
  <pre><code>{
  "success": true,
  "data": {
    "users": [
      {
        "id": 1,
        "first_name": "John",
        "last_name": "Doe",
        "middle_name": "A",
        "email": "john.doe@example.com",
        "role_id": 1
      }
    ],
    "total": 1
  },
  "statusCode": 200,
  "message": "Users retrieved successfully"
}</code></pre>

  <h3>Actualizar Usuario</h3>
  <ul>
    <li><strong>URL</strong>: <code>/api/v1/users/:id</code></li>
    <li><strong>Método</strong>: <code>PATCH</code></li>
    <li><strong>Descripción</strong>: Actualiza la información de un usuario.</li>
    <li><strong>Autenticación</strong>: Requerida (JWT)</li>
    <li><strong>Parámetros</strong>:</li>
    <ul>
      <li><code>id</code> (número) - ID del usuario a actualizar.</li>
    </ul>
    <li><strong>Cuerpo de la Solicitud</strong>:</li>
  </ul>
  <pre><code>{
  "first_name": "John",
  "last_name": "Doe",
  "middle_name": "A",
  "email": "john.doe@example.com",
  "role_id": 1
}</code></pre>
  <ul>
    <li><strong>Respuesta</strong>:</li>
  </ul>
  <pre><code>{
  "success": true,
  "data": {
    "id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "middle_name": "A",
    "email": "john.doe@example.com",
    "role_id": 1
  },
  "statusCode": 200,
  "message": "User updated successfully"
}</code></pre>

  <h3>Eliminar Usuario</h3>
  <ul>
    <li><strong>URL</strong>: <code>/api/v1/users/:id</code></li>
    <li><strong>Método</strong>: <code>DELETE</code></li>
    <li><strong>Descripción</strong>: Elimina un usuario por su ID.</li>
    <li><strong>Autenticación</strong>: Requerida (JWT)</li>
    <li><strong>Parámetros</strong>:</li>
    <ul>
      <li><code>id</code> (número) - ID del usuario a eliminar.</li>
    </ul>
    <li><strong>Respuesta</strong>:</li>
  </ul>
  <pre><code>{
  "success": true,
  "statusCode": 200,
  "message": "User deleted successfully"
}</code></pre>

  <h3>Cambiar Estado del Usuario</h3>
  <ul>
    <li><strong>URL</strong>: <code>/api/v1/users/:id/status</code></li>
    <li><strong>Método</strong>: <code>POST</code></li>
    <li><strong>Descripción</strong>: Cambia el estado de un usuario.</li>
    <li><strong>Autenticación</strong>: Requerida (JWT)</li>
    <li><strong>Parámetros</strong>:</li>
    <ul>
      <li><code>id</code> (número) - ID del usuario.</li>
    </ul>
    <li><strong>Cuerpo de la Solicitud</strong>:</li>
  </ul>
  <pre><code>{
  "status_id": 1
}</code></pre>
  <ul>
    <li><strong>Respuesta</strong>:</li>
  </ul>
  <pre><code>{
  "success": true,
  "data": {
    "id": 1,
    "status": {
      "id": 1,
      "name": "Activo"
    }
  },
  "statusCode": 200,
  "message": "User status changed successfully"
}</code></pre>

<h2>Endpoints de Usuario-Estado</h2>

<h3>Obtener Estado de Usuario por ID</h3>
  <ul>
    <li><strong>URL</strong>: <code>/api/v1/user-status/:id</code></li>
    <li><strong>Método</strong>: <code>GET</code></li>
    <li><strong>Descripción</strong>: Obtiene el estado de un usuario por su ID.</li>
    <li><strong>Autenticación</strong>: Requerida (JWT)</li>
    <li><strong>Parámetros</strong>:</li>
    <ul>
      <li><code>id</code> (número) - ID del usuario.</li>
    </ul>
    <li><strong>Respuesta</strong>:</li>
  </ul>
  <pre><code>{
  "success": true,
  "data": {
    "id": 1,
    "status": {
      "id": 1,
      "name": "Activo"
    }
  },
  "statusCode": 200,
  "message": "User status retrieved successfully"
}</code></pre>

  <h2>Endpoints de Autenticación</h2>

  <h3>Inicio de Sesión</h3>
  <ul>
    <li><strong>URL</strong>: <code>/api/v1/auth/login</code></li>
    <li><strong>Método</strong>: <code>POST</code></li>
    <li><strong>Descripción</strong>: Inicia sesión y obtiene un token de acceso.</li>
    <li><strong>Cuerpo de la Solicitud</strong>:</li>
  </ul>
  <pre><code>{
  "email": "john.doe@example.com",
  "password": "your_password"
}</code></pre>
  <ul>
    <li><strong>Respuesta</strong>:</li>
  </ul>
  <pre><code>{
  "success": true,
  "data": {
    "accessToken": "your_access_token"
  },
  "message": "Successfully login"
}</code></pre>

</body>
