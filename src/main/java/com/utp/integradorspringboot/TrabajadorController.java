/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot;

import com.utp.integradorspringboot.models.Trabajador;
import com.utp.integradorspringboot.services.TrabajadorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/trabajadores")
public class TrabajadorController {

    @Autowired
    private TrabajadorService trabajadorService;

    // 📋 Listar todos los trabajadores (para vistas HTML)
    @GetMapping
    public String listarTrabajadores(Model model) {
        model.addAttribute("trabajadores", trabajadorService.listarTrabajadores());
        return "trabajadores/lista"; // Vista Thymeleaf
    }

    // 🆕 Mostrar formulario de nuevo trabajador
    @GetMapping("/nuevo")
    public String mostrarFormulario(Model model) {
        model.addAttribute("trabajador", new Trabajador());
        return "trabajadores/formulario"; // Vista Thymeleaf
    }

    // 💾 Guardar un nuevo trabajador desde formulario HTML
    @PostMapping("/guardar")
    public String guardarTrabajador(@ModelAttribute Trabajador trabajador, Integer tipoDocumentoId, Integer rolId) {
        trabajadorService.registrarTrabajador(trabajador, tipoDocumentoId, rolId);
        return "redirect:/trabajadores";
    }

    // ✏️ Editar trabajador
    @GetMapping("/editar/{id}")
    public String editarTrabajador(@PathVariable Integer id, Model model) {
        var trabajadorOpt = trabajadorService.buscarPorId(id);
        if (trabajadorOpt.isPresent()) {
            model.addAttribute("trabajador", trabajadorOpt.get());
            return "trabajadores/formulario";
        } else {
            return "redirect:/trabajadores";
        }
    }

    // 🗑️ Eliminar trabajador
    @GetMapping("/eliminar/{id}")
    public String eliminarTrabajador(@PathVariable Integer id) {
        trabajadorService.eliminarTrabajador(id);
        return "redirect:/trabajadores";
    }
}