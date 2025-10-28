document.addEventListener("DOMContentLoaded", () => {
    // ===================== ELEMENTOS =====================
    const inputTalla = document.getElementById("inputTalla");
    const inputColor = document.getElementById("inputColor");
    const btnGuardarTallaColor = document.getElementById("btnGuardarTallaColor");
    $('.selectpicker').selectpicker(); // solo una vez al inicio
    // ===================== CARGAR DATOS =====================
    cargarProveedores(); 
    cargarProductos();
    cargarTallas();
    cargarColores();

    // ===================== REGISTRAR TALLA / COLOR =====================
    btnGuardarTallaColor.addEventListener("click", async () => {
        const talla = inputTalla.value.trim();
        const color = inputColor.value.trim();
        if (!talla && !color) return alert("Debes ingresar al menos una Talla o un Color.");

        if (talla) {
            try {
                const res = await fetch("/api/v1/Tallas/registrar", { 
                    method: "POST", 
                    headers: { "Content-Type": "application/json" }, 
                    body: JSON.stringify({ talla }) 
                });
                alert(res.ok ? `✅ Talla '${talla}' registrada.` : `⚠️ Error: ${await res.text()}`);
                if (res.ok) inputTalla.value = "";
            } catch (e) { console.error(e); alert("❌ Error de conexión"); }
        }

        if (color) {
            try {
                const res = await fetch("/api/v1/Color/registrar", { 
                    method: "POST", 
                    headers: { "Content-Type": "application/json" }, 
                    body: JSON.stringify({ color }) 
                });
                alert(res.ok ? `✅ Color '${color}' registrado.` : `⚠️ Error: ${await res.text()}`);
                if (res.ok) inputColor.value = "";
            } catch (e) { console.error(e); alert("❌ Error de conexión"); }
        }
    });

    // ===================== FUNCIONES DE CARGA =====================
    async function cargarProductos() {
        try {
            const data = await (await fetch("/api/v1/inventario/listar")).json();
            const sel = document.getElementById("productoSelect");
            sel.innerHTML = '<option value="">Seleccione un producto</option>';
            data.forEach(p => sel.innerHTML += `<option value="${p.idProducto}">${p.nombre}</option>`);
            $(sel).selectpicker("refresh");
        } catch (error) { console.error("Error cargando productos:", error); }
    }

    async function cargarTallas() {
        try {
            const data = await (await fetch("/api/v1/Tallas/listar")).json();
            const sel = document.getElementById("tallaSelect");
            sel.innerHTML = '<option value="">Seleccione una talla</option>';
            data.forEach(t => sel.innerHTML += `<option value="${t.idTalla}">${t.talla}</option>`);
            $(sel).selectpicker("refresh");
        } catch (error) { console.error("Error cargando tallas:", error); }
    }

    async function cargarColores() {
        try {
            const data = await (await fetch("/api/v1/Color/listar")).json();
            const sel = document.getElementById("colorSelect");
            sel.innerHTML = '<option value="">Seleccione un color</option>';
            data.forEach(c => sel.innerHTML += `<option value="${c.idColor}">${c.color}</option>`);
            $(sel).selectpicker("refresh");
        } catch (error) { console.error("Error cargando colores:", error); }
    }

    async function cargarProveedores() {
        try {
            const data = await (await fetch("/api/v1/proveedores/listar")).json();
            const sel = document.getElementById("proveedorSelect");
            sel.innerHTML = '<option value="">Seleccione un proveedor</option>';
            data.forEach(p => sel.innerHTML += `<option value="${p.idProveedor}">${p.nombres}</option>`);
            $(sel).selectpicker("refresh");
        } catch (error) { console.error("Error cargando proveedores:", error); }
    }

    // ===================== CARRITO =====================
    let productosAgregados = [];

    $('#btnAgregarCompra').click(function() {
        const producto = $('#productoSelect').val();
        const talla = $('#tallaSelect').val();
        const color = $('#colorSelect').val();
        const proveedor = $('#proveedorSelect').val();
        const cantidad = parseInt($('#inputCantidad').val());
        const precioUnitario = parseFloat($('#inputPrecioUnitario').val());

        if (!producto || !talla || !color || !proveedor || !cantidad || !precioUnitario) {
            alert('Todos los campos son obligatorios');
            return;
        }

        productosAgregados.push({
            producto,
            talla,
            color,
            proveedor,
            cantidad,
            precioUnitario,
            subtotal: cantidad * precioUnitario
        });

        limpiarFormularioCompra();
    });

    function limpiarFormularioCompra() {
        $('#productoSelect').val('');
        $('#tallaSelect').val('');
        $('#colorSelect').val('');
        $('#proveedorSelect').val('');
        $('#inputCantidad').val(1);
        $('#inputPrecioUnitario').val('');
        $('.selectpicker').selectpicker('refresh');
    }

    $('#btnVerCompras').click(function() {
        const tbody = $('#tablaComprasBody');
        tbody.empty();
        productosAgregados.forEach((p, index) => {
            tbody.append(`
                <tr>
                    <td>${p.producto}</td>
                    <td>${p.talla}</td>
                    <td>${p.color}</td>
                    <td>${p.proveedor}</td>
                    <td>${p.cantidad}</td>
                    <td>${p.precioUnitario.toFixed(2)}</td>
                    <td>${p.subtotal.toFixed(2)}</td>
                    <td><button class="btn btn-danger btn-sm" onclick="eliminarProducto(${index})">X</button></td>
                </tr>
            `);
        });
    });

    function eliminarProducto(index) {
        productosAgregados.splice(index, 1);
        $('#btnVerCompras').click(); // actualizar modal
    }

    // ===================== CONFIRMAR COMPRA =====================
    $('#btnGuardarComprasFinal').click(function() {
        if (productosAgregados.length === 0) {
            alert('No hay productos para registrar');
            return;
        }

        fetch('/api/v1/ListaProductos/Registrar', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(productosAgregados)
        })
        .then(res => res.json())
        .then(data => {
            alert('Compras registradas con éxito');
            productosAgregados = [];
            $('#tablaComprasBody').empty();
            $('#modalCompras').modal('hide');
        })
        .catch(err => console.error(err));
    });
});
