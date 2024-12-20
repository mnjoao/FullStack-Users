package com.fullstackbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fullstackbackend.model.User;
import com.fullstackbackend.model.dto.AuthenticationDTO;
import com.fullstackbackend.model.dto.LoginResponseDTO;
import com.fullstackbackend.model.dto.RegisterDTO;
import com.fullstackbackend.repository.UserRepository;
import com.fullstackbackend.service.TokenService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("auth")
public class AuthenticationController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserRepository repository;
    @Autowired
    private TokenService tokenService;

    @PostMapping("/username")
    public ResponseEntity username(@RequestBody @Valid AuthenticationDTO data){
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.username(), data.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);

        var token = tokenService.generateToken((User) auth.getPrincipal());

        return ResponseEntity.ok(new LoginResponseDTO(token));
    }

    @PostMapping("/register")
    public ResponseEntity<LoginResponseDTO> register(@RequestBody @Valid RegisterDTO data) {
        // Verifica se o username já existe
        if (this.repository.findByUsername(data.username()).isPresent()) {
            return ResponseEntity.badRequest().body(new LoginResponseDTO("Username already exists"));
        }

        // Criptografa a senha
        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());

        // Cria um novo usuário
        User newUser = new User(data.username(), encryptedPassword, data.role());

        // Salva o usuário no banco de dados
        this.repository.save(newUser);

        // Gera o token para o usuário recém-registrado
        String token = tokenService.generateToken(newUser);

        // Retorna o token no corpo da resposta
        return ResponseEntity.ok(new LoginResponseDTO(token));
    }

}