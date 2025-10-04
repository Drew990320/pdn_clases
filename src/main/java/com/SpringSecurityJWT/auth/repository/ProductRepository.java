package com.SpringSecurityJWT.auth.repository;

import com.SpringSecurityJWT.auth.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {


}
