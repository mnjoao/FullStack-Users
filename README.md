Documentação do Projeto
Visão Geral do Projeto
Este projeto é uma aplicação full stack desenvolvida com Spring Boot no backend e React no frontend. A aplicação é projetada para gerenciar usuários com autenticação, autorização baseada em roles (ADMIN e USER), e operações CRUD básicas. A infraestrutura é containerizada usando Docker, facilitando a implantação e escalabilidade.
Tecnologias Utilizadas
Backend: Java, Spring Boot, Spring Security, Hibernate (JPA), MySQL.
Frontend: React, Axios, Bootstrap, ngix.
Conteinerização: Docker, Docker Compose.
Principais Desafios Enfrentados
Configuração e integração entre containers Docker para backend, frontend e banco de dados.
Implementação de autenticação e autorização seguras utilizando tokens JWT.
Configuração de proxies para comunicação entre frontend e backend.

Passos para Rodar a Aplicação Localmente
Dependências Necessárias
Docker e Docker Compose instalados.
Java 21+ e Node.js (caso queira rodar fora dos containers Docker).
Rodando com Docker
Clone o repositório:
git clone <URL_DO_REPOSITORIO>
cd projetoUsers
Build e inicialização dos containers:
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
Feito isso e só logar http://localhost:3000/login com usuário criado
