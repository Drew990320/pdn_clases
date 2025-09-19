package com.procesosnegocios.pnd.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Controlador para manejar las rutas del frontend React
 */
@Controller
public class FrontendController {
    
    /**
     * Redirige todas las rutas del frontend a index.html para que React Router las maneje
     */
    @RequestMapping(value = {
        "/",
        "/login",
        "/register", 
        "/forgot-password",
        "/reset-password",
        "/dashboard"
    })
    public String index() {
        return "forward:/index.html";
    }
}
