/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.sistemaOdontologo.entities;

/**
 *
 * @author ASUS
 */
public class Especialidad {
    private final Integer idEspecialidad;
    private final String nombre;

    public Especialidad(Integer idEspecialidad, String nombre) {
        this.idEspecialidad = idEspecialidad;
        this.nombre = nombre;
    }

    public Integer getIdEspecialidad() {
        return idEspecialidad;
    }
    public String getNombre() {
        return nombre;
    } 
}
