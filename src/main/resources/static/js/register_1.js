//---------------------------------------------------------------------------
//Declaracion de variables del html
document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.querySelector('form.user');
    const botonGuardar = formulario.querySelector('button[type="submit"]');
    const alerta = document.getElementById("alerta-dni");
    const tbody = document.getElementById('usuarios-body');
//---------------------------------------------------------------------------
//Funcion para llenar formulario con los datos del usuario

    function llenarFormulario(usuario) {
        document.getElementById('idUsuario').value = usuario.id;
        document.getElementById('nombre').value = usuario.nombre;
        document.getElementById('dni').value = usuario.dni;
        document.getElementById('correo').value = usuario.correo;
        document.getElementById('contrasena').value = "";
        document.getElementById('areaId').value = usuario.areaId;
        document.getElementById('cargoId').value = usuario.cargoId;
        document.getElementById('rolId').value = usuario.rolId;
        document.getElementById('rangoId').value = usuario.rangoId;
        document.getElementById('sedeId').value = usuario.sedeId;
        document.getElementById('fechaInicio').value = usuario.fecha;
        document.getElementById('tipoContratacionId').value = usuario.tipoId;
        document.getElementById('estadoId').value = usuario.estadoId;

        botonGuardar.innerText = 'Actualizar';
        formulario.setAttribute('action', '/register/actualizar');
    }

//---------------------------------------------------------------------------
// FUNCION DE EDITAR , TANTO CLICK EN EL BOTON COMO EN LA FILA
    tbody.addEventListener('click', (e) => {
        const fila = e.target.closest('tr'); // Detecta la fila clickeada
        if (!fila)
            return;


        const btn = fila.querySelector('.btn-editar');  // Busca el botón de editar dentro de la fila
        if (!btn)
            return;

        const usuario = {// Recupera los datos desde los data-* del botón
            id: btn.dataset.id,
            nombre: btn.dataset.nombre,
            dni: btn.dataset.dni,
            correo: btn.dataset.correo,
            areaId: btn.dataset.areaId,
            cargoId: btn.dataset.cargoId,
            rolId: btn.dataset.rolId,
            rangoId: btn.dataset.rangoId,
            sedeId: btn.dataset.sedeId,
            fecha: btn.dataset.fecha,
            tipoId: btn.dataset.tipoId,
            estadoId: btn.dataset.estadoId
        };

        llenarFormulario(usuario);
    });
//---------------------------------------------------------------------------
// Evita que el formulario recargue la página (envío tradicional) para hacer la operación con AJAX (fetch).

    formulario.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = new FormData(formulario);
        const data = {};
        formData.forEach((v, k) => data[k] = v);

        const url = data.idUsuario ? '/register/actualizar' : '/register/ajax';

        fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })
                .then(res => res.json())
                .then(res => {
                    if (res.error) {
                        alerta.style.display = "block";
                        alerta.textContent = res.error;
                    } else {
                        alerta.style.display = "none";
                        formulario.reset();
                        botonGuardar.innerText = 'Guardar';

                        if (data.idUsuario) {
                            const filaVieja = tbody.querySelector(`tr[data-id='${data.idUsuario}']`);
                            if (filaVieja)
                                filaVieja.remove();
                        }

                        agregarFilaUsuario(res.usuario);
                    }
                })
                .catch(err => console.error(err));
    });
//---------------------------------------------------------------------------
// Funcion crear dinámicamente una nueva fila con los datos devueltos por el backend.
    function agregarFilaUsuario(u) {
        const tr = document.createElement('tr');

        // Poner el data-id en el tr
        tr.setAttribute('data-id', u.idUsuario);


        tr.innerHTML = `
            <td>${u.idUsuario}</td>
            <td>${u.nombre}</td>
            <td>${u.dni}</td>
            <td>${u.correo}</td>
            <td>${u.area.nombre}</td>
            <td>${u.cargo.nombre}</td>
            <td>${u.estado.nombre}</td>
            <td>${u.rol.nombre}</td>
            <td>${u.rango.nombre}</td>
            <td>${u.sede.nombre}</td>
            <td>${u.fechaInicio}</td>
            <td>${u.tipoContratacion.nombre}</td>
            <td class="text-center">
                <a href="javascript:void(0)" 
                   class="btn btn-sm btn-primary btn-editar"
                   data-id="${u.idUsuario}"
                   data-nombre="${u.nombre}"
                   data-dni="${u.dni}"
                   data-correo="${u.correo}"
                   data-area-id="${u.area.idArea}"
                   data-cargo-id="${u.cargo.idCargo}"
                   data-rol-id="${u.rol.idRol}"
                   data-rango-id="${u.rango.idRango}"
                   data-sede-id="${u.sede.idSede}"
                   data-fecha="${u.fechaInicio}"
                   data-tipo-id="${u.tipoContratacion.idTipoContratacion}"
                   data-estado-id="${u.estado.idEstado}">
                    <i class="fas fa-edit"></i>
                </a>
                <a href="/register/eliminar/${u.idUsuario}" class="btn btn-sm btn-danger">
                    <i class="fas fa-trash"></i>
                </a>
            </td>
        `;
        tbody.appendChild(tr);
    }
//---------------------------------------------------------------------------
// FILTRO DE BUSQUEDA
    $("#btn-buscar").click(() => {
        const valor = $("#busquedaTrabajador").val().toLowerCase();
        $("#usuarios-body tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().includes(valor));
        });
    });

    $("#busquedaTrabajador").on("keyup", () => {
        const valor = $("#busquedaTrabajador").val().toLowerCase();
        $("#usuarios-body tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().includes(valor));
        });
    });
});


//---------------------------------------------------------------------------
$(document).ready(function () {
    function filtrarUsuarios() {
        var valor = $("#busquedaTrabajador").val().toLowerCase();
        $("#usuarios-body tr").each(function () {
            var textoFila = $(this).text().toLowerCase();
            $(this).toggle(textoFila.indexOf(valor) > -1);
        });
    }

    // Filtrar al escribir
    $("#busquedaTrabajador").on("keyup", filtrarUsuarios);

    // Filtrar al hacer click en el botón
    $("#btn-buscar").click(filtrarUsuarios);
});