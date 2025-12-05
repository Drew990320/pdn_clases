package com.cineflex.model;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Reserva {

    public enum Estado { CREADA, PAGADA, CANCELADA }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombreCliente;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> asientos = new ArrayList<>();

    private Integer cantidad;

    @Enumerated(EnumType.STRING)
    private Estado estado = Estado.CREADA;

    @ManyToOne(optional = false)
    private Funcion funcion;

    private Instant createdAt = Instant.now();
    private Instant paidAt;
    private Instant cancelledAt;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNombreCliente() { return nombreCliente; }
    public void setNombreCliente(String nombreCliente) { this.nombreCliente = nombreCliente; }
    public List<String> getAsientos() { return asientos; }
    public void setAsientos(List<String> asientos) { this.asientos = asientos; }
    public Integer getCantidad() { return cantidad; }
    public void setCantidad(Integer cantidad) { this.cantidad = cantidad; }
    public Estado getEstado() { return estado; }
    public void setEstado(Estado estado) {
        this.estado = estado;
        if (estado == Estado.PAGADA && this.paidAt == null) {
            this.paidAt = Instant.now();
        }
        if (estado == Estado.CANCELADA && this.cancelledAt == null) {
            this.cancelledAt = Instant.now();
        }
    }
    public Funcion getFuncion() { return funcion; }
    public void setFuncion(Funcion funcion) { this.funcion = funcion; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
    public Instant getPaidAt() { return paidAt; }
    public void setPaidAt(Instant paidAt) { this.paidAt = paidAt; }
    public Instant getCancelledAt() { return cancelledAt; }
    public void setCancelledAt(Instant cancelledAt) { this.cancelledAt = cancelledAt; }

    public Double getPrecioTotal() {
        if (cantidad == null || funcion == null || funcion.getPrecio() == null) {
            return 0.0;
        }
        return cantidad * funcion.getPrecio();
    }
}


