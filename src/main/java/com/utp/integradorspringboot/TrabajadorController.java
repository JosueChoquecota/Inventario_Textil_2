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
public class TrabajadorController {
@RequestMapping("/trabajadores")
    public String page() {
        return "trabajadores";
    }
  
}