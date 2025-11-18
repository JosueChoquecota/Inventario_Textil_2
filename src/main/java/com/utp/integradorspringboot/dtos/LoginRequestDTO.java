/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

/**
 *
 * @author ASUS
 */
public class LoginRequestDTO {
    @NotBlank(message = "El correo es obligatorio")
    @Email(message = "Debe ser un correo válido")
    private String correo;  
    @NotBlank(message = "La contraseña es obligatoria")
    private String contrasena;

    public LoginRequestDTO() {
    }

    
    public LoginRequestDTO(String correo, String contrasena) {
        this.correo = correo;
        this.contrasena = contrasena;
    }
    
    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getContrasena() {
        return contrasena;
    }

    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }
    
    
}
