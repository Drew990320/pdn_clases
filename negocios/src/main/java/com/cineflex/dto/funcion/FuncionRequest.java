package com.cineflex.dto.funcion;

import jakarta.validation.constraints.*;

public class FuncionRequest {
    @NotNull
    private Long peliculaId;
    @NotBlank
    private String fecha; // ISO yyyy-MM-dd
    @NotBlank
    private String hora;  // HH:mm
    @NotBlank
    private String sala;
    @Positive
    private Double precio;

    public Long getPeliculaId() { return peliculaId; }
    public void setPeliculaId(Long peliculaId) { this.peliculaId = peliculaId; }
    public String getFecha() { return fecha; }
    public void setFecha(String fecha) { this.fecha = fecha; }
    public String getHora() { return hora; }
    public void setHora(String hora) { this.hora = hora; }
    public String getSala() { return sala; }
    public void setSala(String sala) { this.sala = sala; }
    public Double getPrecio() { return precio; }
    public void setPrecio(Double precio) { this.precio = precio; }
}


