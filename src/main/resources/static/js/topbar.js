document.addEventListener("DOMContentLoaded", async () => {
  const emailSpan = document.getElementById("correoTrabajador");

  try {
    const res = await fetch("/api/v1/trabajadores/actual");
    if (!res.ok) throw new Error("No autenticado");

    const data = await res.json();
    emailSpan.textContent = data.correo;
  } catch (err) {
    console.error("Error al obtener trabajador:", err);
    emailSpan.textContent = "Invitado";
  }
});
