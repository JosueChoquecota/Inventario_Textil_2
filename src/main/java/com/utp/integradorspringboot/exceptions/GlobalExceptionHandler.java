package com.utp.integradorspringboot.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    // Manejo de errores de validación (@Valid)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();

        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
    }

    // Manejo de errores de lectura de JSON (ej: números fuera de rango)
    @ExceptionHandler(org.springframework.http.converter.HttpMessageNotReadableException.class)
    public ResponseEntity<Map<String, String>> handleHttpMessageNotReadableException(
            org.springframework.http.converter.HttpMessageNotReadableException ex) {
        Map<String, String> error = new HashMap<>();
        String message = ex.getMessage();

        if (message != null
                && (message.contains("Numeric value out of range") || message.contains("out of range of int"))) {
            error.put("error", "El valor numérico ingresado es demasiado grande.");
        } else {
            error.put("error", "Error en el formato de los datos enviados.");
            error.put("details", "Verifique que los datos sean correctos (fechas, números, etc).");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    // Manejo de errores de base de datos (Integridad de datos, overflow, etc.)
    @ExceptionHandler(org.springframework.dao.DataIntegrityViolationException.class)
    public ResponseEntity<Map<String, String>> handleDataIntegrityViolationException(
            org.springframework.dao.DataIntegrityViolationException ex) {
        Map<String, String> error = new HashMap<>();

        if (isArithmeticOverflow(ex)) {
            error.put("error", "El valor numérico ingresado es demasiado grande para la base de datos.");
        } else {
            error.put("error", "Error de integridad de datos en la base de datos.");
            error.put("details", ex.getMostSpecificCause().getMessage());
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    // Manejo de errores de negocio (RuntimeException)
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, String>> handleRuntimeExceptions(RuntimeException ex) {
        Map<String, String> error = new HashMap<>();

        if (isArithmeticOverflow(ex)) {
            error.put("error", "El valor numérico ingresado es demasiado grande para la base de datos.");
        } else {
            error.put("error", ex.getMessage());
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    // Manejo de errores generales
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleGeneralExceptions(Exception ex) {
        Map<String, String> error = new HashMap<>();

        if (isArithmeticOverflow(ex)) {
            error.put("error", "El valor numérico ingresado es demasiado grande para la base de datos.");
        } else {
            error.put("error", "Ocurrió un error interno en el servidor");
        }

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }

    // Helper para detectar overflow en toda la cadena de causas
    private boolean isArithmeticOverflow(Throwable ex) {
        Throwable cause = ex;
        while (cause != null) {
            String msg = cause.getMessage();
            if (msg != null && (msg.contains("Arithmetic overflow")
                    || msg.contains("converting numeric to data type numeric"))) {
                return true;
            }
            cause = cause.getCause();
        }
        return false;
    }
}
