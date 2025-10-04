package com.SpringSecurityJWT.auth.utils;

import org.springframework.security.core.GrantedAuthority;

import java.util.List;

public record TokenData(
        String username,
        List<GrantedAuthority> authorities
) {}
