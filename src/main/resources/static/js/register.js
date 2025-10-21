document.addEventListener('DOMContentLoaded', () => {

    const formulario = document.querySelector('form.user');
    const botonGuardar = formulario.querySelector('button[type="submit"]');
    const alerta = document.getElementById("alerta-dni");

    // Inicializamos DataTable con server-side
    const table = $('#dataTable').DataTable({
        serverSide: true,
        processing: true,
        ajax: {
            url: '/register/usuarios',
            type: 'GET',
            data: function (d) {
                // d.search.value ya se envía automáticamente
                // si quieres añadir filtros adicionales, se agregan aquí
            }
        },
        columns: [
            {data: 'idUsuario'},
            {data: 'nombre'},
            {data: 'dni'},
            {data: 'correo'},
            {data: 'areaNombre'},
            {data: 'cargoNombre'},
            {data: 'estadoNombre'},
            {data: 'rolNombre'},
            {data: 'rangoNombre'},
            {data: 'sedeNombre'},
            {data: 'fechaInicio'},
            {data: 'tipoContratacionNombre'},
            {
                data: 'idUsuario',
                render: function (data, type, row) {
                    return `
                        <a href="javascript:void(0)" class="btn btn-sm btn-primary btn-editar" 
                           data-id="${data}"
                           data-nombre="${row.nombre}"
                           data-dni="${row.dni}"
                           data-correo="${row.correo}"
                           data-area-id="${row.areaId}"
                           data-cargo-id="${row.cargoId}"
                           data-rol-id="${row.rolId}"
                           data-rango-id="${row.rangoId}"
                           data-sede-id="${row.sedeId}"
                           data-fecha="${row.fechaInicio}"
                           data-tipo-id="${row.tipoContratacionId}"
                           data-estado-id="${row.estadoId}">
                            <i class="fas fa-edit"></i>
                        </a>
                        <a href="/register/eliminar/${data}" class="btn btn-sm btn-danger">
                            <i class="fas fa-trash"></i>
                        </a>
                    `;
                },
                orderable: false,
                searchable: false
            }
        ],
        lengthMenu: [[10, 50, 100, 200, -1], [10, 50, 100, 200, "Todos"]]
    });

    // Función común para llenar el formulario
    function llenarFormularioUsuario(btn) {
        formulario.reset();
        document.getElementById('idUsuario').value = btn.data('id');
        document.getElementById('nombre').value = btn.data('nombre');
        document.getElementById('dni').value = btn.data('dni');
        document.getElementById('correo').value = btn.data('correo');
        document.getElementById('areaId').value = btn.data('area-id');
        document.getElementById('cargoId').value = btn.data('cargo-id');
        document.getElementById('rolId').value = btn.data('rol-id');
        document.getElementById('rangoId').value = btn.data('rango-id');
        document.getElementById('sedeId').value = btn.data('sede-id');
        document.getElementById('fechaInicio').value = btn.data('fecha');
        document.getElementById('tipoContratacionId').value = btn.data('tipo-id');
        document.getElementById('estadoId').value = btn.data('estado-id');

        botonGuardar.innerText = 'Actualizar';
        formulario.setAttribute('action', '/register/actualizar');
    }

// Click en el botón de editar
    $('#dataTable tbody').on('click', '.btn-editar', function (e) {
        e.stopPropagation(); // evitar que el clic en el botón también dispare el evento de fila
        llenarFormularioUsuario($(this));
    });

// Click en cualquier parte de la fila
    $('#dataTable tbody').on('click', 'tr', function () {
        const btn = $(this).find('.btn-editar');
        if (btn.length) {
            llenarFormularioUsuario(btn);
        }
    });



    //-----------------------------------------------------------------------
    // Envío del formulario vía AJAX
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
                        // recargar la tabla para reflejar cambios
                        table.ajax.reload(null, false); // false = no resetear paginación
                    }
                })
                .catch(err => console.error(err));
    });

    //-----------------------------------------------------------------------
    // Búsqueda personalizada con input externo
    $("#busquedaTrabajador").on("keyup", function () {
        table.search(this.value).draw();
    });

    $("#btn-buscar").click(function () {
        table.search($("#busquedaTrabajador").val()).draw();
    });

});