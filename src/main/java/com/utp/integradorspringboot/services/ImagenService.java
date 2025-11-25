/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.services;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ImagenService {

    private static final String UPLOAD_DIR = "uploads/productos/";
    private static final String UPLOAD_DIR_MARCAS = "uploads/marcas/";
    
    /**
     * ✅ MÉTODO ORIGINAL - NO MODIFICADO
     * Guarda imagen de producto (mantiene compatibilidad)
     */
    public String guardarImagen(MultipartFile imagen) {
        try {
            // Validar que es una imagen
            String contentType = imagen.getContentType();
            if (contentType == null || !contentType.startsWith("image/")) {
                throw new RuntimeException("El archivo no es una imagen válida");
            }

            // Generar nombre único
            String nombreOriginal = imagen.getOriginalFilename();
            if (nombreOriginal == null) {
                throw new RuntimeException("Nombre de archivo inválido");
            }

            String extension = nombreOriginal.substring(nombreOriginal.lastIndexOf("."));
            String nombreLimpio = nombreOriginal
                    .replaceAll("[^a-zA-Z0-9.]", "_")
                    .replace(extension, "");
            String nombreUnico = System.currentTimeMillis() + "_" + nombreLimpio + extension;

            // Crear directorio si no existe
            Path rutaDirectorio = Paths.get(UPLOAD_DIR);
            if (!Files.exists(rutaDirectorio)) {
                Files.createDirectories(rutaDirectorio);
            }

            // Guardar archivo
            Path rutaArchivo = rutaDirectorio.resolve(nombreUnico);
            Files.copy(imagen.getInputStream(), rutaArchivo, StandardCopyOption.REPLACE_EXISTING);

            // Retornar ruta relativa
            return UPLOAD_DIR + nombreUnico;

        } catch (IOException e) {
            throw new RuntimeException("Error al guardar imagen: " + e.getMessage());
        }
    }

    /**
     * ✅ NUEVO - Guarda imagen de MARCA
     */
    public String guardarImagenMarca(MultipartFile logo) {
        try {
            System.out.println("📥 Guardando logo de marca...");

            // Validar que es una imagen
            String contentType = logo.getContentType();
            if (contentType == null || !contentType.startsWith("image/")) {
                throw new RuntimeException("El archivo no es una imagen válida");
            }

            // Validar tamaño (máximo 5MB)
            long maxSize = 5 * 1024 * 1024; // 5MB
            if (logo.getSize() > maxSize) {
                throw new RuntimeException("La imagen excede el tamaño máximo permitido (5MB)");
            }

            // Generar nombre único
            String nombreOriginal = logo.getOriginalFilename();
            if (nombreOriginal == null) {
                throw new RuntimeException("Nombre de archivo inválido");
            }

            String extension = nombreOriginal.substring(nombreOriginal.lastIndexOf("."));
            String nombreLimpio = nombreOriginal
                    .replaceAll("[^a-zA-Z0-9.]", "_")
                    .replace(extension, "");
            String nombreUnico = System.currentTimeMillis() + "_" + nombreLimpio + extension;

            // Crear directorio si no existe
            Path rutaDirectorio = Paths.get(UPLOAD_DIR_MARCAS);
            if (!Files.exists(rutaDirectorio)) {
                Files.createDirectories(rutaDirectorio);
                System.out.println("📁 Directorio creado: " + rutaDirectorio);
            }

            // Guardar archivo
            Path rutaArchivo = rutaDirectorio.resolve(nombreUnico);
            Files.copy(logo.getInputStream(), rutaArchivo, StandardCopyOption.REPLACE_EXISTING);

            String rutaCompleta = UPLOAD_DIR_MARCAS + nombreUnico;
            System.out.println("✅ Logo guardado: " + rutaCompleta);

            // Retornar ruta relativa
            return rutaCompleta;

        } catch (IOException e) {
            throw new RuntimeException("Error al guardar logo: " + e.getMessage());
        }
    }

    /**
     * ✅ MÉTODO ORIGINAL - NO MODIFICADO
     * Elimina imagen del sistema
     */
    public void eliminarImagen(String rutaImagen) {
        try {
            if (rutaImagen != null && !rutaImagen.isEmpty()) {
                Path path = Paths.get(rutaImagen);
                if (Files.exists(path)) {
                    Files.delete(path);
                    System.out.println("🗑️ Imagen eliminada: " + rutaImagen);
                }
            }
        } catch (IOException e) {
            System.err.println("⚠️ No se pudo eliminar la imagen: " + e.getMessage());
        }
    }

    /**
     * ✅ NUEVO - Actualiza imagen de marca
     * Elimina la anterior y guarda la nueva
     */
    public String actualizarImagenMarca(String logoAnterior, MultipartFile logoNuevo) {
        // Eliminar logo anterior si existe
        if (logoAnterior != null && !logoAnterior.isEmpty()) {
            eliminarImagen(logoAnterior);
        }

        // Guardar nuevo logo
        return guardarImagenMarca(logoNuevo);
    }

    /**
     * ✅ NUEVO - Verifica si existe una imagen
     */
    public boolean existeImagen(String rutaImagen) {
        if (rutaImagen == null || rutaImagen.isEmpty()) {
            return false;
        }
        return Files.exists(Paths.get(rutaImagen));
    }
}