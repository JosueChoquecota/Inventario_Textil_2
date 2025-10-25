document.addEventListener("DOMContentLoaded", () => {
  cargarMarcas();
  cargarCategorias();
  cargarProductos();

  document.getElementById("guardarMarcaBtn").addEventListener("click", guardarMarca);
  document.getElementById("guardarCategoriaBtn").addEventListener("click", guardarCategoria);
  document.getElementById("inventarioForm").addEventListener("submit", guardarProducto);
  document.getElementById("btnActualizarTabla").addEventListener("click", cargarProductos);
  document.getElementById("editarProductoForm").addEventListener("submit", actualizarProducto);
});

// ===================== MARCAS =====================
async function cargarMarcas() {
  const res = await fetch("/api/v1/marcas/listar");
  const data = await res.json();
  const selects = [document.getElementById("marcaSelect"), document.getElementById("editMarcaSelect")];
  selects.forEach(sel => {
    sel.innerHTML = '<option value="">Seleccione una marca</option>';
    data.forEach(m => (sel.innerHTML += `<option value="${m.idMarca}">${m.marca}</option>`));
  });
  $(".selectpicker").selectpicker("refresh");
}

async function guardarMarca() {
  const nombre = document.getElementById("nombreMarca").value.trim();
  const desc = document.getElementById("descLogo").value.trim();
  const logo = document.getElementById("logoFile").files[0];
  if (!nombre) return alert("Ingrese un nombre de marca");

  const formData = new FormData();
  formData.append("data", new Blob([JSON.stringify({ marca: nombre, descLogo: desc })], { type: "application/json" }));
  if (logo) formData.append("logo", logo);

  const res = await fetch("/api/v1/marcas/registrar", { method: "POST", body: formData });
  res.ok ? (alert("✅ Marca guardada"), cargarMarcas()) : alert("❌ Error al guardar marca");
}

// ===================== CATEGORÍAS =====================
async function cargarCategorias() {
  const res = await fetch("/api/v1/categorias/listar");
  const data = await res.json();
  const selects = [document.getElementById("categoriaSelect"), document.getElementById("editCategoriaSelect")];
  selects.forEach(sel => {
    sel.innerHTML = '<option value="">Seleccione una categoría</option>';
    data.forEach(c => (sel.innerHTML += `<option value="${c.idCategoria}">${c.nombre}</option>`));
  });
  $(".selectpicker").selectpicker("refresh");
}

async function guardarCategoria() {
  const nombre = document.getElementById("nombreCategoria").value.trim();
  const desc = document.getElementById("descCategoria").value.trim();
  if (!nombre) return alert("Ingrese un nombre de categoría");

  const res = await fetch("/api/v1/categorias/registrar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, descripcion: desc }),
  });
  res.ok ? (alert("✅ Categoría guardada"), cargarCategorias()) : alert("❌ Error al guardar categoría");
}

// ===================== PRODUCTOS =====================
async function cargarProductos() {
  const res = await fetch("/api/v1/inventario/listar");
  const data = await res.json();
  const tbody = document.getElementById("productosBody");
  tbody.innerHTML = "";
  data.forEach(p => {
    tbody.innerHTML += `
      <tr class="text-center">
        <td>${p.idProducto}</td>
        <td>${p.nombre}</td>
        <td><img src="/${p.imagen}" class="img-fija img-thumbnail" alt="Imagen producto"></td>
        <td>${p.categoria?.nombre || "-"}</td>
        <td>${p.marca?.marca || "-"}</td>
        <td>
          <button class="btn btn-warning btn-sm" onclick="abrirModalEditar(${p.idProducto})"><i class="fas fa-edit"></i></button>
          <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${p.idProducto})"><i class="fas fa-trash"></i></button>
        </td>
      </tr>`;
  });
}

async function guardarProducto(e) {
  e.preventDefault();
  const nombre = document.getElementById("productoModelo").value.trim();
  const idMarca = document.getElementById("marcaSelect").value;
  const idCategoria = document.getElementById("categoriaSelect").value;
  const imagen = document.getElementById("imagenFile").files[0];

  if (!nombre || !idMarca || !idCategoria) return alert("Complete todos los campos");

  const formData = new FormData();
  formData.append("data", new Blob([JSON.stringify({ nombre, idMarca, idCategoria })], { type: "application/json" }));
  if (imagen) formData.append("imagen", imagen);

  const res = await fetch("/api/v1/inventario/registrar", { method: "POST", body: formData });
  res.ok ? (alert("✅ Producto registrado"), cargarProductos()) : alert("❌ Error al guardar producto");
}

// ===================== EDITAR =====================
async function abrirModalEditar(id) {
  const res = await fetch(`/api/v1/inventario/${id}`);
  const p = await res.json();

  document.getElementById("editIdProducto").value = p.idProducto;
  document.getElementById("editNombreProducto").value = p.nombre;
  document.getElementById("editMarcaSelect").value = p.marca.idMarca;
  document.getElementById("editCategoriaSelect").value = p.categoria.idCategoria;

  $(".selectpicker").selectpicker("refresh");
  $("#editarProductoModal").modal("show");
}

async function actualizarProducto(e) {
  e.preventDefault();
  const id = document.getElementById("editIdProducto").value;
  const nombre = document.getElementById("editNombreProducto").value.trim();
  const idMarca = document.getElementById("editMarcaSelect").value;
  const idCategoria = document.getElementById("editCategoriaSelect").value;
  const imagen = document.getElementById("editImagenProducto").files[0];

  const formData = new FormData();
  formData.append("data", new Blob([JSON.stringify({ nombre, idMarca, idCategoria })], { type: "application/json" }));
  if (imagen) formData.append("imagen", imagen);

  const res = await fetch(`/api/v1/inventario/actualizar/${id}`, { method: "PUT", body: formData });
  if (res.ok) {
    alert("✅ Producto actualizado");
    $("#editarProductoModal").modal("hide");
    cargarProductos();
  } else {
    alert("❌ Error al actualizar producto");
  }
}

// ===================== ELIMINAR =====================
async function eliminarProducto(id) {
  if (!confirm("¿Deseas eliminar este producto?")) return;
  const res = await fetch(`/api/v1/inventario/eliminar/${id}`, { method: "DELETE" });
  res.ok ? (alert("✅ Eliminado"), cargarProductos()) : alert("❌ Error al eliminar");
}
