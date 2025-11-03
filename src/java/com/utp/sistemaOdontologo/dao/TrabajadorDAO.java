/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.sistemaOdontologo.dao;
import com.utp.sistemaOdontologo.connection.ConnectionDataBase;
import com.utp.sistemaOdontologo.dtos.TrabajadorDTORequest;
import com.utp.sistemaOdontologo.entities.Contacto;
import com.utp.sistemaOdontologo.entities.Trabajador;
import com.utp.sistemaOdontologo.entities.Usuario;
import com.utp.sistemaOdontologo.mappers.TrabajadorMapper;
import com.utp.sistemaOdontologo.repositories.ITrabajadorRepository;
import java.util.List;
import java.sql.*;


/**
 *
 * @author ASUS
 */
public class TrabajadorDAO implements ITrabajadorRepository {

    private ConnectionDataBase pstm;
    private ResultSet res;
    private ConnectionDataBase con;
    
    @Override
    public Boolean insert(Connection con, Trabajador trabajador) throws SQLException {
        String SQL = "INSERT INTO Trabajadores (id_usuario, id_contacto, id_tipo_doc, id_especialidad, nombre, apellido, colegiatura, rol, fecha_registro) VALUES (?, ?, ?, ?, ?, ?, ?, ?, GETDATE());";
        try (PreparedStatement ps = con.prepareStatement(SQL)) {
            ps.setInt(1, trabajador.getUsuario().getIdUsuario());
            ps.setInt(2, trabajador.getContacto().getIdContacto());
            ps.setInt(3, trabajador.getTipoDocumento().getIdTipoDocumento());
            
            // Manejo de especialidad NULL
            if (trabajador.getEspecialidad() != null) {
                ps.setInt(4, trabajador.getEspecialidad().getIdEspecialidad());
            } else {
                ps.setNull(4, java.sql.Types.INTEGER);
            }
            
            ps.setString(5, trabajador.getNombre());
            ps.setString(6, trabajador.getApellido());
            ps.setString(7, trabajador.getColegiatura());
            ps.setString(8, trabajador.getRol().name());

            return ps.executeUpdate() > 0;
        }
    }
    
 

    @Override
    public Boolean update(Trabajador t) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public Boolean delete(Integer id) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public List<Trabajador> list() {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public Trabajador listById(Integer id) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public Trabajador listByName(String nombre) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public Boolean insert(Trabajador t) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }
    
}
