

<h1>Fullstack Users Management - Documentação</h1>

<body>

<h2>Funcionalidades</h2>
<h3>Backend</h3>
<ul>
    <li><strong>Autenticação e Autorização:</strong> Utiliza tokens JWT para autenticação e controle de acesso baseado em roles (<code>ADMIN</code> e <code>USER</code>).</li>
    <li><strong>Operações CRUD:</strong> Gerenciamento de usuários com suporte a diferentes roles.</li>
    <li><strong>Integração com MySQL:</strong> Banco de dados configurado com JPA/Hibernate.</li>
</ul>

<h3>Frontend</h3>
<ul>
    <li><strong>Interface Responsiva:</strong> Desenvolvido com React e Bootstrap.</li>
    <li><strong>Gestão de Usuários:</strong> Páginas para listar, criar, editar e visualizar usuários.</li>
    <li><strong>Autenticação:</strong> Fluxo de login integrado com backend usando tokens JWT.</li>
</ul>

<h2>Estrutura do Projeto</h2>

<h3>Backend</h3>
<h4>Principais Arquivos</h4>
<ul>
    <li><strong><a href="backend/src/main/java/com/fullstackbackend/controller/AuthenticationController.java">AuthenticationController.java</a>:</strong> Controlador responsável pelo login e registro de usuários.</li>
    <li><strong><a href="backend/src/main/java/com/fullstackbackend/controller/UserController.java">UserController.java</a>:</strong> Controlador que gerencia operações CRUD de usuários.</li>
    <li><strong><a href="backend/src/main/java/com/fullstackbackend/configuration/SecurityConfigurations.java">SecurityConfigurations.java</a>:</strong> Configuração de segurança para autenticação e autorização.</li>
    <li><strong><a href="backend/src/main/java/com/fullstackbackend/security/SecurityFilter.java">SecurityFilter.java</a>:</strong> Filtro para validação de tokens JWT.</li>
    <li><strong><a href="backend/src/main/java/com/fullstackbackend/service/TokenService.java">TokenService.java</a>:</strong> Serviço responsável por gerar e validar tokens JWT.</li>
</ul>

<h4>Fluxo de primeiro Login</h4>
<p><strong>Endpoint para login:</strong> <code>POST http://localhost:8080/auth/register </code></p>
<p><strong>Corpo da requisição:</strong></p>
<pre><code>{
"username": "admin",
"password":"$2a$10$xjxBKSKZLamcCK5C9ZskPOrD2NC9Gix/MU.PYyEUz3WYMy/PNkgFW",
"role": "ADMIN"
}
</code></pre>
<p><strong>Resposta:</strong></p>
<pre><code>{
"token": "eyJhbGciOiJIUzI1NiIsInR5..."
}
</code></pre>

<h3>Frontend</h3>
<h4>Principais Arquivos</h4>
<ul>
    <li><strong><a href="frontend/src/App.js">App.js</a>:</strong> Arquivo principal que gerencia as rotas e layout.</li>
    <li><strong><a href="frontend/src/axiosConfig.js">axiosConfig.js</a>:</strong> Configuração padrão para chamadas à API com Axios.</li>
    <li><strong><a href="frontend/src/pages/Login.js">Login.js</a>:</strong> Página de login do usuário.</li>
    <li><strong><a href="frontend/src/users/AddUser.js">AddUser.js</a>:</strong> Página para adicionar novos usuários.</li>
    <li><strong><a href="frontend/src/users/EditUser.js">EditUser.js</a>:</strong> Página para editar informações de usuários.</li>
    <li><strong><a href="frontend/src/users/ViewUser.js">ViewUser.js</a>:</strong> Página para visualizar detalhes de um usuário.</li>
</ul>

<h2>Documentação dos Endpoints</h2>

<h3>Autenticação</h3>
<ul>
    <li><strong><code>POST /auth/username</code>:</strong> Login de usuários.</li>
    <li><strong><code>POST /auth/register</code>:</strong> Registro de novos usuários.</li>
</ul>

<h3>Usuários</h3>
<ul>
    <li><strong><code>GET /users</code>:</strong> Lista todos os usuários.</li>
    <li><strong><code>GET /user/{id}</code>:</strong> Recupera informações de um usuário específico.</li>
    <li><strong><code>POST /user</code>:</strong> Cria um novo usuário.</li>
    <li><strong><code>PUT /user/{id}</code>:</strong> Atualiza informações de um usuário.</li>
    <li><strong><code>DELETE /user/{id}</code>:</strong> Remove um usuário.</li>
</ul>

</body>
</html>
