package com.cineflex.dto.reserva;

import jakarta.validation.constraints.*;
import java.util.List;

public class ReservaRequest {
    @NotBlank
    private String nombreCliente;
    @NotNull
    private Long funcionId;
    @NotEmpty
    private List<String> asientos;
    private Integer cantidad;

    public String getNombreCliente() { return nombreCliente; }
    public void setNombreCliente(String nombreCliente) { this.nombreCliente = nombreCliente; }
    public Long getFuncionId() { return funcionId; }
    public void setFuncionId(Long funcionId) { this.funcionId = funcionId; }
    public List<String> getAsientos() { return asientos; }
    public void setAsientos(List<String> asientos) { this.asientos = asientos; }
    public Integer getCantidad() { return cantidad; }
    public void setCantidad(Integer cantidad) { this.cantidad = cantidad; }
}


