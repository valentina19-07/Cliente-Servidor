const { generarListaClientes, generarCliente } = require('../models/clientes.model');

const listarClientes = (req, res) => {
  const clientes = generarListaClientes(15);
  res.status(200).json(clientes);
};

const obtenerClientePorId = (req, res) => {
  const cliente = generarCliente();
  cliente.id = req.params.id;
  res.status(200).json(cliente);
};

const crearCliente = (req, res) => {
  const nuevoCliente = { id: Date.now().toString(), ...req.body };
  res.status(201).json(nuevoCliente);
};

module.exports = { listarClientes, obtenerClientePorId, crearCliente };
