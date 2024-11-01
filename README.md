
# Aplicación de Gestión de Usuarios y Depósitos

## Descripción

Esta aplicación permite a los usuarios registrar sus datos y guardar información de depósitos en el `localStorage`. Los datos son validados antes de ser almacenados, mostrando mensajes de éxito o error según la entrada del usuario. Posteriormente, estos datos pueden visualizarse en otra página en forma de tabla, con opciones para editar o eliminar registros específicos. La aplicación también calcula automáticamente el rendimiento obtenido y el total de capital almacenado.

## Características

- **Registro de Datos de Usuario**: Los usuarios pueden introducir sus datos (nombre, DNI, tipo de cuenta, monto de depósito y días de depósito).
- **Validación de Datos**: Validación de la longitud y valores mínimos requeridos para campos específicos (por ejemplo, monto y días).
- **Almacenamiento en LocalStorage**: Los datos validados se almacenan en el `localStorage` para su persistencia y consulta.
- **Mensajes de Éxito y Error**: Se muestran mensajes personalizados dependiendo de la validez de la información ingresada.
- **Cálculo de Capital y Total**: La aplicación incluye funciones de cálculo para determinar el rendimiento del depósito y el total acumulado de todos los usuarios registrados.
- **Visualización en Tabla**: Los datos se muestran en una tabla que incluye botones para editar y eliminar registros.

## Características Principales

### 1. Captura y Validación de Inputs

- Cada campo de entrada se captura y se almacena en un objeto temporal.
- Se realizan validaciones específicas para asegurar que el formato y valor de cada campo sean correctos:
  - **Nombre** debe tener al menos 3 caracteres.
  - **DNI** debe ser un número de al menos 7 dígitos.
  - **Monto** debe ser de al menos 1000 unidades.
  - **Días de Depósito** debe cumplir con el requisito mínimo según el tipo de cuenta.
- En caso de error, se muestran mensajes específicos que indican qué campo necesita corrección. Si todos los datos son válidos, se muestra un mensaje de éxito y el capital se calcula usando una fórmula personalizada.

### 2. Almacenamiento en LocalStorage

- Una vez validados, los datos del usuario se almacenan en `localStorage` como un array de objetos.
- La función `almacenarUsuario` verifica si un usuario con el mismo DNI ya existe para evitar duplicados.
- La estructura en el `localStorage` facilita la recuperación y manipulación posterior de los datos.

### 3. Visualización y Gestión de Registros

- En otra página, los datos de todos los usuarios se cargan desde `localStorage` y se muestran en una tabla.
- Cada fila de la tabla tiene botones para **editar** y **eliminar** registros.
  - **Editar** permite al usuario actualizar campos y guardar los cambios en `localStorage`.
  - **Eliminar** borra el registro del `localStorage` y actualiza la tabla en tiempo real.

### 4. Funciones de Cálculo

- **Calcular Capital**: A partir del monto inicial y los días de depósito, la función `obtenerCapital` calcula el rendimiento del depósito según el tipo de cuenta.
- **Calcular Total**: La función `calcularTotal` suma el capital de todos los usuarios para mostrar el total acumulado.

## Estructura del Proyecto

- `index.html`: Página principal con el formulario de entrada.
- `tabla.html`: Página que muestra la tabla de usuarios.
- `script.js`: Archivo JavaScript principal que contiene la lógica de captura de inputs, validación y almacenamiento.
- `storageHelpers.js`: Contiene la lógica para almacenar y recuperar datos de `localStorage`.
- `calculos.js`: Contiene las funciones para calcular el capital y el total acumulado.

## Instrucciones de Uso

1. Clona este repositorio.
   ```bash
   git clone https://github.com/tu_usuario/tu_repositorio.git
2. Abre index.html en tu navegador para registrar un nuevo usuario.
3. Introduce la información requerida en el formulario y envíala. Se mostrará un mensaje de éxito si los datos son correctos, o un mensaje de error si es necesario corregir alguno.
4. Para ver la tabla de usuarios, abre tabla.html. Aquí podrás ver todos los registros y gestionar cada uno con las opciones de editar o eliminar.  
5. El total acumulado se muestra en la parte inferior de la tabla.

