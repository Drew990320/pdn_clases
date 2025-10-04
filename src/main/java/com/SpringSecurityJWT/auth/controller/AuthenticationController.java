package com.SpringSecurityJWT.auth.controller;

import com.SpringSecurityJWT.auth.dto.AuthenticationRequest;
import com.SpringSecurityJWT.auth.dto.AuthenticationResponse;
import com.SpringSecurityJWT.auth.service.AuthenticationService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> login(@Valid @RequestBody AuthenticationRequest request) {
        AuthenticationResponse jwtDto = authenticationService.login(request);
        return ResponseEntity.ok(jwtDto);
    }

    @GetMapping("/public-access")
    public String endPointIsPublicAccess() {
        return "public-access";
    }

}
