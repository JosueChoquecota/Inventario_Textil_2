/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.api;

import com.utp.integradorspringboot.dtos.MarcaDTO;
import com.utp.integradorspringboot.dtos.MarcaRequestDTO;
import com.utp.integradorspringboot.mappers.MarcaMapper;
import com.utp.integradorspringboot.models.Marca;
import com.utp.integradorspringboot.services.MarcaService;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/marcas") 
public class MarcaApiController {

     @Autowired
    private MarcaService marcaService;

    private final MarcaMapper marcaMapper = MarcaMapper.INSTANCE;

    @PostMapping(value = "/registrar", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> crearMarca(
            @RequestPart("data") MarcaRequestDTO requestDto,
            @RequestPart(value = "logo", required = false) MultipartFile logoFile
    ) {
        try {
            Marca marcaNueva = marcaMapper.requestDtoToEntity(requestDto);

            if (logoFile != null && !logoFile.isEmpty()) {
                String uploadDir = "uploads/marcas/";
                File directorio = new File(uploadDir);
                if (!directorio.exists()) directorio.mkdirs();

                String nombreArchivo = System.currentTimeMillis() + "_" + logoFile.getOriginalFilename();
                Path rutaArchivo = Paths.get(uploadDir, nombreArchivo);
                Files.copy(logoFile.getInputStream(), rutaArchivo, StandardCopyOption.REPLACE_EXISTING);

                marcaNueva.setLogo(uploadDir + nombreArchivo);
            } else {
                marcaNueva.setLogo("uploads/marcas/default.png");
            }

            Marca marcaGuardada = marcaService.guardarOActualizarMarca(marcaNueva);
            MarcaDTO responseDto = marcaMapper.entityToDto(marcaGuardada);

            return new ResponseEntity<>(responseDto, HttpStatus.CREATED);

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al crear la marca: " + e.getMessage());
        }
    }

    @GetMapping("/listar")
    public ResponseEntity<List<MarcaDTO>> listarMarcas() {
        List<Marca> marcas = marcaService.listarTodasMarcas();
        List<MarcaDTO> marcasDto = marcas.stream()
                .map(marcaMapper::entityToDto)
                .toList();
        return ResponseEntity.ok(marcasDto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerMarcaPorId(@PathVariable Integer id) {
        try {
            Marca marca = marcaService.buscarMarcaPorId(id);
            MarcaDTO responseDto = marcaMapper.entityToDto(marca);
            return ResponseEntity.ok(responseDto);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
    @PutMapping(value = "/actualizar/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> actualizarMarca(
            @PathVariable Integer id,
            @RequestPart("data") MarcaRequestDTO requestDto,
            @RequestPart(value = "logo", required = false) MultipartFile logoFile
    ) {
        try {
            Marca marcaExistente = marcaService.buscarMarcaPorId(id);

            marcaExistente.setMarca(requestDto.getMarca());
            marcaExistente.setDescLogo(requestDto.getDescLogo());

            // Actualizar logo si se envía uno nuevo
            if (logoFile != null && !logoFile.isEmpty()) {
                String uploadDir = "uploads/marcas/";
                File directorio = new File(uploadDir);
                if (!directorio.exists()) directorio.mkdirs();

                String nombreArchivo = System.currentTimeMillis() + "_" + logoFile.getOriginalFilename();
                Path rutaArchivo = Paths.get(uploadDir, nombreArchivo);
                Files.copy(logoFile.getInputStream(), rutaArchivo, StandardCopyOption.REPLACE_EXISTING);

                marcaExistente.setLogo(uploadDir + nombreArchivo);
            }

            Marca marcaActualizada = marcaService.guardarOActualizarMarca(marcaExistente);
            MarcaDTO responseDto = marcaMapper.entityToDto(marcaActualizada);

            return ResponseEntity.ok(responseDto);

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al actualizar la marca: " + e.getMessage());
        }
    }
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarMarca(@PathVariable Integer id) {
        try {
            marcaService.eliminarMarca(id);
            return ResponseEntity.ok("Marca eliminada correctamente");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}