package com.construhogar.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.construhogar.backend.model.Empleado;
import com.construhogar.backend.repository.EmpleadoRepository;

@Service
public class EmpleadoService {

    private final EmpleadoRepository empleadoRepository;

    public EmpleadoService(EmpleadoRepository empleadoRepository) {
        this.empleadoRepository = empleadoRepository;
    }

    public List<Empleado> obtenerTodos() {
        return empleadoRepository.findAll();
    }

    public Empleado obtenerPorId(Integer id) {
        return empleadoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Empleado no encontrado"));
    }

    public Empleado guardar(Empleado empleado) {
        return empleadoRepository.save(empleado);
    }

    public void eliminar(Integer id) {
        empleadoRepository.deleteById(id);
    }
}
