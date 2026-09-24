const { faker } = require('@faker-js/faker');

function generarProducto() {
  return {
    id: faker.string.uuid(),
    nombre: faker.commerce.productName(),
    precio: faker.commerce.price(),
    categoria: faker.commerce.department(),
    descripcion: faker.commerce.productDescription(),
  };
}

function generarListaProductos(cantidad = 10) {
  return Array.from({ length: cantidad }, generarProducto);
}

module.exports = { generarProducto, generarListaProductos };
