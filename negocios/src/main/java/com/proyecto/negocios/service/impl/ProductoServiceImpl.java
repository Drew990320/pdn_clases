package com.proyecto.negocios.service.impl;

import com.proyecto.negocios.domain.Producto;
import com.proyecto.negocios.dto.ProductoDTO;
import com.proyecto.negocios.mapper.ProductoMapper;
import com.proyecto.negocios.repository.ProductoRepository;
import com.proyecto.negocios.service.ProductoService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@Transactional
public class ProductoServiceImpl implements ProductoService {

    private final ProductoRepository productoRepository;

    public ProductoServiceImpl(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    @Override
    public ProductoDTO crear(ProductoDTO dto) {
        Producto entity = ProductoMapper.toEntity(dto);
        entity.setId(null);
        Producto guardado = productoRepository.save(entity);
        return ProductoMapper.toDTO(guardado);
    }

    @Override
    @Transactional(readOnly = true)
    public ProductoDTO obtenerPorId(Long id) {
        return productoRepository.findById(id)
                .map(ProductoMapper::toDTO)
                .orElseThrow(() -> new NoSuchElementException("Producto no encontrado"));
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductoDTO> listar() {
        return productoRepository.findAll().stream()
                .map(ProductoMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ProductoDTO actualizar(Long id, ProductoDTO dto) {
        Producto existente = productoRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Producto no encontrado"));
        existente.setNombre(dto.getNombre());
        existente.setPrecio(dto.getPrecio());
        existente.setStock(dto.getStock());
        Producto actualizado = productoRepository.save(existente);
        return ProductoMapper.toDTO(actualizado);
    }

    @Override
    public void eliminar(Long id) {
        if (!productoRepository.existsById(id)) {
            throw new NoSuchElementException("Producto no encontrado");
        }
        productoRepository.deleteById(id);
    }
}



