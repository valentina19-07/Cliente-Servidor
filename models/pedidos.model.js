const { faker } = require('@faker-js/faker');

function generarPedido() {
  return {
    id: faker.string.uuid(),
    producto: faker.commerce.product(),
    cantidad: faker.number.int({ min: 1, max: 5 }),
    fecha: faker.date.recent(),
  };
}

function generarListaPedidos(cantidad = 10) {
  return Array.from({ length: cantidad }, generarPedido);
}

module.exports = { generarPedido, generarListaPedidos };
