package com.fullstackbackend.service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fullstackbackend.model.User;

@Service
public class TokenService {

    @Value("${api.security.token.secret}")
    private String secret;

    private static final long JWT_EXPIRATION_TIME = 1000 * 60 * 60; // 1 hora

    public String generateToken(User user) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret); // Usa a chave secreta configurada
            return JWT.create()
                    .withIssuer("auth-api")
                    .withSubject(user.getUsername())
                    .withClaim("role", user.getRole().getRole()) // Inclui o campo `role`
                    .withExpiresAt(new Date(System.currentTimeMillis() + JWT_EXPIRATION_TIME)) // Define a expiração
                    .sign(algorithm); // Assina o token
        } catch (JWTCreationException exception) {
            throw new RuntimeException("Erro ao gerar token JWT: " + exception.getMessage(), exception);
        }
    }

    public String validateToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.require(algorithm)
                      .withIssuer("auth-api")
                      .build()
                      .verify(token)
                      .getSubject(); // Retorna o username do token
        } catch (JWTVerificationException exception) {
            System.out.println("Token inválido: " + exception.getMessage());
            return null;
        }
    }

    private Instant genExpirationDate(){
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
    }
}
