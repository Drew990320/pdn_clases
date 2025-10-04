package com.SpringSecurityJWT.auth.repository;

import com.SpringSecurityJWT.auth.entity.Permissions;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PermissionRepository extends JpaRepository<Permissions, Long> {
    Optional<Permissions> findByName(String name);

}
