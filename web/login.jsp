
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
                                <h5 class="card-title">Special title treatment</h5>
                                <form action="UsuarioController.do" method="POST">
                                    <input type="hidden" name="operacion" value="login"/>
                                    <div class="mb-3">
                                        <label for="correo" class="form-label">Email address</label>
                                        <input type="text" class="form-control" name="correo" id="correo" aria-describedby="emailHelp">
                                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                                    </div>
                                    <div class="mb-3">
                                        <label for="clave" class="form-label">Password</label>
                                        <input type="password" class="form-control" id="clave" name="clave">
                                    </div>
                                    <div class="mb-3 form-check">
                                        <input type="checkbox" class="form-check-input" id="exampleCheck1">
                                        <label class="form-check-label" for="exampleCheck1">Check me out</label>
                                    </div>
                                    <button type="submit" class="btn btn-primary">Iniciar Sesión</button>
                                </form>
                                <br>
                                <hr>
                                <a href="#" class="btn btn-primary">Olvido la Contraseña</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <%@include  file="WEB-INF/jspf/footer.jspf" %>
        <%@include  file="WEB-INF/jspf/scripts.jspf" %>
    </body>
</html>
