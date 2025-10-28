document.addEventListener("DOMContentLoaded", function () {
    // Inicializa la carga de la tabla
    cargarProveedores();

    // Captura el formulario
    const form = document.getElementById("proveedorForm");
    form.addEventListener("submit", async function (event) {
        event.preventDefault(); 

        // Obtenemos los valores del formulario
        const proveedorData = {
            nombres: document.getElementById("nombres").value.trim(),
            apellidos: document.getElementById("apellidos").value.trim(),
            idTipoDoc: parseInt(document.getElementById("idTipoDoc").value),
            nDocumento: parseInt(document.getElementById("nDocumento").value),
            direccion: document.getElementById("direccion").value.trim(),
            telefono: document.getElementById("telefono").value.trim()
        };

        // Validación simple
        if (!proveedorData.nombres || !proveedorData.apellidos || !proveedorData.nDocumento) {
            alert("Por favor, completa todos los campos obligatorios.");
            return;
        }

        try {
            const response = await fetch("/api/v1/proveedores/registrar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(proveedorData)
            });

            if (response.ok) {
                const data = await response.json();
                alert("✅ Proveedor registrado correctamente: " + data.nombres);
                form.reset(); // Limpia el formulario
                cargarProveedores(); // Refresca la tabla automáticamente
            } else {
                const errorText = await response.text();
                alert("⚠️ Error al registrar proveedor: " + errorText);
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            alert("❌ Error al conectar con el servidor.");
        }
    });
});

// Función para cargar proveedores en la tabla
function cargarProveedores() {
    fetch("/api/v1/proveedores/listar") // Ajusta la URL según tu endpoint
        .then(response => {
            if (!response.ok) throw new Error("Error al obtener los proveedores");
            return response.json();
        })
        .then(data => {
            const tbody = document.getElementById("tablaProveedoresBody");
            tbody.innerHTML = ""; // Limpiar tabla antes de cargar

            data.forEach(proveedor => {
                const fila = document.createElement("tr");
                fila.innerHTML = `
                    <td>${proveedor.idProveedor}</td>
                    <td>${proveedor.nombres}</td>
                    <td>${proveedor.apellidos}</td>
                    <td>${proveedor.nDocumento}</td>
                    <td>${proveedor.telefono || "-"}</td>
                    <td>${proveedor.direccion || "-"}</td>
                    <td class="text-center">
                        <button class="btn btn-warning btn-sm me-1" onclick="editarProveedor(${proveedor.idProveedor})">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="eliminarProveedor(${proveedor.idProveedor})">Eliminar</button>
                    </td>
                `;
                tbody.appendChild(fila);
            });
        })
        .catch(error => console.error("Error:", error));
}

// Función para eliminar proveedor
function eliminarProveedor(idProveedor) {
    if (confirm("¿Estás seguro de eliminar este proveedor?")) {
        fetch(`/api/v1/proveedores/eliminar/${idProveedor}`, { method: "DELETE" })
            .then(response => {
                if (response.ok) {
                    alert("Proveedor eliminado correctamente");
                    cargarProveedores(); // Refresca la tabla
                } else {
                    alert("Error al eliminar el proveedor");
                }
            })
            .catch(error => console.error("Error:", error));
    }
}

// Función para editar proveedor (puedes redirigir o abrir modal)
function editarProveedor(idProveedor) {
    window.location.href = `/proveedores/editar/${idProveedor}`;
}
