/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.sistemaOdontologo.dao;

import com.utp.sistemaOdontologo.entities.Contacto;
import com.utp.sistemaOdontologo.repositories.IContactoRepository;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

/**
 *
 * @author ASUS
 */
public class ContactoDAO implements IContactoRepository{
    
    @Override
    public Integer insert(Connection con, Contacto contacto) throws SQLException {
        // Usamos OUTPUT INSERTED.id_contacto para SQL Server
        String SQL = "INSERT INTO Contactos (correo, telefono, direccion) OUTPUT INSERTED.id_contacto VALUES (?, ?, ?);";
        
        try (PreparedStatement ps = con.prepareStatement(SQL)) {
            ps.setString(1, contacto.getCorreo());
            ps.setString(2, contacto.getTelefono());
            ps.setString(3, contacto.getDireccion());
            
            try (ResultSet rs = ps.executeQuery()) { 
                if (rs.next()) {
                    return rs.getInt(1); 
                }
            }
        }
        throw new SQLException("Fallo al obtener ID de Contacto generado.");
    }
}
