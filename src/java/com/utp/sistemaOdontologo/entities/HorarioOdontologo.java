/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.sistemaOdontologo.entities;

import com.utp.sistemaOdontologo.entities.enums.DiaSemana;

/**
 *
 * @author ASUS
 */
public class HorarioOdontologo {
    private final Integer idHorarioOdontologo;
    private final Trabajador trabajador;
    private final Horario horario;
    private final DiaSemana diaSemanaa;

    public HorarioOdontologo(Integer idHorarioOdontologo, Trabajador trabajador, Horario horario, DiaSemana diaSemanaa) {
        this.idHorarioOdontologo = idHorarioOdontologo;
        this.trabajador = trabajador;
        this.horario = horario;
        this.diaSemanaa = diaSemanaa;
    }
    public Integer getIdHorarioOdontologo() {
        return idHorarioOdontologo;
    }
    public Trabajador getTrabajador() {
        return trabajador;
    }
    public Horario getHorario() {
        return horario;
    }
    public DiaSemana getDiaSemanaa() {
        return diaSemanaa;
    }
}
