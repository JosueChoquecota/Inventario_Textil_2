document.addEventListener("DOMContentLoaded", () => {
    const inputTalla = document.getElementById("inputTalla");
    const inputColor = document.getElementById("inputColor");
    const btnGuardarTallaColor = document.getElementById("btnGuardarTallaColor");
    cargarTallas();
    cargarProductos();
    cargarColores();
    cargarProveedores();
    
    // Registrar Talla/Color
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

    async function cargarProductos() {
    try {
        const data = await (await fetch("/api/v1/inventario/listar")).json();
        const selects = [document.getElementById("productoSelect")]; // aquí puedes agregar otros selects si tienes
        selects.forEach(sel => {
            sel.innerHTML = '<option value="">Seleccione un producto</option>';
            data.forEach(p => sel.innerHTML += `<option value="${p.idProducto}">${p.nombre}</option>`);
            $(sel).selectpicker("refresh"); // refresca solo este select
        });
    } catch (error) {
        console.error("Error cargando productos:", error);
    }
    }

    async function cargarTallas() {
        try {
            const data = await (await fetch("/api/v1/Tallas/listar")).json();
            const selects = [document.getElementById("tallaSelect")];
            selects.forEach(sel => {
                sel.innerHTML = '<option value="">Seleccione una talla</option>';
                data.forEach(t => sel.innerHTML += `<option value="${t.idTalla}">${t.talla}</option>`);
                $(sel).selectpicker("refresh");
            });
        } catch (error) {
            console.error("Error cargando tallas:", error);
        }
    }
    // ===================== COLORES =====================
    async function cargarColores() {
        try {
            const data = await (await fetch("/api/v1/Color/listar")).json();
            const selects = [document.getElementById("colorSelect")]; // agrega otros selects si existen, ejemplo: editColorSelect
            selects.forEach(sel => {
                sel.innerHTML = '<option value="">Seleccione un color</option>';
                data.forEach(c => sel.innerHTML += `<option value="${c.idColor}">${c.color}</option>`);
                $(sel).selectpicker("refresh"); // refresca solo este select
            });
        } catch (error) {
            console.error("Error cargando colores:", error);
        }
    }

    // ===================== PROVEEDORES =====================
    async function cargarProveedores() {
        try {
            const data = await (await fetch("/api/v1/proveedores/listar")).json();
            const selects = [document.getElementById("proveedorSelect")]; // agrega otros selects si existen
            selects.forEach(sel => {
                sel.innerHTML = '<option value="">Seleccione un proveedor</option>';
                data.forEach(p => sel.innerHTML += `<option value="${p.idProveedor}">${p.nombres}</option>`);
                $(sel).selectpicker("refresh"); // refresca solo este select
            });
        } catch (error) {
            console.error("Error cargando proveedores:", error);
        }
    }


});
