Rodando com Docker:
docker-compose up --build
Acesse a aplicação:
Frontend: http://localhost:3000
Backend: http://localhost:8080
Primeiro Acesso:
Registre um usuário inicial para acessar a aplicação. Use o seguinte endpoint:
POST http://localhost:8080/auth/register
{
    "username": "admin",
    "password": "$2a$10$xjxBKSKZLamcCK5C9ZskPOrD2NC9Gix/MU.PYyEUz3WYMy/PNkgFW",
    "role": "ADMIN"
}
Faça login com as credenciais registradas:
POST http://localhost:8080/auth/username
{
    "username": "admin",
    "password": "$2a$10$xjxBKSKZLamcCK5C9ZskPOrD2NC9Gix/MU.PYyEUz3WYMy/PNkgFW"
}
O backend retornará um token JWT que será usado para acessar endpoints protegidos.
Feito isso e só logar http://localhost:3000/login com usuário criado.
