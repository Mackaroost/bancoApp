import { obtenerCapital } from "./utils/helpers.js";
import {
  almacenarUsuario,
  obtenerDatos,
  actualizarUsuarios,
} from "./utils/storageHelpers.js";
//import { obtenerCapital } from "./utils/calculos";

document.addEventListener("DOMContentLoaded", () => {
  const table = document.querySelector("#userTableBody");

  // obtenidneod los usuarios y renderizarlos
  function mostrarUser() {
    const data = obtenerDatos();

    // variable para calcular total.
    let calcularTotal;
    //console.log(data);
    limpiarHtml();
    const table = document.querySelector("#userTableBody");

    data.forEach((user) => {
      const row = document.createElement("TR");
      row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.nombre}</td>
        <td>${user.dni}</td>
        <td>${user.cuenta}</td>
        <td>${user.tipoCuenta}</td>
        <td>${user.monto}</td>
        <td>${user.dias}</td>
        <td>${user.capital}</td>
        <td>
            <button class="edit btn btn-warning btn-sm">Editar</button>
            <button class="delete btn btn-danger btn-sm">Eliminar</button>
        </td>
      `;
      table.appendChild(row);

      row
        .querySelector(".edit")
        .addEventListener("click", () => editarUser(user.id));
      row
        .querySelector(".delete")
        .addEventListener("click", () => eliminarUser(user.id));
    });

    // Calcular total
    const totalHtml = document.getElementById("totalDepositos");
    if (data.length === 0) {
      calcularTotal = 0;
    } else {
      calcularTotal = data.reduce((acc, item) => {
        const capitalString = item.capital ?? "0";
        const capitalNumerico = Number(
          capitalString.replace(/\./g, "").replace(",", ".")
        );
        return acc + capitalNumerico;
      }, 0);
    }

    // Formatear el total a un formato de moneda con dos decimales
    const totalFormateado = calcularTotal.toLocaleString("es-ES", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    // Mostrar el total en el HTML
    totalHtml.innerHTML = `${totalFormateado}`;
  }
  mostrarUser();

  // eliminando user
  function eliminarUser(id) {
    console.log("eliminando a " + id);
    const users = obtenerDatos();
    //console.log(users);
    const newData = users.filter((user) => {
      return user.id !== id;
    });
    console.log(newData);
    actualizarUsuarios(newData);
    limpiarHtml();
    mostrarUser();
  }

  // editando user
  function editarUser(id) {
    const users = obtenerDatos();
    const userEdit = users.find((user) => user.id === id);
    //console.log(userEdit);

    if (userEdit) {
      // Obtenemos el formulario de edición con los datos almacenados
      document.getElementById("editName").value = userEdit.nombre;
      document.getElementById("editDni").value = userEdit.dni;
      document.getElementById("editCuenta").value = userEdit.cuenta;
      document.getElementById("editTipoCuenta").value = userEdit.tipoCuenta;
      document.getElementById("editMonto").value = userEdit.monto;
      document.getElementById("editDias").value = userEdit.dias;

      // Abrir el modal de edición
      new bootstrap.Modal(document.getElementById("editFormModal")).show();

      // Editamos y almacenamos los  cambios

      document.getElementById("saveEditButton").onclick = () => {
        // Actualizar los datos del usuario
        userEdit.nombre = document.getElementById("editName").value;
        userEdit.dni = document.getElementById("editDni").value;
        userEdit.cuenta = document.getElementById("editCuenta").value;
        userEdit.tipoCuenta = document.getElementById("editTipoCuenta").value;
        userEdit.monto = document.getElementById("editMonto").value;
        userEdit.dias = document.getElementById("editDias").value;

        // Calcular el capital actualizado si se modifico
        userEdit.capital = obtenerCapital(userEdit.monto, userEdit.dias);

        actualizarUsuarios(users);
        limpiarHtml();
        mostrarUser();

        // Cerrar el modal de edición
        bootstrap.Modal.getInstance(
          document.getElementById("editFormModal")
        ).hide();
      };
    }
  }
  function limpiarHtml() {
    table.innerHTML = "";
  }
});
