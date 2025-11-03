/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.sistemaOdontologo.services;

import com.utp.sistemaOdontologo.connection.ConnectionDataBase;
import com.utp.sistemaOdontologo.dao.ContactoDAO;
import com.utp.sistemaOdontologo.dao.TrabajadorDAO;
import com.utp.sistemaOdontologo.dao.UsuarioDAO;
import com.utp.sistemaOdontologo.dtos.TrabajadorDTORequest;
import com.utp.sistemaOdontologo.dtos.TrabajadorDTOResponse;
import com.utp.sistemaOdontologo.entities.Contacto;
import com.utp.sistemaOdontologo.entities.Empresa;
import com.utp.sistemaOdontologo.entities.Trabajador;
import com.utp.sistemaOdontologo.entities.Usuario;
import com.utp.sistemaOdontologo.entities.enums.EstadoUsuario;
import com.utp.sistemaOdontologo.mappers.TrabajadorMapper;
import com.utp.sistemaOdontologo.security.EncriptarClave;
import java.util.List;
import java.sql.Connection;
import java.sql.SQLException;


/**
 *
 * @author ASUS
 */
public class TrabajadorService {
   
    private ContactoDAO contactoDAO;
    private UsuarioDAO usuarioDAO;
    private TrabajadorDAO trabajadorDAO;
    private ConnectionDataBase dbConnection;
    private Empresa empresa;
    public TrabajadorService() {
        // Inicializamos los DAOs y el manejador de conexión
        contactoDAO = new ContactoDAO();
        usuarioDAO = new UsuarioDAO();
        trabajadorDAO = new TrabajadorDAO();
        dbConnection = new ConnectionDataBase();
    }
    public Boolean insert(TrabajadorDTORequest request) {
        
        Connection con = null;
        Integer idContactoGenerado = null;
        Integer idUsuarioGenerado = null;
        Boolean exito = false;
        
        try {
            con = dbConnection.getConnection();
            con.setAutoCommit(false); // <--- INICIA LA TRANSACCIÓN
            
            // 1. Mapear y gestionar Contacto
            Contacto contacto = TrabajadorMapper.toContactoEntity(request);
            // El DAO ahora recibe la CONEXIÓN
            idContactoGenerado = contactoDAO.insert(con, contacto); 

            // 2. Mapear, hashear y gestionar Usuario (Lógica de Negocio/Seguridad)
            Usuario usuario = TrabajadorMapper.toUsuarioEntity(request);
            
            // Lógica de Servicio: Asignación de estado y hash
            usuario.setEstado(EstadoUsuario.ACTIVO);
            
            Empresa empresaStub = new Empresa();
empresaStub.setIdEmpresa(1); 
usuario.setEmpresa(empresaStub); // <--- ESTO DEBE ASIGNAR EL OBJETO        
            
            // 2.2. ENCRIPTACIÓN REALIZADA CON TU CLASE
            String clavePlana = usuario.getContrasena();
            String claveHasheada = EncriptarClave.encriptar(clavePlana); // <--- USO DE TU MÉTODO
            usuario.setContrasena(claveHasheada); // Asigna el hash a la entidad
            
            // El DAO ahora recibe la CONEXIÓN
            idUsuarioGenerado = usuarioDAO.insert(con, usuario); 
            
            // 3. Mapear y gestionar Trabajador
            Trabajador trabajador = TrabajadorMapper.toTrabajadorEntity(request, idContactoGenerado, idUsuarioGenerado);
            
            // El DAO ahora recibe la CONEXIÓN
            exito = trabajadorDAO.insert(con, trabajador); 
            
            // Si llegamos aquí sin excepción, hacemos COMMIT
            if (exito) {
                con.commit();
            } else {
                con.rollback(); // Si el insertTrabajador falló por alguna razón
            }
            
        } catch (Exception e) {
            System.err.println("Error transaccional al crear trabajador: " + e.getMessage());
            // Si hay excepción (e.g., error de SQL, hashing), hacemos ROLLBACK
            try { if (con != null) con.rollback(); } catch (SQLException ex) { /* log error */ }
            return false;
            
        } finally {
            // Siempre cerramos la conexión
            try { if (con != null) con.close(); } catch (SQLException ex) { /* log error */ }
        }
        
        return exito;
    }
    
    // -------------------------------------------------------------------------------------------------
    // Métodos CRUD Clásicos
    // -------------------------------------------------------------------------------------------------

   
}
