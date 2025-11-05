
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="es">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <!-- Comportamiento responsivo -->
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>JSP Page</title>
        <%@include  file="WEB-INF/jspf/styles.jspf" %>
    </head>
    <body>
        <!-- Header -->
        <%@include  file="WEB-INF/jspf/header.jspf" %>
        <%@include  file="WEB-INF/jspf/navbar.jspf" %>
        <section>
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-6 offset-lg-3">
                    <div class="card">
                        <div class="card-header">
                            Inicio de Sesión
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Sistema de Reservación Odontológica</h5>

                            <form action="login" method="POST"> 
                                <input type="hidden" name="operacion" value="login"/> 

                                <div class="mb-3">
                                    <label for="username" class="form-label">Usuario / Email</label>
                                    <input type="text" class="form-control" name="username" id="username" aria-describedby="emailHelp" required>
                                    <div id="emailHelp" class="form-text">Usar tu usuario del sistema o correo asociado.</div>
                                </div>

                                <div class="mb-3">
                                    <label for="contrasena" class="form-label">Contraseña</label>
                                    <input type="password" class="form-control" id="contrasena" name="contrasena" required>
                                </div>

                                <div class="mb-3 form-check">
                                    <input type="checkbox" class="form-check-input" id="exampleCheck1">
                                    <label class="form-check-label" for="exampleCheck1">Recordarme</label>
                                </div>

                                <button type="submit" class="btn btn-primary">Iniciar Sesión</button>
                            </form>

                            <br>
                            <hr>
                            <a href="#" class="btn btn-secondary">Olvido la Contraseña</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
        <% 
            String error = (String) request.getAttribute("error_login");
            if (error != null) {
        %>
            <div class="alert alert-danger" role="alert">
                <strong>¡Error de Sesión!</strong> <%= error %>
            </div>
        <%
            }
        %>
        <%@include  file="WEB-INF/jspf/footer.jspf" %>
        <%@include  file="WEB-INF/jspf/scripts.jspf" %>
    </body>
</html>
