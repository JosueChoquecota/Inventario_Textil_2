/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.sistemaOdontologo.repositories;

import java.util.List;

/**
 *
 * @author ASUS
 */
public interface ICRUD <T, K> {
    Boolean insert(T t);
    Boolean update(T t);
    Boolean delete(K id);
    List<T> list();
    T listById(K id);
}
