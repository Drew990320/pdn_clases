package com.proyecto.negocios.mapper;

import com.proyecto.negocios.domain.Producto;
import com.proyecto.negocios.dto.ProductoDTO;

public class ProductoMapper {

    public static ProductoDTO toDTO(Producto entity) {
        if (entity == null) {
            return null;
        }
        ProductoDTO dto = new ProductoDTO();
        dto.setId(entity.getId());
        dto.setNombre(entity.getNombre());
        dto.setPrecio(entity.getPrecio());
        dto.setStock(entity.getStock());
        return dto;
    }

    public static Producto toEntity(ProductoDTO dto) {
        if (dto == null) {
            return null;
        }
        Producto entity = new Producto();
        entity.setId(dto.getId());
        entity.setNombre(dto.getNombre());
        entity.setPrecio(dto.getPrecio());
        entity.setStock(dto.getStock());
        return entity;
    }
}



