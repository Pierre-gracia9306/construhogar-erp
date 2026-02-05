package com.construhogar.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.construhogar.backend.model.Compra;

@Repository
public interface CompraRepository extends JpaRepository<Compra, Integer> {
}
