const { faker } = require('@faker-js/faker');

function generarCliente() {
  return {
    id: faker.string.uuid(),
    nombre: faker.person.fullName(),
    email: faker.internet.email(),
    ciudad: faker.location.city(),
  };
}

function generarListaClientes(cantidad = 10) {
  return Array.from({ length: cantidad }, generarCliente);
}

module.exports = { generarCliente, generarListaClientes };
