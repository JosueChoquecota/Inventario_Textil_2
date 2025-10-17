/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.sistemaOdontologo.connection;

import java.sql.Connection;
import java.sql.DriverManager;

/**
 *
 * @author ASUS
 */
public class ConnectionDataBase {
    private static ConnectionDataBase instance;
    private static Connection con;
    private static final String URL = "jdbc:sqlserver://sql5111.site4now.net;databaseName=db_abf869_dbsistemaodon;Encrypt=True;TrustServerCertificate=True;Instance=MSSQLSERVER";
    private static final String DRIVER = "com.microsoft.sqlserver.jdbc.SQLServerDriver";
    private static final String USER = "db_abf869_dbsistemaodon_admin";
    private static final String PASS = "Sistema_2025";

    private ConnectionDataBase() {

        try {
            Class.forName(DRIVER);
            con = DriverManager.getConnection(URL, USER, PASS);
            System.out.println("Conectado a la base de datos");

        } catch (Exception e) {
            System.out.println("Error al conectar :" + e.getMessage());
            e.printStackTrace();
        }
    }

    public synchronized static ConnectionDataBase getInstance() {

        if (instance == null) {
            instance = new ConnectionDataBase();
        }
        return instance;
    }

    public Connection getConnection() {
        return con;
    }

    public void close() {
        instance = null;
    }
    public static void main(String[] args) {
        ConnectionDataBase db = new ConnectionDataBase();
        
        System.out.println(db);
    }
}
