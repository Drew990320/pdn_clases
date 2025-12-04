package com.cineflex.dto.funcion;

public class FuncionResponse {
    private Long id;
    private Long peliculaId;
    private String fecha;
    private String hora;
    private String sala;
    private Double precio;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
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


