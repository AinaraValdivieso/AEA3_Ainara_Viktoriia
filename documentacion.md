# Documentación

## Creación API REST para el gestor de reservas

### Explicación del API
Para poder utilizar el API hemos requerido instalar estas dependencias dentro del `package.json` de Node.js:
- `body-parser`
- `express`
- `nodemon`

Y a partir de ahí, implementar las reglas de negocio.

### Reglas de negocio
Para este trabajo hemos implementado **4** ficheros **JSON**.

#### JSON
- `usuari.json`
- `notificacio.json`
- `reserva.json`
- `recursos.json`

En todos estos ficheros hemos implementado las mismas funciones, *solo que cada uno con sus respectivos datos*.
Hemos hecho que a partir del plugin **REST CLIENT** se pueda ver:

#### REQUEST HTTP
- Ver toda la información del JSON. **GET**
- Ver un valor a partir del ID. **GET**
- Escribir un nuevo valor al JSON. **POST**
- Modificar un valor según el ID. **PUT**
- Borrar un valor según el ID. **DELETE**
---