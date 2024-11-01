// Función para generar un ID único
export function generarIdUnico() {
  return Math.floor(10000 + Math.random() * 90000).toString();
}

// Función para obtener el capital
export function obtenerCapital(monto, dias, tipoCuenta) {
  const numMonto = Number(monto);
  const numDias = Number(dias);

  if (isNaN(numMonto) || isNaN(numDias)) {
    return 0;
  }

  let tasa = 0;
  if (numMonto > 1000 && numMonto < 9999) {
    tasa = 0.06;
  } else if (numMonto >= 10000 && numMonto < 99999) {
    tasa = 0.07;
  } else if (numMonto >= 100000) {
    tasa = 0.08;
  } else if (tipoCuenta === "Fondo de Inversion") {
    tasa = 0.09;
  }
  const capital = numMonto + ((numMonto * tasa) / 30) * numDias;
  const capitalFormateado = capital.toLocaleString("es-ES", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return capitalFormateado;
}

// Funciones de validación individual para cada campo
export function validarNombre(nombre) {
  return nombre.length >= 3 ? "" : "El Nombre debe tener al menos 3 caracteres";
}

export function validarDNI(dni) {
  return dni.length >= 7 ? "" : "El DNI debe tener al menos 7 cifras";
}

export function validarCuenta(cuenta) {
  return cuenta.length >= 3 ? "" : "La cuenta debe tener al menos 3 cifras";
}

export function validarTipoCuenta(tipoCuenta) {
  return tipoCuenta && tipoCuenta !== "Choose..."
    ? ""
    : "Debes seleccionar un tipo de cuenta";
}

export function validarMonto(monto) {
  return Number(monto) >= 1000 ? "" : "El monto debe ser mayor o igual a 1000";
}

export function validarDias(dias, tipoCuenta) {
  if (tipoCuenta === "Fondo de Inversion" && Number(dias) < 90) {
    return "Los días de depósito de fondo de inversión deben ser mayores o iguales a 90";
  }
  return Number(dias) >= 30
    ? ""
    : "Los días de depósito deben ser mayores o iguales a 30";
}
