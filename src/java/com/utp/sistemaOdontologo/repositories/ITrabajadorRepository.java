/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.utp.sistemaOdontologo.repositories;

import com.utp.sistemaOdontologo.entities.Trabajador;
import java.sql.Connection;
import java.sql.SQLException;

public interface ITrabajadorRepository extends ICRUD<Trabajador, Integer>{
    Trabajador listByName(String nombre);
    Boolean insert(Connection con, Trabajador trabajador) throws SQLException;
}
