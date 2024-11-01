// Función para obtener datos de localStorage
export function obtenerDatos() {
  return JSON.parse(localStorage.getItem("user")) || [];
}

// Función para almacenar un nuevo usuario en localStorage
export function almacenarUsuario(datosObj) {
  // Obtener el array de usuarios del localStorage, o un array vacío si no existe
  const usuarios = JSON.parse(localStorage.getItem("user")) || [];

  // Verificar si el usuario ya existe (ej. basado en el DNI o el ID)
  const existeUsuario = usuarios.some((user) => user.dni === datosObj.dni);
  if (!existeUsuario) {
    // Agregar el nuevo usuario al array
    usuarios.push(datosObj);
    localStorage.setItem("user", JSON.stringify(usuarios));
  }
}

// Función para actualizar el localStorage con un nuevo array de usuarios
export function actualizarUsuarios(usuariosActualizados) {
  localStorage.setItem("user", JSON.stringify(usuariosActualizados));
}
