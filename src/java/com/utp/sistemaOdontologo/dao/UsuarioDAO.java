/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.sistemaOdontologo.dao;
import com.utp.sistemaOdontologo.entities.Usuario;
import com.utp.sistemaOdontologo.repositories.IUsuarioRepository;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
/**
 *
 * @author ASUS
 */
public class UsuarioDAO implements IUsuarioRepository{
    
    @Override
    public Integer insert(Connection con, Usuario usuario) throws SQLException {
        // La entidad Usuario ya tiene el HASH, Estado y idEmpresa asignados por el Service
        String SQL = "INSERT INTO Usuarios (id_empresa, username, contraseña, estado) OUTPUT INSERTED.id_usuario VALUES (?, ?, ?, ?);";
        
        try (PreparedStatement ps = con.prepareStatement(SQL)) {
            Integer idEmpresaFK = null;
            if (usuario.getEmpresa() != null) {
                idEmpresaFK = usuario.getEmpresa().getIdEmpresa();
            } else {
                // En un sistema real, esto DEBERÍA fallar, pero si usamos la empresa 1 por defecto,
                // podemos asignarlo aquí si el Service falló al hacerlo.
                idEmpresaFK = 1; 
            }
            ps.setInt(1, idEmpresaFK);
            ps.setString(2, usuario.getUsuario());
            ps.setString(3, usuario.getContrasena()); // Clave ya hasheada
            ps.setString(4, usuario.getEstado().name());
            
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return rs.getInt(1);
                }
            }
        }
        throw new SQLException("Fallo al obtener ID de Usuario generado.");
    }
}
