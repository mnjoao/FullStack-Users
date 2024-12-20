package com.fullstackbackend.model.dto;

import com.fullstackbackend.model.UserRole;

public record RegisterDTO(String username, String password, UserRole role) {
}
