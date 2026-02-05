package com.construhogar.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.construhogar.backend.model.Empleado;
import com.construhogar.backend.service.EmpleadoService;

@RestController
@RequestMapping("/api/empleados")
@CrossOrigin(origins = "*")
public class EmpleadoController {

    private final EmpleadoService empleadoService;

    public EmpleadoController(EmpleadoService empleadoService) {
        this.empleadoService = empleadoService;
    }

    @GetMapping
    public List<Empleado> listar() {
        return empleadoService.obtenerTodos();
    }

    @GetMapping("/{id}")
    public Empleado obtenerPorId(@PathVariable Integer id) {
        return empleadoService.obtenerPorId(id);
    }

    @PostMapping
    public Empleado crear(@RequestBody Empleado empleado) {
        return empleadoService.guardar(empleado);
    }

    @PutMapping("/{id}")
    public Empleado actualizar(@PathVariable Integer id, @RequestBody Empleado empleado) {
        empleado.setIdEmpleado(id);
        return empleadoService.guardar(empleado);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id) {
        empleadoService.eliminar(id);
    }
}
