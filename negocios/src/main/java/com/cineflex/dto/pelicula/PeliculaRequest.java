package com.cineflex.dto.pelicula;

import jakarta.validation.constraints.*;

public class PeliculaRequest {
    @NotBlank(message = "El título es obligatorio")
    private String titulo;
    private String genero;
    private Integer duracionMin;
    private String clasificacion;
    @Size(max = 2000, message = "La sinopsis no puede exceder 2000 caracteres")
    private String sinopsis;
    private String imagenUrl;

    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }
    public String getGenero() { return genero; }
    public void setGenero(String genero) { this.genero = genero; }
    public Integer getDuracionMin() { return duracionMin; }
    public void setDuracionMin(Integer duracionMin) { this.duracionMin = duracionMin; }
    public String getClasificacion() { return clasificacion; }
    public void setClasificacion(String clasificacion) { this.clasificacion = clasificacion; }
    public String getSinopsis() { return sinopsis; }
    public void setSinopsis(String sinopsis) { this.sinopsis = sinopsis; }
    public String getImagenUrl() { return imagenUrl; }
    public void setImagenUrl(String imagenUrl) { this.imagenUrl = imagenUrl; }
}


