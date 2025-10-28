/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.api;

import com.utp.integradorspringboot.dtos.ListaProductoRequestDTO;
import com.utp.integradorspringboot.dtos.ListaProductoResponseDTO;
import com.utp.integradorspringboot.mappers.ListaProductoMapper;
import com.utp.integradorspringboot.models.ListaProductos;
import com.utp.integradorspringboot.repositories.ListaProductosRepository;
import com.utp.integradorspringboot.services.ListaProductoService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author ASUS
 */
@RestController
@RequestMapping("/api/v1/ListaProductos")
public class ListaProductosApiController {
    private final ListaProductoService listaProductoService;
    private final ListaProductosRepository listaProductosRepository;
    @Autowired
    public ListaProductosApiController(ListaProductoService listaProductoService,ListaProductosRepository listaProductosRepository) {
        this.listaProductoService = listaProductoService;
        this.listaProductosRepository = listaProductosRepository;
    }
    
    // 🔹 1. Buscar o crear variación (producto + talla + color)
    @PostMapping("/Registrar")
    public ListaProductoResponseDTO registrarListaProducto(
            @RequestBody @Valid ListaProductoRequestDTO request) {

        ListaProductos lista = listaProductoService.buscarOCrearListaProducto(
                request.getIdProducto(),
                request.getIdTalla(),
                request.getIdColor(),
                request.getIdProveedor()
        );

        // Aquí puedes asignar cantidad y precio si tu service lo permite:
        lista.setCantidad(request.getCantidad());
        lista.setPrecioUnitario(request.getPrecioUnitario());

        listaProductosRepository.save(lista);

        return ListaProductoMapper.INSTANCE.entityToResponseDto(lista);
    }


    // 🔹 2. Actualizar stock (sumar o restar)
    @PutMapping("/actualizar-stock")
    public ListaProductos actualizarStock(
            @RequestParam Integer idListaProducto,
            @RequestParam int cantidadCambio) {
        return listaProductoService.actualizarStock(idListaProducto, cantidadCambio);
    }

    // 🔹 3. Buscar variación por ID
    @GetMapping("/{id}")
    public ListaProductos obtenerListaProductoPorId(@PathVariable Integer id) {
        return listaProductoService.buscarListaProductoPorId(id);
    }

    // 🔹 4. Listar variaciones de un producto específico
    @GetMapping("/producto/{idProducto}")
    public List<ListaProductos> listarPorProducto(@PathVariable Integer idProducto) {
        return listaProductoService.listarVariacionesPorProducto(idProducto);
    }

    // 🔹 5. Listar todo el inventario
    @GetMapping("/inventario")
    public List<ListaProductos> listarTodoInventario() {
        return listaProductoService.listarTodoInventario();
    }
}
