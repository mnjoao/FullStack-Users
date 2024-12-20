package com.fullstackbackend.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fullstackbackend.exception.UserNotFoundException;
import com.fullstackbackend.model.User;
import com.fullstackbackend.model.UserRole;
import com.fullstackbackend.repository.UserRepository;


@RestController
@CrossOrigin("http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    

    @GetMapping("/users")
    public Page<User> getUsers(@RequestParam int page, @RequestParam int size) {
        return userRepository.findAll(PageRequest.of(page, size));
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id, Authentication authentication) {
        // Obtém o nome do usuário autenticado
        String currentUsername = authentication.getName();
    
        // Recupera o usuário autenticado do repositório
        User authenticatedUser = userRepository.findByUsername(currentUsername)
                .orElseThrow(() -> new UserNotFoundException("Authenticated user not found"));
    
        // Recupera o usuário solicitado
        User requestedUser = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User with ID " + id + " not found"));
    
     /*  // Verifica se o usuário autenticado tem permissão para acessar o recurso
        boolean isAdmin = authenticatedUser.getRole().equals(UserRole.ADMIN);
        boolean isSelf = requestedUser.getId().equals(authenticatedUser.getId());
        if (!isAdmin && !isSelf) {
            return ResponseEntity.status(403).build(); // Retorna 403 Forbidden
        }
     */
        return ResponseEntity.ok(requestedUser);
    }
    
/* 
    @PostMapping("/user")
    User newUser(@RequestBody User newUser) {
        newUser.setPassword(new BCryptPasswordEncoder().encode(newUser.getPassword())); // Criptografa a senha
        return userRepository.save(newUser);
    }
    @PutMapping("/user/{id}")
    User updateUser(@RequestBody User updatedUser, @PathVariable Long id) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setUsername(updatedUser.getUsername());
                    user.setName(updatedUser.getName());
                    user.setEmail(updatedUser.getEmail());
                    user.setRole(updatedUser.getRole());
                    if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
                        user.setPassword(new BCryptPasswordEncoder().encode(updatedUser.getPassword())); // Criptografa a senha
                    }
                    return userRepository.save(user);
                }).orElseThrow(() -> new UserNotFoundException(id));
    }
*/

    @DeleteMapping("/user/{id}")
    String deleteUser(@PathVariable Long id) {
        if (!userRepository.existsById(id)) {
            throw new UserNotFoundException("User with ID " + id + " not found.");
        }
        userRepository.deleteById(id);
        return "User with id " + id + " has been deleted successfully.";
    }

    @PostMapping("/user")
    User newUser(@RequestBody User newUser) {
        var currentRole = SecurityContextHolder.getContext().getAuthentication().getAuthorities().iterator().next().getAuthority();

        if ("USER".equals(currentRole) && "ADMIN".equals(newUser.getRole().getRole())) {
            throw new SecurityException("Usuários com role USER não podem criar usuários com role ADMIN.");
        }

        newUser.setPassword(new BCryptPasswordEncoder().encode(newUser.getPassword())); // Criptografa a senha
        return userRepository.save(newUser);
    }

    @PutMapping("/user/{id}")
    User updateUser(@RequestBody User updatedUser, @PathVariable Long id) {
        var currentRole = SecurityContextHolder.getContext().getAuthentication().getAuthorities().iterator().next().getAuthority();
    
        return userRepository.findById(id)
                .map(user -> {
                    if ("USER".equals(currentRole) && "ADMIN".equals(updatedUser.getRole().getRole())) {
                        throw new SecurityException("Users with role USER cannot update users to role ADMIN.");
                    }
    
                    user.setUsername(updatedUser.getUsername());
                    user.setName(updatedUser.getName());
                    user.setEmail(updatedUser.getEmail());
                    user.setRole(updatedUser.getRole());
                    if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
                        user.setPassword(new BCryptPasswordEncoder().encode(updatedUser.getPassword())); // Criptografa a senha
                    }
                    return userRepository.save(user);
                }).orElseThrow(() -> new UserNotFoundException("User with ID " + id + " not found."));
    }
    @GetMapping("/auth/me")
    public ResponseEntity<User> getAuthenticatedUser() {
        String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(currentUsername)
                .orElseThrow(() -> new UserNotFoundException("Authenticated user not found."));
        return ResponseEntity.ok(user);
    }

}
