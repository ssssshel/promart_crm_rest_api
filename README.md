<body>
  <h1>Documentación de la API de CRM</h1>

  <p>Esta API proporciona endpoints para gestionar usuarios en el sistema. Todos los endpoints están protegidos por autenticación JWT.</p>

  <h2>Endpoints</h2>

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