/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.utp.integradorspringboot.api;

import com.utp.integradorspringboot.dtos.LoginRequestDTO;
import com.utp.integradorspringboot.dtos.LoginResponseDTO;
import com.utp.integradorspringboot.models.Trabajador;
import com.utp.integradorspringboot.repositories.TrabajadorRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AuthApiController {
    
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TrabajadorRepository trabajadorRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @Valid @RequestBody LoginRequestDTO request,
            HttpServletRequest httpRequest) {
        try {
            System.out.println("📥 Intento de login: " + request.getCorreo());

            // 1. Autenticar con Spring Security
            // Esto llamará automáticamente a TrabajadorUserDetailsService.loadUserByUsername()
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    request.getCorreo(),
                    request.getContrasena()
                )
            );

            // 2. Establecer autenticación en el contexto de Spring Security
            SecurityContext securityContext = SecurityContextHolder.getContext();
            securityContext.setAuthentication(authentication);

            // 3. Crear sesión HTTP y guardar el SecurityContext
            HttpSession session = httpRequest.getSession(true);
            session.setAttribute(
                HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY,
                securityContext
            );

            // 4. Obtener datos del trabajador para la respuesta
            Trabajador trabajador = trabajadorRepository.findByCorreo(request.getCorreo())
                .orElseThrow(() -> new RuntimeException("Trabajador no encontrado"));

            // 5. Preparar respuesta
            LoginResponseDTO response = new LoginResponseDTO();
            response.setId(trabajador.getIdTrabajador());
            response.setNombres(trabajador.getNombres());
            response.setApellidos(trabajador.getApellidos());
            response.setCorreo(trabajador.getCorreo());
            response.setRol(trabajador.getRol().getNombreRol());
            response.setIdRol(trabajador.getRol().getId_rol());
            response.setTelefono(trabajador.getTelefono());
            response.setnDocumento(trabajador.getnDocumento());
            response.setId_tipo_doc(trabajador.getTipoDocumento().getId_tipo_doc());
            
            

            System.out.println("✅ Login exitoso: " + trabajador.getCorreo() + " - Rol: " + trabajador.getRol().getNombreRol());

            return ResponseEntity.ok(response);

        } catch (BadCredentialsException e) {
            System.out.println("❌ Credenciales incorrectas: " + request.getCorreo());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("Correo o contraseña incorrectos");

        } catch (Exception e) {
            System.out.println("❌ Error en login: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error en el servidor");
        }
    }

    @GetMapping("/check")
    public ResponseEntity<?> checkSession() {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            
            if (auth == null || !auth.isAuthenticated() || "anonymousUser".equals(auth.getPrincipal())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("No hay sesión activa");
            }

            String correo = auth.getName();
            Trabajador trabajador = trabajadorRepository.findByCorreo(correo)
                .orElseThrow(() -> new RuntimeException("Trabajador no encontrado"));

            LoginResponseDTO response = new LoginResponseDTO();
            response.setId(trabajador.getIdTrabajador());
            response.setNombres(trabajador.getNombres());
            response.setApellidos(trabajador.getApellidos());
            response.setCorreo(trabajador.getCorreo());
            response.setRol(trabajador.getRol().getNombreRol());
            response.setIdRol(trabajador.getRol().getId_rol());
            response.setId_tipo_doc(trabajador.getTipoDocumento().getId_tipo_doc());
            response.setTelefono(trabajador.getTelefono());
            response.setnDocumento(trabajador.getnDocumento());
            
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("Sesión inválida");
        }
    }
    
    
}
