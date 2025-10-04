package com.SpringSecurityJWT.common.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleGlobalException(Exception ex, HttpServletRequest request) {
        Map<String, String> error = new HashMap<>();
        error.put("message", ex.getMessage());
        error.put("timestamp", new Date().toString());
        error.put("url", request.getRequestURI());
        error.put("method", request.getMethod());

        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        if (ex instanceof AccessDeniedException) {
            status = HttpStatus.FORBIDDEN;
        }

        return ResponseEntity.status(status).body(error);
    }

}
