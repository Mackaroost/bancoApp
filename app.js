import { almacenarUsuario } from "./utils/storageHelpers.js";
import {
  generarIdUnico,
  obtenerCapital,
  validarNombre,
  validarDNI,
  validarCuenta,
  validarDias,
  validarMonto,
  validarTipoCuenta,
} from "./utils/helpers.js";

document.addEventListener("DOMContentLoaded", () => {
  const nombre = document.querySelector("#inputName");
  const dni = document.querySelector("#inputDni");
  const cuenta = document.querySelector("#inputCuenta");
  const tipoCuenta = document.querySelector("#inputTipoCuenta");
  const monto = document.querySelector("#inputMonto");
  const dias = document.querySelector("#inputDias");
  const form = document.getElementById("form");
  const containerError = document.querySelector(".container-error");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    limpiarErrores();

    // creamos obj donde almacemos los valores ingresados del form
    const datosObj = {
      id: generarIdUnico(),
      nombre: nombre.value,
      dni: dni.value,
      cuenta: cuenta.value,
      tipoCuenta: tipoCuenta.value,
      monto: monto.value,
      dias: dias.value,
    };
    //  hacemos la validacion, si hay errores se pasan a las fucniones para renderizar,
    // sino hacemos operacion de  calculo y lo agregamos al obj
    const errores = validarInputs(datosObj);
    if (errores.length) {
      mostrarErrores(errores);
    } else {
      datosObj.capital = obtenerCapital(
        datosObj.monto,
        datosObj.dias,
        datosObj.tipoCuenta
      );

      // almacenamos los datos en localstorage
      almacenarUsuario(datosObj);

      // renderizamos el calculo
      mostrarExito(datosObj.capital);

      // reseteamos form
      resetForm();
    }
  });

  // validando inputs
  function validarInputs(datos) {
    //almacenmos los errores en un arreglo
    const errores = [
      validarNombre(datos.nombre),
      validarDNI(datos.dni),
      validarCuenta(datos.cuenta),
      validarTipoCuenta(datos.tipoCuenta),
      validarMonto(datos.monto),
      validarDias(datos.dias, datos.tipoCuenta),
    ].filter(Boolean);
    return errores;
  }

  // funcion que muestr msj de errores
  function mostrarErrores(errorList) {
    containerError.classList.remove("d-none");
    const orderList = document.createElement("OL");
    errorList.forEach((error) => {
      const listItem = document.createElement("LI");
      listItem.textContent = error;
      listItem.classList.add("text-danger");
      orderList.appendChild(listItem);
    });
    containerError.appendChild(orderList);
  }

  // mensajes de exito con setimeout de 8sg
  function mostrarExito(capital) {
    containerError.classList.remove("d-none");
    containerError.innerHTML = `
      <p class="text-center text-black fw-bold my-2">Usuario registrado con éxito</p>
      <p class="text-center text-black fw-bold my-2">EL rendimiento obtenido es: ${capital}</p>
    `;
    setTimeout(limpiarErrores, 8000);
  }
  // limpiano html
  function limpiarErrores() {
    containerError.classList.add("d-none");
    containerError.innerHTML = "";
  }

  // limpianr el formulario
  function resetForm() {
    form.reset();
  }
});
