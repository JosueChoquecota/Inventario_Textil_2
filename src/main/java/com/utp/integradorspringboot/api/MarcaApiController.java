package com.utp.integradorspringboot.api;

import com.utp.integradorspringboot.dtos.MarcaRequestDTO;
import com.utp.integradorspringboot.dtos.MarcaResponseDTO;
import com.utp.integradorspringboot.mappers.MarcaMapper;
import com.utp.integradorspringboot.models.Marca;
import com.utp.integradorspringboot.repositories.MarcaRepository;
import com.utp.integradorspringboot.services.ImagenService;
import com.utp.integradorspringboot.services.MarcaService;
import jakarta.validation.Valid;
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

    private final MarcaService marcaService;
    private final MarcaMapper marcaMapper;
    private final ImagenService imagenService;

    @Autowired
    public MarcaApiController(
            MarcaService marcaService,
            MarcaMapper marcaMapper,
            ImagenService imagenService) {
        this.marcaService = marcaService;
        this.marcaMapper = marcaMapper;
        this.imagenService = imagenService;
    }

    @GetMapping("/listar")
    public ResponseEntity<List<MarcaResponseDTO>> listarMarcas() {
        try {
            List<Marca> marcas = marcaService.listarMarcas();
            List<MarcaResponseDTO> response = marcaMapper.toDTOList(marcas);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // ✅ REGISTRAR
    @PostMapping(value = "/registrar", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> registrarMarca(
            @RequestPart("data") MarcaRequestDTO dto,
            @RequestPart(value = "logo", required = false) MultipartFile logo
    ) {
        System.out.println("======================================");
        System.out.println("📥 REGISTRAR MARCA");
        System.out.println("📦 DTO: " + dto);
        System.out.println("📦 Logo: " + (logo != null ? logo.getOriginalFilename() : "null"));
        System.out.println("======================================");
        
        try {
            // ✅ Guardar logo AQUÍ y setear la ruta en el DTO
            if (logo != null && !logo.isEmpty()) {
                String rutaLogo = imagenService.guardarImagenMarca(logo);
                dto.setLogo(rutaLogo);
                System.out.println("💾 Logo guardado: " + rutaLogo);
            }
            
            Marca creada = marcaService.crear(dto);
            MarcaResponseDTO response = marcaMapper.toDTOResponse(creada);
            
            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // ✅ ACTUALIZAR
    @PutMapping(value = "/actualizar/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> actualizarMarca(
            @PathVariable Integer id,
            @RequestPart("data") MarcaRequestDTO dto,
            @RequestPart(value = "logo", required = false) MultipartFile nuevoLogo
    ) {
        System.out.println("======================================");
        System.out.println("📥 ACTUALIZAR MARCA ID: " + id);
        System.out.println("📦 DTO: " + dto);
        System.out.println("📦 Nuevo logo: " + (nuevoLogo != null ? nuevoLogo.getOriginalFilename() : "null"));
        System.out.println("======================================");
        
        try {
            // ✅ Obtener marca actual
            Marca marcaActual = marcaService.obtenerPorId(id);

            // ✅ Si hay nuevo logo, guardarlo y setear en el DTO
            if (nuevoLogo != null && !nuevoLogo.isEmpty()) {
                System.out.println("📦 Procesando nuevo logo: " + nuevoLogo.getOriginalFilename());
                System.out.println("📦 Tamaño: " + nuevoLogo.getSize() + " bytes");
                
                // Guardar nuevo logo
                String rutaNuevoLogo = imagenService.guardarImagenMarca(nuevoLogo);
                dto.setLogo(rutaNuevoLogo);
                System.out.println("💾 Nuevo logo guardado: " + rutaNuevoLogo);
            } else {
                System.out.println("📝 Sin logo nuevo, manteniendo el existente");
                // ✅ Mantener el logo actual
                dto.setLogo(marcaActual.getLogo());
            }

            // ✅ Actualizar marca (el service eliminará el logo anterior si cambió)
            Marca actualizada = marcaService.actualizar(id, dto);
            MarcaResponseDTO response = marcaMapper.toDTOResponse(actualizada);

            System.out.println("✅ Marca actualizada correctamente");
            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
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