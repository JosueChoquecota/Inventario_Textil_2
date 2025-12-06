package com.utp.integradorspringboot.services;

import com.utp.integradorspringboot.models.Rol;
import com.utp.integradorspringboot.repositories.RolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RolService {

    @Autowired
    private RolRepository rolRepository;

    public List<Rol> listarTodos() {
        return rolRepository.findAll();
    }
}
