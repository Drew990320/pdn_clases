package com.proyecto.negocios.service;

import com.proyecto.negocios.dto.ProductoDTO;
import java.util.List;

public interface ProductoService {
    ProductoDTO crear(ProductoDTO dto);
    ProductoDTO obtenerPorId(Long id);
    List<ProductoDTO> listar();
    ProductoDTO actualizar(Long id, ProductoDTO dto);
    void eliminar(Long id);
}



