package com.utp.sistemaOdontologo.repositories;

import com.utp.sistemaOdontologo.entities.Contacto;

import java.sql.Connection;
import java.sql.SQLException;

public interface IContactoRepository {
    Integer insert(Connection con, Contacto contacto) throws SQLException;
    // ... otros métodos CRUD de Contacto
}
