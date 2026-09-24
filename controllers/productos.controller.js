const { generarListaProductos, generarProducto } = require('../models/productos.model');

const listarProductos = (req, res) => {
  const productos = generarListaProductos(15);
  res.status(200).json(productos);
};

const obtenerProductoPorId = (req, res) => {
  const producto = generarProducto();
  producto.id = req.params.id;
  res.status(200).json(producto);
};

const crearProducto = (req, res) => {
  const nuevoProducto = { id: Date.now().toString(), ...req.body };
  res.status(201).json(nuevoProducto);
};

module.exports = { listarProductos, obtenerProductoPorId, crearProducto };
