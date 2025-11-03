/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.sistemaOdontologo.controller;


import com.utp.sistemaOdontologo.dtos.TrabajadorDTORequest;
import com.utp.sistemaOdontologo.services.TrabajadorService;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.time.LocalDate;

@WebServlet("/trabajador") 
public class TrabajadorController extends HttpServlet {
    
    private final TrabajadorService trabajadorService = new TrabajadorService();

    // -------------------------------------------------------------------------
    // Lógica Centralizada (processRequest)
    // -------------------------------------------------------------------------
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // Parámetro para saber qué acción ejecutar (login, registro_trabajador, etc.)
        String operacion = request.getParameter("operacion"); 

        if (operacion == null) {
            operacion = ""; // Evita NullPointerException si no se envía la operación
        }

        switch (operacion) {
            case "registrar_trabajador":
                registrarTrabajador(request, response);
                break;
            case "listar_trabajadores":
                // Aquí iría la lógica para listar todos
                break;
            default:
                // Redirigir a una página de error o al índice
                request.getRequestDispatcher("/error_operacion.jsp").forward(request, response);
                break;
        }
    }

    // -------------------------------------------------------------------------
    // Método Auxiliar: registrarTrabajador (Toda la lógica de mapeo)
    // -------------------------------------------------------------------------
    private void registrarTrabajador(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // 1. Mapeo de Parámetros (tomados del formulario/Postman)
        TrabajadorDTORequest dto = new TrabajadorDTORequest();
        
        try {
            // Campos de Trabajador
            dto.setNombre(request.getParameter("nombre"));
            dto.setApellido(request.getParameter("apellido"));
            dto.setColegiatura(request.getParameter("colegiatura"));
            dto.setIdTipoDocumento(Integer.parseInt(request.getParameter("idTipoDocumento"))); 
            dto.setIdRol(Integer.parseInt(request.getParameter("idRol")));
            
            // Especialidad es opcional
            String idEsp = request.getParameter("idEspecialidad");
            dto.setIdEspecialidad(idEsp != null && !idEsp.isEmpty() ? Integer.parseInt(idEsp) : null);

            // Campos de Usuario y Seguridad
            dto.setUsuario(request.getParameter("username"));
            dto.setContrasena(request.getParameter("contrasena"));
            
            // Campos de Contacto
            dto.setCorreo(request.getParameter("correo"));
            dto.setTelefono(request.getParameter("telefono"));
            dto.setDireccion(request.getParameter("direccion"));
            
            dto.setFechaRegistro(LocalDate.now()); // Asignado por el sistema

            // 2. Llamada al Servicio
            if (trabajadorService.insert(dto)) {
                // Éxito: Redirigir a una página de confirmación
                request.setAttribute("mensaje", "Trabajador registrado con éxito.");
                request.getRequestDispatcher("/WEB-INF/trabajador/success.jsp").forward(request, response);
            } else {
                // Error de Lógica de Negocio (ej. DNI/Colegiatura duplicada, DB error)
                request.setAttribute("error", "Error al insertar el trabajador o datos duplicados.");
                request.getRequestDispatcher("/WEB-INF/trabajador/registro.jsp").forward(request, response);
            }
            
        } catch (NumberFormatException e) {
            // Error de Formato (ej. idRol no es un número)
            request.setAttribute("error", "Error de formato en ID: " + e.getMessage());
            request.getRequestDispatcher("/WEB-INF/trabajador/registro.jsp").forward(request, response);
        } catch (Exception e) {
            // Error Inesperado (e.g., NullPointer, Hashing)
            request.setAttribute("error", "Error inesperado del sistema: " + e.getMessage());
            request.getRequestDispatcher("/WEB-INF/trabajador/registro.jsp").forward(request, response);
        }
    }

    // -------------------------------------------------------------------------
    // Métodos Wrapper (Requiere el Patrón del Profesor)
    // -------------------------------------------------------------------------
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    @Override
    public String getServletInfo() {
        return "Controlador para la gestión de Trabajadores y su lógica de negocio.";
    }
}