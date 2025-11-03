
package com.utp.sistemaOdontologo.repositories;
import com.utp.sistemaOdontologo.entities.Usuario;
import java.sql.Connection;
import java.sql.SQLException;


public interface IUsuarioRepository {
    Integer insert(Connection con, Usuario usuario) throws SQLException;
    // ... otros métodos CRUD de Usuario
}
