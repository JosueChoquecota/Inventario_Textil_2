/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.dtos;

/**
 *
 * @author ASUS
 */
public class ColorDTO {
    private Integer idColor;
    private String color;

    public ColorDTO() {
    }
    public ColorDTO(Integer idColor, String color) {
        this.idColor = idColor;
        this.color = color;
    }

    public Integer getIdColor() {
        return idColor;
    }

    public void setIdColor(Integer idColor) {
        this.idColor = idColor;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

}
