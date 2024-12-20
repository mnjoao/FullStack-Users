package com.fullstackbackend.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.fullstackbackend.repository.UserRepository;
import com.fullstackbackend.service.TokenService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class SecurityFilter extends OncePerRequestFilter {
    @Autowired
    TokenService tokenService;
    @Autowired
    UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        var token = this.recoverToken(request);
        if (token != null) {
            System.out.println("Token recebido: " + token);

            var username = tokenService.validateToken(token); // Extrai o username do token
            if (username != null) {
                System.out.println("Usuário autenticado no token: " + username);

                var userOptional = userRepository.findByUsername(username); // Busca pelo username
                if (userOptional.isPresent()) {
                    var user = userOptional.get();
                    var authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                    System.out.println("Autenticação configurada para o usuário: " + user.getUsername());
                } else {
                    System.out.println("Usuário não encontrado para o username: " + username);
                }
            } else {
                System.out.println("Token inválido ou expirado.");
            }
        } else {
            System.out.println("Nenhum token encontrado no cabeçalho Authorization.");
        }

        filterChain.doFilter(request, response);
    }



    private String recoverToken(HttpServletRequest request) {
        var authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return null;
        }
        return authHeader.replace("Bearer ", "");
    }
    
}
