package com.proyecto.negocios.service;

import com.proyecto.negocios.dto.auth.ForgotPasswordRequest;
import com.proyecto.negocios.dto.auth.LoginRequest;
import com.proyecto.negocios.dto.auth.RegisterRequest;
import com.proyecto.negocios.dto.auth.ResetPasswordRequest;

public interface AuthService {
    Long register(RegisterRequest request);
    Long login(LoginRequest request);
    String forgotPassword(ForgotPasswordRequest request);
    void resetPassword(ResetPasswordRequest request);
}


